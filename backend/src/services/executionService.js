import vm from "vm";

export const executeCode = async (code, language, mode = "run") => {
    // In Production: Dispatch to isolated Docker container or AWS Lambda
    // Local Dev: Use Node VM

    return new Promise((resolve) => {
        const sandbox = {
            console: {
                log: (...args) => {
                    output.push(args.join(" "));
                }
            },
            // Insert mock test cases
            twoSum: (nums, target) => {
                // Solution implementation checker context
                // This part is tricky in VM without a harness.
                // Simplified: We accept the user code defining a function, and we call it.
            }
        };

        const output = [];
        const context = vm.createContext(sandbox);
        const start = process.hrtime();
        let isError = false;

        try {
            // 1. Run User Code
            vm.runInContext(code, context, { timeout: 2000 });

            // 2. Run Test Cases
            // Mocking Test execution logic
            // In reality, we'd append the test driver code to the user code
            const testDriver = `
        const result1 = twoSum([2,7,11,15], 9);
        const pass1 = JSON.stringify(result1) === JSON.stringify([0,1]);
        if(pass1) console.log("Test Case 1: Passed");
        else console.log("Test Case 1: Failed");
      `;

            // Only runs if function is defined
            if (code.includes("function twoSum")) {
                vm.runInContext(testDriver, context, { timeout: 1000 });
            } else {
                output.push("Error: Function 'twoSum' not found.");
                isError = true;
            }

        } catch (err) {
            output.push(`Runtime Error: ${err.message}`);
            isError = true;
        }

        const end = process.hrtime(start);
        const timeMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

        resolve({
            output: output.join("\n"),
            error: isError,
            time: timeMs,
            passed: output.filter(l => l.includes("Passed")).length,
            total: 1 // Single test case for now
        });
    });
};
