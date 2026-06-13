/* global React */
// KBRS Recommendation screen — hard filters khớp engine.py MAPPING_MATRIX_CONFIG
// Exposes window.KBRSRecoScreen.

const HARD = {
  Gia_Re:             (p) => p.seg === "budget",
  Flagship:           (p) => p.seg === "flagship",
  Lien_Lac_Co_Ban:    (_) => true,
  Choi_Game:          (p) => p.perf >= 5.8 && p.refresh >= 120 && p.ram >= 8,
  Giai_Tri_MXH:       (p) => p.display_tier >= 3,
  Chup_Hinh:          (p) => p.cam >= 7.7 && p.storage >= 128 && p.rear_cam >= 48 && p.front_cam >= 12,
  Quay_Phim:          (p) => p.cam >= 7.7 && p.storage >= 256 && p.video_rank >= 4 && p.fps >= 30,
  Pin_Trau_Sac_Nhanh: (p) => p.battery >= 6000 && p.charge >= 33,
  Nho_Gon_Nhe_Tay:    (p) => p.weight_tier === 1,
  Khang_Nuoc:         (p) => p.ip === 1,
  Can_Bang:           (_) => true,
};

function runKbrs(phones, needs, budgetVnd, topK) {
  const cfg = window.KBRS_USECASES;
  const valid = needs.filter((n) => cfg.some((c) => c.id === n));
  if (!valid.length) return { results: [], err: "Chọn ít nhất 1 mục đích sử dụng." };

  const acc = { perf: 0, cam: 0, batt: 0, disp: 0 };
  valid.forEach((id) => {
    const w = cfg.find((c) => c.id === id).w;
    acc.perf += w.perf; acc.cam += w.cam; acc.batt += w.batt; acc.disp += w.disp;
  });
  const n = valid.length;
  const vec = { perf: acc.perf/n, cam: acc.cam/n, batt: acc.batt/n, disp: acc.disp/n };

  let pool = phones.filter((p) => p.price <= budgetVnd * 1.1);
  valid.forEach((id) => { if (HARD[id]) pool = pool.filter(HARD[id]); });

  if (!pool.length) return {
    results: [],
    err: "Không có máy nào thỏa mãn đồng thời tất cả điều kiện. Thử bỏ bớt use-case hoặc tăng ngân sách.",
  };

  const scored = pool.map((p) => {
    let base = p.perf*vec.perf + p.cam*vec.cam + p.batt*vec.batt + p.disp*vec.disp;
    if (p.price > budgetVnd) base -= base * ((p.price - budgetVnd) / budgetVnd * 0.5);
    return { ...p, total: base };
  });
  scored.sort((a, b) => b.total - a.total);
  return { results: scored.slice(0, topK), err: null };
}

function RecoScreen({ selected, budget, topK }) {
  const { MetricCard, UseCaseChip, PhoneCard } = window.KBRSDesignSystem_5964c9;
  const phones = window.KBRS_PHONES;
  const budgetVnd = budget * 1e6;
  const { results, err } = runKbrs(phones, selected, budgetVnd, topK);
  const within = phones.filter((p) => p.price <= budgetVnd).length;
  const cfg = window.KBRS_USECASES;

  return (
    <div style={{ animation: "kbrs-fade-in 0.5s ease" }}>
      <div style={{ padding: "4px 0 22px" }}>
        <div className="kbrs-gradient-text" style={{ fontSize: 32, fontWeight: 800 }}>Gợi ý điện thoại</div>
        <div style={{ fontSize: 14, color: "var(--text-faint)", marginTop: 4 }}>Hệ thống gợi ý dựa trên tri thức · Scoring theo use-case của bạn</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 26 }}>
        <MetricCard label="Tổng dataset"     value={`${phones.length} máy`}                           icon="fa-solid fa-database" />
        <MetricCard label="Trong ngân sách" value={`${within} máy`}                                  icon="fa-solid fa-wallet"   />
        <MetricCard label="Sau hard filter" value={err ? "—" : `${results.length} máy`}               icon="fa-solid fa-filter"   />
        <MetricCard label="Điểm top 1"      value={err ? "—" : `${results[0].total.toFixed(2)} / 10`} icon="fa-solid fa-star"     />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 8 }}>
        {selected.map((id) => {
          const u = cfg.find((c) => c.id === id);
          return u ? <UseCaseChip key={id} icon={u.icon} label={u.label} /> : null;
        })}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 22 }}>
        Ngân sách <b style={{ color: "var(--kbrs-indigo)" }}>{budget}M VND</b> (soft ±10%) · Top {topK} máy
      </div>

      {err ? (
        <div style={{
          background: "var(--surface-panel)", border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 12, padding: "18px 20px", color: "var(--text-body)", fontSize: 14,
        }}>
          <i className="fa-solid fa-circle-info" style={{ color: "var(--kbrs-indigo)", marginRight: 8 }} />{err}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {results.map((p, i) => (
            <div key={p.name + i} style={{ animation: `kbrs-slide-up 0.45s ease ${i * 0.07}s both` }}>
              <PhoneCard rank={i + 1} phone={p} total={p.total} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.KBRSRecoScreen = { RecoScreen, runKbrs };
