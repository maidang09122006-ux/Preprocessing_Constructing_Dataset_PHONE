/* global React */
// KBRS Dataset Browser screen — filter bar (brand / segment / OS / sort) over a
// dense, segment-color-coded table. Exposes window.KBRSDatasetScreen.

const SEG = {
  budget:   { bg: "#052e16", c: "#4ade80", label: "Budget" },
  mid:      { bg: "#0c1a3a", c: "#60a5fa", label: "Mid" },
  high:     { bg: "#2d1b00", c: "#fbbf24", label: "High" },
  flagship: { bg: "#1e0a3a", c: "#c084fc", label: "Flagship" },
};

function Pill({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 13px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontWeight: 600,
      fontFamily: "var(--font-body)", whiteSpace: "nowrap",
      background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${active ? "var(--kbrs-border-brand)" : "var(--border-card)"}`,
      color: active ? "var(--kbrs-indigo-soft)" : "var(--text-muted)", transition: "all 0.2s",
    }}>{children}</button>
  );
}

function DatasetScreen() {
  const { BrandMark, Button } = window.KBRSDesignSystem_5964c9;
  const all = window.KBRS_PHONES;
  const [seg, setSeg] = React.useState(null);
  const [os, setOs] = React.useState(null);
  const [sort, setSort] = React.useState("price");
  const [dir, setDir] = React.useState("asc");

  const DEFAULT_DIR = { price: "asc", perf: "desc", cam: "desc", batt: "desc", disp: "desc" };

  const handleSort = (k) => {
    if (k === sort) { setDir((d) => d === "asc" ? "desc" : "asc"); }
    else { setSort(k); setDir(DEFAULT_DIR[k]); }
  };

  const oses = [...new Set(all.map((p) => p.os))].filter(Boolean).sort();

  let rows = all.slice();
  if (seg) rows = rows.filter((p) => p.seg === seg);
  if (os) rows = rows.filter((p) => p.os === os);
  rows.sort((a, b) => dir === "asc" ? a[sort] - b[sort] : b[sort] - a[sort]);

  const th = { textAlign: "left", padding: "11px 14px", fontSize: 11, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)",
    borderBottom: "1px solid var(--border-card)", whiteSpace: "nowrap" };
  const td = { padding: "11px 14px", fontSize: 13, color: "var(--text-body)", borderBottom: "1px solid var(--border-faint)", whiteSpace: "nowrap" };
  const num = { ...td, fontFamily: "var(--font-mono)", textAlign: "right" };

  return (
    <div style={{ animation: "kbrs-fade-in 0.5s ease" }}>
      <div style={{ padding: "4px 0 22px" }}>
        <div className="kbrs-gradient-text" style={{ fontSize: 32, fontWeight: 800 }}>Dataset Browser</div>
        <div style={{ fontSize: 14, color: "var(--text-faint)", marginTop: 4 }}>{all.length} smartphones · 32 cột · scored_data.csv</div>
      </div>

      {/* filter bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 16, alignItems: "flex-end" }}>
        <div>
          <div style={lbl}>Phân khúc</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["budget", "mid", "high", "flagship"].map((s) => (
              <Pill key={s} active={seg === s} onClick={() => setSeg(seg === s ? null : s)}>{s}</Pill>
            ))}
          </div>
        </div>
        <div>
          <div style={lbl}>OS</div>
          <div style={{ display: "flex", gap: 6 }}>
            {oses.map((o) => <Pill key={o} active={os === o} onClick={() => setOs(os === o ? null : o)}>{o}</Pill>)}
          </div>
        </div>
        <div>
          <div style={lbl}>Sắp xếp theo</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[["price", "Giá"], ["perf", "Hiệu năng"], ["cam", "Camera"], ["batt", "Pin"]].map(([k, v]) => (
              <Pill key={k} active={sort === k} onClick={() => handleSort(k)}>{v}</Pill>
            ))}
            <button onClick={() => setDir((d) => d === "asc" ? "desc" : "asc")} title={dir === "asc" ? "Đang tăng dần — bấm để đảo" : "Đang giảm dần — bấm để đảo"} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "5px 12px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontWeight: 700,
              fontFamily: "var(--font-body)", background: "rgba(99,102,241,0.15)",
              border: "1px solid var(--kbrs-border-brand)", color: "var(--kbrs-indigo-soft)",
              transition: "all 0.2s", lineHeight: 1, whiteSpace: "nowrap",
            }}>
              <i className={dir === "asc" ? "fa-solid fa-arrow-up-short-wide" : "fa-solid fa-arrow-down-wide-short"} style={{ fontSize: 13 }} />
              {dir === "asc" ? "Tăng dần" : "Giảm dần"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-6)", marginBottom: 12 }}>
        Hiển thị <b style={{ color: "var(--kbrs-indigo)" }}>{rows.length}</b> / {all.length} sản phẩm
      </div>

      {/* table */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--surface-card)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxHeight: 460, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--kbrs-surface-1)", backdropFilter: "blur(8px)" }}>
              <tr>
                <th style={th}>Sản phẩm</th><th style={th}>Phân khúc</th>
                <th style={{ ...th, textAlign: "right" }}>Giá</th>
                <th style={{ ...th, textAlign: "right" }}>Hiệu năng</th>
                <th style={{ ...th, textAlign: "right" }}>Camera</th>
                <th style={{ ...th, textAlign: "right" }}>Pin</th>
                <th style={{ ...th, textAlign: "right" }}>Màn hình</th>
                <th style={th}>Chip</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.name}>
                  <td style={td}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                      <BrandMark brand={p.brand} size={18} />
                      <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{p.name}</span>
                    </span>
                  </td>
                  <td style={td}>
                    <span style={{ background: SEG[p.seg].bg, color: SEG[p.seg].c, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{SEG[p.seg].label}</span>
                  </td>
                  <td style={num}>{p.price.toLocaleString("vi-VN")}đ</td>
                  <td style={{ ...num, color: "var(--kbrs-perf-soft)" }}>{p.perf.toFixed(1)}</td>
                  <td style={{ ...num, color: "var(--kbrs-cam-soft)" }}>{p.cam.toFixed(1)}</td>
                  <td style={{ ...num, color: "var(--kbrs-batt-soft)" }}>{p.batt.toFixed(1)}</td>
                  <td style={{ ...num, color: "var(--kbrs-disp-soft)" }}>{p.disp.toFixed(1)}</td>
                  <td style={{ ...td, color: "var(--text-muted)", fontSize: 12 }}>{p.chip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Button variant="secondary" icon="fa-solid fa-download">Tải CSV (filtered)</Button>
      </div>
    </div>
  );
}

const lbl = { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 8 };

window.KBRSDatasetScreen = { DatasetScreen };
