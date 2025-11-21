
import { SparklesIcon } from "lucide-react";

function MockOAPage() {
    return (
        <div className="min-h-screen bg-base-300 flex flex-col">


            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full text-center space-y-8">

                    {/* Icon with glow effect */}
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-30 animate-pulse"></div>
                        <div className="relative size-24 bg-base-100 rounded-full flex items-center justify-center mx-auto shadow-xl border border-base-content/10">
                            <SparklesIcon className="size-12 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Mock OA
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-base-content">
                            Coming Soon
                        </p>
                        <p className="text-base-content/60 text-lg max-w-md mx-auto leading-relaxed">
                            We're working hard to bring you realistic Online Assessments to help you ace your interviews. Stay tuned!
                        </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12 opacity-50">
                        <div className="h-2 bg-base-content/10 rounded-full animate-pulse delay-75"></div>
                        <div className="h-2 bg-base-content/10 rounded-full animate-pulse delay-150"></div>
                        <div className="h-2 bg-base-content/10 rounded-full animate-pulse delay-300"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MockOAPage;
