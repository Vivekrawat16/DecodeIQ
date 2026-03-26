import { Play, CheckCircle, Clock, Users } from "lucide-react";

export default function CompetitionHeader({
    problemTitle,
    timeLeft,
    opponentStatus,
    onRun,
    onSubmit,
    isSubmitting
}) {

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
    };

    const getTimerColor = () => {
        if (timeLeft < 300) return "text-error animate-pulse";
        if (timeLeft < 600) return "text-warning";
        return "text-base-content";
    };

    return (
        <header className="h-16 bg-base-100 border-b border-base-content/10 flex items-center justify-between px-6 shadow-sm z-10">

            {/* Left: Problem Info */}
            <div className="flex items-center gap-4">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Clock className="size-4" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">{problemTitle || "Loading..."}</h1>
                    <div className="text-xs text-base-content/60 font-mono">Hard • 25 Points</div>
                </div>
            </div>

            {/* Center: Timer & Status */}
            <div className="flex flex-col items-center">
                <div className={`text-2xl font-mono font-bold tracking-widest ${getTimerColor()}`}>
                    {timeLeft ? formatTime(timeLeft) : "--:--"}
                </div>

                {/* Opponent Activity Indicator */}
                <div className="h-4 flex items-center justify-center gap-2 mt-1">
                    {opponentStatus?.isTyping && (
                        <span className="text-xs text-primary animate-pulse font-medium">
                            Opponent is typing...
                        </span>
                    )}
                    {opponentStatus?.passed !== undefined && (
                        <span className="text-xs text-success font-medium">
                            Opponent: {opponentStatus.passed}/{opponentStatus.total} Cases
                        </span>
                    )}
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onRun}
                    disabled={isSubmitting}
                    className="btn btn-ghost hover:bg-base-200 gap-2 font-medium"
                >
                    <Play className="size-4 text-emerald-500" />
                    Run
                </button>

                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="btn btn-primary gap-2 shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <CheckCircle className="size-4" />
                    )}
                    Submit
                </button>
            </div>
        </header>
    );
}
