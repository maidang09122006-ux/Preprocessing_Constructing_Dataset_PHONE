/* global React */
// KBRS UI-kit shell — animated orb background + the fixed filter sidebar.
// Exposes window.KBRSShell = { OrbBackground, Sidebar, Eyebrow }.

function OrbBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 65%)",
        top: -350, left: -250, animation: "kbrs-orb-1 20s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)",
        bottom: -250, right: -150, animation: "kbrs-orb-2 17s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%)",
        top: "45%", left: "40%", animation: "kbrs-orb-1 24s ease-in-out infinite",
      }} />
    </div>
  );
}

function Eyebrow({ icon, children, style = {} }) {
  return (
    <div style={{
      fontSize: 11, color: "var(--text-faint)", fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.1em", ...style,
    }}>
      {icon && <i className={icon} style={{ color: "var(--kbrs-indigo)", marginRight: 6 }} />}
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--divider)", margin: "16px 0" }} />;
}

function Sidebar({ usecases, selected, onToggle, budget, onBudget, topK, onTopK }) {
  const { UseCaseChip } = window.KBRSDesignSystem_5964c9;
  return (
    <aside style={{
      width: 288, flexShrink: 0, alignSelf: "stretch",
      background: "var(--surface-sidebar)", borderRight: "1px solid rgba(99,102,241,0.12)",
      backdropFilter: "blur(12px)", padding: "26px 22px", position: "relative", zIndex: 2,
    }}>
      <div style={{ textAlign: "center", padding: "4px 0 8px" }}>
        <div style={{
          fontSize: 38, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1,
          background: "var(--kbrs-grad-brand)", WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>KBRS</div>
        <div style={{
          fontSize: 11, color: "var(--text-faint)", fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase", marginTop: 3,
        }}>Knowledge-Based Recommendation</div>
      </div>
      <Divider />

      <Eyebrow icon="fa-solid fa-sliders" style={{ marginBottom: 12 }}>Bộ lọc gợi ý</Eyebrow>

      <label style={lblStyle}>Mục đích sử dụng</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
        {usecases.map((u) => (
          <UseCaseChip key={u.id} icon={u.icon} label={u.label.split(" — ")[0].split(" & ")[0]}
            selected={selected.includes(u.id)} onClick={() => onToggle(u.id)} />
        ))}
      </div>

      <label style={lblStyle}>Ngân sách tối đa</label>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "var(--text-heading)" }}>{budget}</span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>triệu VND</span>
      </div>
      <input type="range" min="2" max="65" value={budget} onChange={(e) => onBudget(+e.target.value)}
        style={{ width: "100%", accentColor: "var(--kbrs-indigo)" }} />
      <div style={{ marginBottom: 22 }} />

      <label style={lblStyle}>Số máy gợi ý</label>
      <div style={{ display: "flex", gap: 6 }}>
        {[3, 5, 10].map((k) => (
          <button key={k} onClick={() => onTopK(k)} style={{
            flex: 1, padding: "8px 0", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14,
            fontFamily: "var(--font-body)",
            background: topK === k ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${topK === k ? "var(--kbrs-border-brand)" : "var(--border-card)"}`,
            color: topK === k ? "var(--kbrs-indigo-soft)" : "var(--text-muted)",
            transition: "all 0.2s",
          }}>{k}</button>
        ))}
      </div>

      <Divider />
      <div style={{ fontSize: 11, color: "var(--text-6)", textAlign: "center", lineHeight: 1.6 }}>
        Dataset · <b style={{ color: "var(--text-faint)" }}>387 smartphones</b><br />
        cellphones.com.vn · DS108
      </div>
    </aside>
  );
}

const lblStyle = {
  display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase",
  letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 10,
};

window.KBRSShell = { OrbBackground, Sidebar, Eyebrow, Divider };
