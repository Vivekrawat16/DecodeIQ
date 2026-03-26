import { Code2, Loader2, Plus, Search, Zap, Trophy, Flame, Check } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { useState } from "react";

const DIFF = {
  easy:   { color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.28)",  icon: <Zap    size={9} />, label: "Easy"   },
  medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.28)", icon: <Trophy size={9} />, label: "Medium" },
  hard:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.28)",  icon: <Flame  size={9} />, label: "Hard"   },
};

function Badge({ difficulty }) {
  const d = DIFF[difficulty?.toLowerCase()] || {
    color: "#6b7280", bg: "rgba(107,114,128,.12)", border: "rgba(107,114,128,.28)", icon: null, label: difficulty,
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      padding: "3px 8px", fontSize: 10, fontWeight: 700, letterSpacing: ".04em",
      color: d.color, background: d.bg, border: `1px solid ${d.border}`, borderRadius: 99,
    }}>
      {d.icon}{d.label}
    </span>
  );
}

const FILTERS = ["All", "Easy", "Medium", "Hard"];

function CreateSessionModal({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) {
  const problems = Object.values(PROBLEMS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  if (!isOpen) return null;

  const visible = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.difficulty?.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const selected = problems.find(p => p.title === roomConfig.problem);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
          zIndex: 9998, animation: "fadeIn .18s ease",
        }}
      />

      {/* Modal shell */}
      <div style={{
        position: "fixed", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: 16, pointerEvents: "none",
      }}>
        <div style={{
          pointerEvents: "all", width: "100%", maxWidth: 620,
          backgroundColor: "#12141e",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22,
          boxShadow: "0 40px 100px rgba(0,0,0,0.75)",
          overflow: "hidden",
          animation: "slideUp .22s cubic-bezier(.22,1,.36,1)",
          display: "flex", flexDirection: "column", maxHeight: "88vh",
        }}>

          {/* ── Header ── */}
          <div style={{
            padding: "22px 24px 18px",
            background: "linear-gradient(135deg,rgba(99,102,241,.10),rgba(168,85,247,.07))",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(99,102,241,.45)",
              }}>
                <Code2 size={17} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                  Create New Session
                </h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", margin: 0 }}>
                  Pick a problem to challenge your partner
                </p>
              </div>
            </div>
          </div>

          {/* ── Search + Filter chips ── */}
          <div style={{
            padding: "14px 20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            flexShrink: 0,
          }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search
                size={14} color="rgba(255,255,255,.28)"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search problems…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 14px 10px 36px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, fontSize: 13, color: "#f1f5f9", outline: "none",
                }}
              />
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
              {FILTERS.map(f => {
                const active = filter === f;
                const d = DIFF[f.toLowerCase()];
                return (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", border: "1.5px solid", transition: "all .15s ease",
                    background: active ? (d ? d.bg : "rgba(99,102,241,.18)") : "rgba(255,255,255,0.04)",
                    borderColor: active ? (d ? d.border : "rgba(99,102,241,.6)") : "rgba(255,255,255,0.07)",
                    color: active ? (d ? d.color : "#a5b4fc") : "rgba(255,255,255,.4)",
                  }}>
                    {f}
                  </button>
                );
              })}
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,.22)" }}>
                {visible.length} problem{visible.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* ── Problem card grid ── */}
          <div style={{ overflowY: "auto", padding: "14px 20px 10px", flex: 1 }}>
            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "44px 0", color: "rgba(255,255,255,.22)", fontSize: 13 }}>
                No problems match your search
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {visible.map(problem => {
                  const isSelected = roomConfig.problem === problem.title;
                  return (
                    <button
                      key={problem.id}
                      onClick={() => setRoomConfig({ problem: problem.title, difficulty: problem.difficulty })}
                      style={{
                        position: "relative", textAlign: "left",
                        padding: "14px 14px 12px", borderRadius: 14,
                        cursor: "pointer", outline: "none",
                        transition: "all .16s ease",
                        background: isSelected ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                        border: isSelected
                          ? "1.5px solid rgba(99,102,241,.6)"
                          : "1.5px solid rgba(255,255,255,0.07)",
                        boxShadow: isSelected
                          ? "0 0 0 3px rgba(99,102,241,.12), inset 0 1px 0 rgba(255,255,255,.06)"
                          : "inset 0 1px 0 rgba(255,255,255,.04)",
                      }}
                    >
                      {/* Checkmark */}
                      {isSelected && (
                        <div style={{
                          position: "absolute", top: 10, right: 10,
                          width: 20, height: 20, borderRadius: "50%",
                          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Check size={11} color="#fff" strokeWidth={3} />
                        </div>
                      )}

                      {/* Category */}
                      <span style={{
                        fontSize: 10, color: "rgba(255,255,255,.28)",
                        display: "block", marginBottom: 5,
                        textTransform: "uppercase", letterSpacing: ".07em",
                      }}>
                        {problem.category || "General"}
                      </span>

                      {/* Title */}
                      <p style={{
                        fontSize: 13, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.35,
                        color: isSelected ? "#c7d2fe" : "rgba(255,255,255,.85)",
                        paddingRight: isSelected ? 26 : 0,
                      }}>
                        {problem.title}
                      </p>

                      <Badge difficulty={problem.difficulty} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Selected summary strip ── */}
          {selected && (
            <div style={{
              padding: "11px 20px",
              background: "rgba(99,102,241,0.07)",
              borderTop: "1px solid rgba(99,102,241,0.18)",
              flexShrink: 0,
              display: "flex", alignItems: "center", gap: 10,
              animation: "fadeIn .2s ease",
            }}>
              <Check size={15} color="#818cf8" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", flex: 1 }}>
                <span style={{ fontWeight: 600, color: "#c7d2fe" }}>{selected.title}</span>
                <span style={{ marginLeft: 8 }}><Badge difficulty={selected.difficulty} /></span>
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.25)" }}>1-on-1 · 2 players</span>
            </div>
          )}

          {/* ── Footer ── */}
          <div style={{
            padding: "14px 20px 20px",
            display: "flex", justifyContent: "flex-end", gap: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            <button onClick={onClose} style={{
              padding: "10px 20px", borderRadius: 10,
              border: "1.5px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,.5)", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>
              Cancel
            </button>
            <button
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
              style={{
                padding: "10px 22px", borderRadius: 10, border: "none",
                display: "flex", alignItems: "center", gap: 7,
                fontSize: 13, fontWeight: 600, transition: "all .18s ease",
                cursor: isCreating || !roomConfig.problem ? "not-allowed" : "pointer",
                background: isCreating || !roomConfig.problem
                  ? "rgba(99,102,241,.2)"
                  : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: isCreating || !roomConfig.problem ? "rgba(255,255,255,.3)" : "#fff",
                boxShadow: isCreating || !roomConfig.problem
                  ? "none"
                  : "0 4px 18px rgba(99,102,241,.4)",
              }}
            >
              {isCreating
                ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                : <Plus size={15} />}
              {isCreating ? "Creating…" : "Create Session"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}

export default CreateSessionModal;