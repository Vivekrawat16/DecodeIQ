import { Bot, ExternalLink } from "lucide-react";

function MockOAPage() {
    return (
        <div className="h-full bg-base-300 flex flex-col p-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Bot className="size-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent border-b-0">
                            AI Mock Interview
                        </h1>
                    </div>
                    <p className="text-base-content/60 max-w-2xl text-sm md:text-base mt-1">
                        Practice your system design and coding skills with a realistic AI-powered technical interviewer.
                    </p>
                </div>

                <a 
                    href="https://ai-mock-interview-practice.streamlit.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary shadow-lg shadow-primary/20 flex gap-2 items-center rounded-xl"
                >
                    <ExternalLink className="size-4" />
                    Open in Full Screen
                </a>
            </div>

            {/* Embedded Streamlit App */}
            <div className="flex-1 bg-base-100 rounded-2xl shadow-xl border border-base-content/10 overflow-hidden relative min-h-[600px] transition-all">
                {/* A subtle loading gradient behind the iframe */}
                <div className="absolute inset-0 bg-gradient-to-br from-base-200 to-base-300 animate-pulse -z-10 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
                <iframe 
                    src="https://ai-mock-interview-practice.streamlit.app/?embed=true" 
                    className="absolute inset-0 w-full h-full border-0 z-10"
                    title="AI Mock Interview"
                    allow="microphone; camera; display-capture"
                ></iframe>
            </div>
        </div>
    );
}

export default MockOAPage;
