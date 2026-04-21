const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://leetcode.com/graphql';

const QUESTIONS_QUERY = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      questions: data {
        title
        titleSlug
        difficulty
        topicTags { name }
      }
    }
  }
`;

const QUESTION_DATA_QUERY = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionFrontendId
      content
      codeSnippets {
        langSlug
        code
      }
    }
  }
`;

function decodeHTMLEntities(text) {
  return text.replace(/&nbsp;/g, ' ')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&amp;/g, '&')
             .replace(/&quot;/g, '"');
}

function cleanText(text) {
    if(!text) return "";
    return decodeHTMLEntities(text).replace(/\s+/g, ' ').trim();
}

async function fetchQuestions() {
    const res = await axios.post(API_URL, {
        query: QUESTIONS_QUERY,
        variables: { categorySlug: "algorithms", skip: 0, limit: 50, filters: {} }
    }, { headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' } });
    return res.data.data.problemsetQuestionList.questions;
}

async function fetchQuestionData(titleSlug) {
    const res = await axios.post(API_URL, {
        query: QUESTION_DATA_QUERY,
        variables: { titleSlug }
    }, { headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' } });
    return res.data.data.question;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log("Fetching top 50 questions...");
    const qs = await fetchQuestions();
    const finalProblems = {};

    for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        console.log(`[${i+1}/50] Processing ${q.title}...`);
        try {
            const data = await fetchQuestionData(q.titleSlug);
            if (!data) continue;

            const $ = cheerio.load(data.content);
            
            // Extract description text until first Example
            let descNodes = [];
            $('p').each((i, el) => {
                const text = $(el).text();
                if (text.includes('Example 1:') || text.includes('Constraints:')) return false;
                if (text.trim().length > 0) descNodes.push(text.trim());
            });

            // Extract examples
            const examples = [];
            $('pre').each((i, el) => {
                const preText = $(el).text().trim();
                let input = "", output = "", explanation = "";
                
                let lines = preText.split('\n');
                for (let line of lines) {
                    if (line.includes('Input:')) input = line.replace('Input:', '').trim();
                    else if (line.includes('Output:')) output = line.replace('Output:', '').trim();
                    else if (line.includes('Explanation:')) explanation = line.replace('Explanation:', '').trim();
                    else if (!input && !output) {
                        // alternate format
                    }
                }
                
                if (input && output) {
                    const ex = { input, output };
                    if (explanation) ex.explanation = explanation;
                    examples.push(ex);
                }
            });

            // Extract Constraints
            const constraints = [];
            $('ul').last().find('li').each((i, el) => {
                constraints.push($(el).text().trim());
            });

            // Extract code snippets
            const starterCode = {};
            if (data.codeSnippets) {
                const jsCode = data.codeSnippets.find(s => s.langSlug === 'javascript');
                const pyCode = data.codeSnippets.find(s => s.langSlug === 'python3' || s.langSlug === 'python');
                const jvCode = data.codeSnippets.find(s => s.langSlug === 'java');
                if (jsCode) starterCode.javascript = jsCode.code;
                if (pyCode) starterCode.python = pyCode.code;
                if (jvCode) starterCode.java = jvCode.code;
            }

            finalProblems[q.titleSlug] = {
                id: q.titleSlug,
                title: q.title,
                difficulty: q.difficulty,
                category: q.topicTags.map(t => t.name).join(' • '),
                description: {
                    text: cleanText(descNodes.slice(0, 2).join(' ')),
                    notes: descNodes.slice(2).map(n => cleanText(n))
                },
                examples: examples,
                constraints: constraints.map(c => cleanText(c)),
                starterCode: starterCode,
                expectedOutput: {
                    javascript: examples.map(e => e.output).join('\\n'),
                    python: examples.map(e => e.output).join('\\n'),
                    java: examples.map(e => e.output).join('\\n'),
                }
            };

            await sleep(500); // polite rating limiting
        } catch (err) {
            console.error(`Error processing ${q.title}:`, err.message);
        }
    }

    const outputContent = `export const PROBLEMS = ${JSON.stringify(finalProblems, null, 2)};\n\n` + 
    `export const LANGUAGE_CONFIG = {
  javascript: { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python: { name: "Python", icon: "/python.png", monacoLang: "python" },
  java: { name: "Java", icon: "/java.png", monacoLang: "java" }
};`;

    fs.writeFileSync(path.join(__dirname, 'generated_problems.js'), outputContent);
    console.log("Written successfully to generated_problems.js!");
}

main();
