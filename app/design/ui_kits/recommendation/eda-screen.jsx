/* global React */
// KBRS EDA Explorer screen
// Charts: segment bar, brand bar, price histogram, score-by-segment, scatter, panel donut, OS donut

const SEG_COLOR = { budget:"#22c55e", mid:"#3b82f6", high:"#f59e0b", flagship:"#a855f7" };

function ChartCard({ title, children, span }) {
  return (
    <div style={{
      gridColumn: span ? `span ${span}` : "auto",
      background:"var(--surface-card)", border:"1px solid var(--border-card)",
      borderRadius:16, padding:"18px 20px", backdropFilter:"blur(20px)",
    }}>
      <div style={{ fontSize:14, fontWeight:600, color:"var(--text-2)", marginBottom:16 }}>{title}</div>
      {children}
    </div>
  );
}

function VBars({ data }) {
  const max = Math.max(...data.map((d) => d.v), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:200, padding:"0 4px" }}>
      {data.map((d) => (
        <div key={d.k} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:12, fontWeight:700, color:"var(--text-body)" }}>{typeof d.v==="number"&&d.v%1!==0?d.v.toFixed(2):d.v}</span>
          <div style={{ width:"100%", maxWidth:52, height:`${(d.v/max)*160}px`, borderRadius:"6px 6px 0 0", background:d.c||"var(--kbrs-indigo)", minHeight:4 }} />
          <span style={{ fontSize:10, color:"var(--text-muted)", textAlign:"center", lineHeight:1.3 }}>{d.k}</span>
        </div>
      ))}
    </div>
  );
}

function HBars({ data, color }) {
  const max = Math.max(...data.map((d) => d.v), 1);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
      {data.map((d) => (
        <div key={d.k} style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ width:68, fontSize:12, color:"var(--text-muted)", textAlign:"right", flexShrink:0 }}>{d.k}</span>
          <div style={{ flex:1, height:16, background:"rgba(255,255,255,0.04)", borderRadius:4, overflow:"hidden" }}>
            <div style={{ width:`${(d.v/max)*100}%`, height:"100%", borderRadius:4, background:color||"var(--kbrs-indigo)" }} />
          </div>
          <span style={{ width:28, fontSize:12, fontWeight:700, color:"var(--text-body)" }}>{d.v}</span>
        </div>
      ))}
    </div>
  );
}

function Donut({ data }) {
  let acc = 0;
  const total = data.reduce((s, d) => s + d.v, 0);
  const stops = data.map((d) => {
    const start = (acc/total)*360; acc += d.v;
    return `${d.c} ${start}deg ${(acc/total)*360}deg`;
  }).join(", ");
  return (
    <div style={{ display:"flex", alignItems:"center", gap:20 }}>
      <div style={{ width:120, height:120, borderRadius:"50%", background:`conic-gradient(${stops})`, position:"relative", flexShrink:0 }}>
        <div style={{ position:"absolute", inset:33, borderRadius:"50%", background:"var(--kbrs-surface-2)" }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {data.map((d) => (
          <div key={d.k} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"var(--text-body)" }}>
            <span style={{ width:10, height:10, borderRadius:3, background:d.c, flexShrink:0 }} />
            {d.k} <b style={{ color:"var(--text-2)" }}>{d.v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scatter({ phones }) {
  return (
    <div style={{ position:"relative", height:280, borderLeft:"1px solid var(--border-faint)", borderBottom:"1px solid var(--border-faint)", margin:"8px 12px 28px 44px" }}>
      <span style={{ position:"absolute", left:-38, top:"50%", transform:"rotate(-90deg) translateX(50%)", fontSize:11, color:"var(--text-muted)", whiteSpace:"nowrap" }}>Camera</span>
      <span style={{ position:"absolute", bottom:-22, left:"50%", transform:"translateX(-50%)", fontSize:11, color:"var(--text-muted)" }}>Hiệu năng</span>
      {phones.map((p,i) => (
        <div key={p.name+i} title={`${p.name}\nPerf: ${p.perf} | Cam: ${p.cam}`} style={{
          position:"absolute", width:9, height:9, borderRadius:"50%",
          background:SEG_COLOR[p.seg]||"#94a3b8", opacity:0.75,
          left:`${(p.perf/10)*100}%`, bottom:`${(p.cam/10)*100}%`,
          transform:"translate(-50%,50%)", cursor:"default",
        }} />
      ))}
    </div>
  );
}

function PriceHist({ phones }) {
  const bins = [
    { k:"<3M",    min:0,    max:3e6 },
    { k:"3–5M",   min:3e6,  max:5e6 },
    { k:"5–8M",   min:5e6,  max:8e6 },
    { k:"8–12M",  min:8e6,  max:12e6 },
    { k:"12–18M", min:12e6, max:18e6 },
    { k:"18–25M", min:18e6, max:25e6 },
    { k:">25M",   min:25e6, max:Infinity },
  ];
  const data = bins.map((b) => ({
    k: b.k,
    v: phones.filter((p) => p.price >= b.min && p.price < b.max).length,
    c: "linear-gradient(180deg,#6366f1,#a855f7)",
  }));
  return <VBars data={data} />;
}

function ScoreSegment({ phones }) {
  const [metric, setMetric] = React.useState("perf");
  const METRICS = [
    { id:"perf", label:"Hiệu năng", c:"#10b981" },
    { id:"cam",  label:"Camera",    c:"#3b82f6" },
    { id:"batt", label:"Pin",       c:"#f59e0b" },
    { id:"disp", label:"Màn hình",  c:"#8b5cf6" },
  ];
  const m = METRICS.find((x) => x.id === metric);
  const data = ["budget","mid","high","flagship"].map((s) => {
    const grp = phones.filter((p) => p.seg === s);
    const avg = grp.length ? grp.reduce((sum,p) => sum + p[metric], 0) / grp.length : 0;
    return { k: s, v: parseFloat(avg.toFixed(2)), c: SEG_COLOR[s] };
  });
  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
        {METRICS.map((mx) => (
          <button key={mx.id} onClick={() => setMetric(mx.id)} style={{
            padding:"4px 11px", borderRadius:7, cursor:"pointer", fontSize:11, fontWeight:600,
            fontFamily:"var(--font-body)", transition:"all .18s",
            background: metric===mx.id ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${metric===mx.id ? "var(--kbrs-border-brand)" : "var(--border-card)"}`,
            color: metric===mx.id ? "var(--kbrs-indigo-soft)" : "var(--text-muted)",
          }}>{mx.label}</button>
        ))}
      </div>
      <VBars data={data} />
    </div>
  );
}

function EdaScreen() {
  const phones = window.KBRS_PHONES;

  const segCounts = ["budget","mid","high","flagship"].map((k) => ({
    k, v:phones.filter((p)=>p.seg===k).length, c:SEG_COLOR[k],
  }));

  const brandMap = {};
  phones.forEach((p) => { brandMap[p.brand]=(brandMap[p.brand]||0)+1; });
  const brands = Object.entries(brandMap).map(([k,v])=>({k,v})).sort((a,b)=>b.v-a.v).slice(0,8);

  const panelMap = {};
  phones.forEach((p)=>{ panelMap[p.panel]=(panelMap[p.panel]||0)+1; });
  const panelColors = ["#6366f1","#a855f7","#ec4899","#f59e0b"];
  const panels = Object.entries(panelMap).sort((a,b)=>b[1]-a[1]).map(([k,v],i)=>({k,v,c:panelColors[i%4]}));

  const osMap = {};
  phones.forEach((p)=>{ osMap[p.os]=(osMap[p.os]||0)+1; });
  const osColors = ["#10b981","#3b82f6","#f59e0b","#94a3b8"];
  const oses = Object.entries(osMap).sort((a,b)=>b[1]-a[1]).map(([k,v],i)=>({k,v,c:osColors[i%4]}));

  return (
    <div style={{ animation:"kbrs-fade-in 0.5s ease" }}>
      <div style={{ padding:"4px 0 22px" }}>
        <div className="kbrs-gradient-text" style={{ fontSize:32, fontWeight:800 }}>EDA Explorer</div>
        <div style={{ fontSize:14, color:"var(--text-faint)", marginTop:4 }}>387 smartphones · cellphones.com.vn</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <ChartCard title="Phân phối phân khúc giá"><VBars data={segCounts} /></ChartCard>
        <ChartCard title="Top hãng theo số sản phẩm"><HBars data={brands} color="var(--kbrs-indigo)" /></ChartCard>
        <ChartCard title="Phân phối giá bán"><PriceHist phones={phones} /></ChartCard>
        <ChartCard title="Điểm KBRS theo phân khúc"><ScoreSegment phones={phones} /></ChartCard>
        <ChartCard title="Tương quan Hiệu năng × Camera" span={2}><Scatter phones={phones} /></ChartCard>
        <ChartCard title="Loại tấm nền (Panel)"><Donut data={panels} /></ChartCard>
        <ChartCard title="Hệ điều hành"><Donut data={oses} /></ChartCard>
      </div>
    </div>
  );
}

window.KBRSEdaScreen = { EdaScreen };
