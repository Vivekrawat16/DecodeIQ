import { Trophy, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResultModal({ results, outcome, onRematch }) {
    // outcome: 'WIN' | 'LOSS' | 'DRAW'

    if (!results) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-2xl w-full bg-base-100 rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">

                {/* Header Banner */}
                <div className={`h-32 flex items-center justify-center flex-col ${outcome === 'WIN' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                    {outcome === 'WIN' ? (
                        <>
                            <Trophy className="size-12 mb-2 animate-bounce" />
                            <h2 className="text-4xl font-black uppercase tracking-wider">Victory!</h2>
                        </>
                    ) : (
                        <>
                            <XCircle className="size-12 mb-2" />
                            <h2 className="text-4xl font-black uppercase tracking-wider">Defeat</h2>
                        </>
                    )}
                </div>

                {/* content */}
                <div className="p-8">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        {/* You */}
                        <div className="bg-base-200 rounded-xl p-6 text-center border border-white/5">
                            <div className="text-sm text-base-content/60 uppercase tracking-widest font-bold mb-4">You</div>
                            <div className="space-y-2">
                                <div className="text-3xl font-mono font-bold">{results.myScore.passed}/5</div>
                                <div className="text-xs text-base-content/50">Test Cases</div>
                            </div>
                            <div className="divider my-4"></div>
                            <div className="text-lg font-mono text-emerald-400">{results.myScore.runtime || "N/A"}</div>
                        </div>

                        {/* Opponent */}
                        <div className="bg-base-200 rounded-xl p-6 text-center border border-white/5 opacity-80">
                            <div className="text-sm text-base-content/60 uppercase tracking-widest font-bold mb-4">Opponent</div>
                            <div className="space-y-2">
                                <div className="text-3xl font-mono font-bold">{results.opponentScore?.passed || 0}/5</div>
                                <div className="text-xs text-base-content/50">Test Cases</div>
                            </div>
                            <div className="divider my-4"></div>
                            <div className="text-lg font-mono text-emerald-400">{results.opponentScore?.runtime || "N/A"}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={onRematch} className="flex-1 btn btn-outline gap-2 h-12 text-lg">
                            <RotateCcw className="size-5" /> Rematch
                        </button>
                        <Link to="/dashboard" className="flex-1 btn btn-primary gap-2 h-12 text-lg">
                            Dashboard <ArrowRight className="size-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
