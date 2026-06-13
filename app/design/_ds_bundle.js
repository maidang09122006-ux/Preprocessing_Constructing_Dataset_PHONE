/* @ds-bundle: {"format":3,"namespace":"KBRSDesignSystem_5964c9","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"TabBar","sourcePath":"components/core/TabBar.jsx"},{"name":"BrandMark","sourcePath":"components/data-viz/BrandMark.jsx"},{"name":"MetricCard","sourcePath":"components/data-viz/MetricCard.jsx"},{"name":"PhoneCard","sourcePath":"components/data-viz/PhoneCard.jsx"},{"name":"ScoreBar","sourcePath":"components/data-viz/ScoreBar.jsx"},{"name":"UseCaseChip","sourcePath":"components/data-viz/UseCaseChip.jsx"}],"sourceHashes":{"assets/data/sample_phones.js":"e6ff1f200082","components/core/Badge.jsx":"19bd8af6475a","components/core/Button.jsx":"c83f6bf9e24a","components/core/Card.jsx":"71d992b1c92c","components/core/Chip.jsx":"20814faff77e","components/core/IconButton.jsx":"3efd6046a943","components/core/TabBar.jsx":"0932bfa3c766","components/data-viz/BrandMark.jsx":"b18ace5ecf4c","components/data-viz/MetricCard.jsx":"faad56c84480","components/data-viz/PhoneCard.jsx":"2ad6b10e34d9","components/data-viz/ScoreBar.jsx":"8e2426ea89ff","components/data-viz/UseCaseChip.jsx":"f6ae4a2056a9","ui_kits/recommendation/dataset-screen.jsx":"25382b3e7615","ui_kits/recommendation/eda-screen.jsx":"8c8da14a1427","ui_kits/recommendation/reco-screen.jsx":"144807dd1955","ui_kits/recommendation/shell.jsx":"be6c9ebc7766"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KBRSDesignSystem_5964c9 = window.KBRSDesignSystem_5964c9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/data/sample_phones.js
try { (() => {
// KBRS — curated sample of the 387-row scored_data.csv (real rows from
// data/final/scored_data.csv, cellphones.com.vn). Used to populate UI kits
// with authentic content. Scores are 0–10 Min-Max normalized.
window.KBRS_PHONES = [{
  name: "OPPO Find N5 16GB 512GB",
  brand: "OPPO",
  price: 44180000,
  seg: "flagship",
  perf: 8.18,
  cam: 9.84,
  batt: 6.49,
  disp: 8.29,
  ram: 16,
  storage: 512,
  battery: 5600,
  charge: 80,
  weight: 229,
  screen: 8.12,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Elite",
  ip: 1
}, {
  name: "Samsung Galaxy S26 Ultra 12GB 512GB",
  brand: "Samsung",
  price: 36990000,
  seg: "flagship",
  perf: 7.63,
  cam: 9.11,
  batt: 5.20,
  disp: 6.29,
  ram: 12,
  storage: 512,
  battery: 5000,
  charge: 60,
  weight: 214,
  screen: 6.9,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Elite Gen 5",
  ip: 0
}, {
  name: "iPhone 16 Pro Max 1TB",
  brand: "Apple",
  price: 42990000,
  seg: "flagship",
  perf: 7.20,
  cam: 9.43,
  batt: 3.48,
  disp: 6.29,
  ram: 8,
  storage: 1024,
  battery: 4422,
  charge: 30,
  weight: 214,
  screen: 6.9,
  refresh: 120,
  panel: "AMOLED",
  os: "iOS",
  chip: "Apple A18 Pro",
  ip: 1
}, {
  name: "iPhone 17 512GB",
  brand: "Apple",
  price: 29990000,
  seg: "flagship",
  perf: 7.16,
  cam: 8.21,
  batt: 3.25,
  disp: 4.29,
  ram: 8,
  storage: 512,
  battery: 4422,
  charge: 25,
  weight: 177,
  screen: 6.3,
  refresh: 120,
  panel: "AMOLED",
  os: "iOS",
  chip: "Apple A19",
  ip: 1
}, {
  name: "Xiaomi 15 5G 12GB 512GB",
  brand: "Xiaomi",
  price: 19290000,
  seg: "high",
  perf: 7.32,
  cam: 8.29,
  batt: 6.72,
  disp: 4.29,
  ram: 12,
  storage: 512,
  battery: 5240,
  charge: 90,
  weight: 191,
  screen: 6.36,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Elite",
  ip: 1
}, {
  name: "Samsung Galaxy Z Fold6 12GB 512GB",
  brand: "Samsung",
  price: 31990000,
  seg: "flagship",
  perf: 6.60,
  cam: 6.91,
  batt: 3.24,
  disp: 8.29,
  ram: 12,
  storage: 512,
  battery: 4400,
  charge: 25,
  weight: 239,
  screen: 7.6,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Gen 3",
  ip: 1
}, {
  name: "ASUS ROG Phone 6 16GB 512GB",
  brand: "ASUS",
  price: 16990000,
  seg: "high",
  perf: 6.17,
  cam: 6.38,
  batt: 6.06,
  disp: 7.20,
  ram: 16,
  storage: 512,
  battery: 6000,
  charge: 65,
  weight: 194,
  screen: 6.78,
  refresh: 144,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8+ Gen 1",
  ip: 1
}, {
  name: "Xiaomi 14T Pro 12GB 512GB",
  brand: "Xiaomi",
  price: 12990000,
  seg: "high",
  perf: 6.65,
  cam: 7.32,
  batt: 7.93,
  disp: 7.20,
  ram: 12,
  storage: 512,
  battery: 5000,
  charge: 120,
  weight: 209,
  screen: 6.67,
  refresh: 144,
  panel: "AMOLED",
  os: "Android",
  chip: "Dimensity 9300+",
  ip: 1
}, {
  name: "Samsung Galaxy S23 8GB 128GB",
  brand: "Samsung",
  price: 13790000,
  seg: "high",
  perf: 4.69,
  cam: 7.15,
  batt: 2.92,
  disp: 4.29,
  ram: 8,
  storage: 128,
  battery: 3900,
  charge: 25,
  weight: 168,
  screen: 6.1,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Gen 2",
  ip: 1
}, {
  name: "iPhone 16e 256GB",
  brand: "Apple",
  price: 15490000,
  seg: "high",
  perf: 6.44,
  cam: 8.29,
  batt: 3.32,
  disp: 4.29,
  ram: 8,
  storage: 256,
  battery: 4900,
  charge: 20,
  weight: 194,
  screen: 6.1,
  refresh: 60,
  panel: "AMOLED",
  os: "iOS",
  chip: "Apple A18",
  ip: 1
}, {
  name: "HONOR X9d 5G 12GB 256GB",
  brand: "Honor",
  price: 11190000,
  seg: "high",
  perf: 4.49,
  cam: 1.30,
  batt: 7.55,
  disp: 6.29,
  ram: 12,
  storage: 256,
  battery: 8300,
  charge: 66,
  weight: 193,
  screen: 6.79,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 6 Gen 4",
  ip: 1
}, {
  name: "Nothing Phone 2A 5G 12GB 256GB",
  brand: "Nothing",
  price: 8490000,
  seg: "mid",
  perf: 4.49,
  cam: 6.38,
  batt: 4.52,
  disp: 6.29,
  ram: 12,
  storage: 256,
  battery: 5000,
  charge: 45,
  weight: 190,
  screen: 6.7,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Dimensity 7200 Pro",
  ip: 1
}, {
  name: "Xiaomi Redmi Note 14 Pro+ 5G 8GB 256GB",
  brand: "Xiaomi",
  price: 7990000,
  seg: "mid",
  perf: 3.74,
  cam: 4.67,
  batt: 8.00,
  disp: 6.29,
  ram: 8,
  storage: 256,
  battery: 5110,
  charge: 120,
  weight: 210,
  screen: 6.67,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 7s Gen 3",
  ip: 1
}, {
  name: "Samsung Galaxy A36 5G 8GB 128GB",
  brand: "Samsung",
  price: 7490000,
  seg: "mid",
  perf: 3.41,
  cam: 5.04,
  batt: 4.52,
  disp: 6.29,
  ram: 8,
  storage: 128,
  battery: 5000,
  charge: 45,
  weight: 195,
  screen: 6.7,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 6 Gen 3",
  ip: 1
}, {
  name: "OPPO Reno11 F 5G 8GB 256GB",
  brand: "OPPO",
  price: 6990000,
  seg: "mid",
  perf: 3.38,
  cam: 5.45,
  batt: 5.52,
  disp: 6.29,
  ram: 8,
  storage: 256,
  battery: 5000,
  charge: 67,
  weight: 178,
  screen: 6.7,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Dimensity 7050",
  ip: 1
}, {
  name: "vivo Y28 8GB 128GB",
  brand: "Vivo",
  price: 5790000,
  seg: "mid",
  perf: 2.63,
  cam: 6.38,
  batt: 5.10,
  disp: 1.14,
  ram: 8,
  storage: 128,
  battery: 6000,
  charge: 44,
  weight: 199,
  screen: 6.68,
  refresh: 90,
  panel: "LCD",
  os: "Android",
  chip: "Helio G85",
  ip: 1
}, {
  name: "Tecno Pova 7 8GB 256GB",
  brand: "Tecno",
  price: 4990000,
  seg: "budget",
  perf: 3.12,
  cam: 7.56,
  batt: 5.78,
  disp: 2.29,
  ram: 8,
  storage: 256,
  battery: 7000,
  charge: 45,
  weight: 226,
  screen: 6.78,
  refresh: 120,
  panel: "LCD",
  os: "Android",
  chip: "Helio G100 Ultimate",
  ip: 1
}, {
  name: "Xiaomi Redmi Note 13 Pro 4G 8GB 128GB",
  brand: "Xiaomi",
  price: 4690000,
  seg: "budget",
  perf: 2.99,
  cam: 6.10,
  batt: 5.52,
  disp: 6.29,
  ram: 8,
  storage: 128,
  battery: 5000,
  charge: 67,
  weight: 188,
  screen: 6.67,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Helio G99-Ultra",
  ip: 1
}, {
  name: "Nubia V80 Max 8GB 128GB",
  brand: "Nubia",
  price: 3890000,
  seg: "budget",
  perf: 2.17,
  cam: 6.38,
  batt: 4.13,
  disp: 2.29,
  ram: 8,
  storage: 128,
  battery: 6000,
  charge: 22.5,
  weight: 192,
  screen: 6.9,
  refresh: 120,
  panel: "LCD",
  os: "Android",
  chip: "Unisoc T7250",
  ip: 0
}, {
  name: "realme Note 60 4GB 64GB",
  brand: "Realme",
  price: 2490000,
  seg: "budget",
  perf: 1.71,
  cam: 2.44,
  batt: 2.93,
  disp: 1.14,
  ram: 4,
  storage: 64,
  battery: 5000,
  charge: 10,
  weight: 188,
  screen: 6.74,
  refresh: 90,
  panel: "LCD",
  os: "Android",
  chip: "UNISOC T612",
  ip: 1
}, {
  name: "TECNO SPARK 30C 4GB 128GB",
  brand: "Tecno",
  price: 2190000,
  seg: "budget",
  perf: 1.78,
  cam: 7.56,
  batt: 3.30,
  disp: 2.29,
  ram: 4,
  storage: 128,
  battery: 5000,
  charge: 18,
  weight: 192,
  screen: 6.67,
  refresh: 120,
  panel: "Unknown",
  os: "Android",
  chip: "Helio G81",
  ip: 1
}, {
  name: "Samsung Galaxy S23 Ultra 12GB 1TB",
  brand: "Samsung",
  price: 44990000,
  seg: "flagship",
  perf: 6.43,
  cam: 7.72,
  batt: 4.52,
  disp: 6.29,
  ram: 12,
  storage: 1024,
  battery: 5000,
  charge: 45,
  weight: 233,
  screen: 6.8,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Gen 2",
  ip: 1
}, {
  name: "Sony Xperia 1VI 12GB 256GB",
  brand: "Sony",
  price: 22990000,
  seg: "flagship",
  perf: 6.35,
  cam: 2.07,
  batt: 3.61,
  disp: 6.29,
  ram: 12,
  storage: 256,
  battery: 5000,
  charge: 25,
  weight: 192,
  screen: 6.5,
  refresh: 120,
  panel: "AMOLED",
  os: "Android",
  chip: "Snapdragon 8 Gen 3",
  ip: 1
}, {
  name: "OPPO Reno8 5G 8GB 256GB",
  brand: "OPPO",
  price: 13990000,
  seg: "high",
  perf: 3.64,
  cam: 5.45,
  batt: 5.80,
  disp: 3.14,
  ram: 8,
  storage: 256,
  battery: 4500,
  charge: 80,
  weight: 179,
  screen: 6.4,
  refresh: 90,
  panel: "AMOLED",
  os: "Android",
  chip: "Dimensity 1300",
  ip: 1
}];

// Use-case profiles (from MAPPING_MATRIX_CONFIG in app.py)
window.KBRS_USECASES = [{
  id: "Can_Bang",
  label: "Cân bằng — Tốt đều các mặt",
  icon: "fa-shuffle",
  w: {
    perf: .25,
    cam: .25,
    batt: .25,
    disp: .25
  }
}, {
  id: "Gia_Re",
  label: "Giá rẻ nhất trong ngân sách",
  icon: "fa-tag",
  w: {
    perf: .25,
    cam: .25,
    batt: .25,
    disp: .25
  }
}, {
  id: "Flagship",
  label: "Flagship — Hiệu năng tổng thể",
  icon: "fa-crown",
  w: {
    perf: .3,
    cam: .3,
    batt: .1,
    disp: .3
  }
}, {
  id: "Lien_Lac_Co_Ban",
  label: "Liên lạc cơ bản",
  icon: "fa-phone",
  w: {
    perf: .1,
    cam: .1,
    batt: .7,
    disp: .1
  }
}, {
  id: "Choi_Game",
  label: "Chơi game — Gaming",
  icon: "fa-gamepad",
  w: {
    perf: .7,
    cam: .05,
    batt: .15,
    disp: .1
  }
}, {
  id: "Giai_Tri_MXH",
  label: "Giải trí & mạng xã hội",
  icon: "fa-play",
  w: {
    perf: .2,
    cam: .1,
    batt: .3,
    disp: .4
  }
}, {
  id: "Chup_Hinh",
  label: "Chụp hình",
  icon: "fa-camera",
  w: {
    perf: .15,
    cam: .6,
    batt: .1,
    disp: .15
  }
}, {
  id: "Quay_Phim",
  label: "Quay phim",
  icon: "fa-video",
  w: {
    perf: .15,
    cam: .6,
    batt: .1,
    disp: .15
  }
}, {
  id: "Pin_Trau_Sac_Nhanh",
  label: "Pin trâu & sạc nhanh",
  icon: "fa-battery-full",
  w: {
    perf: .1,
    cam: .1,
    batt: .7,
    disp: .1
  }
}, {
  id: "Nho_Gon_Nhe_Tay",
  label: "Nhỏ gọn, nhẹ tay",
  icon: "fa-feather",
  w: {
    perf: .2,
    cam: .3,
    batt: .2,
    disp: .3
  }
}, {
  id: "Khang_Nuoc",
  label: "Kháng nước (chuẩn IP)",
  icon: "fa-droplet",
  w: {
    perf: .25,
    cam: .25,
    batt: .25,
    disp: .25
  }
}];

// Segment metadata
window.KBRS_SEGMENTS = {
  budget: {
    label: "Budget · < 5M",
    color: "#22c55e",
    soft: "#4ade80"
  },
  mid: {
    label: "Mid · 5–10M",
    color: "#3b82f6",
    soft: "#60a5fa"
  },
  high: {
    label: "High · 10–20M",
    color: "#f59e0b",
    soft: "#fbbf24"
  },
  flagship: {
    label: "Flagship · ≥ 20M",
    color: "#a855f7",
    soft: "#c084fc"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/data/sample_phones.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SEGMENTS = {
  budget: {
    label: "Budget · < 5M",
    color: "#4ade80",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.20)"
  },
  mid: {
    label: "Mid · 5–10M",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.20)"
  },
  high: {
    label: "High · 10–20M",
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.20)"
  },
  flagship: {
    label: "Flagship · ≥ 20M",
    color: "#c084fc",
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.20)"
  }
};

/**
 * Badge — uppercase pill. Pass `segment` to auto-style as a KBRS price-segment
 * badge (budget/mid/high/flagship), or `tone` for a neutral/semantic pill.
 */
function Badge({
  children,
  segment,
  tone = "brand",
  label,
  style = {},
  ...rest
}) {
  let colors;
  if (segment && SEGMENTS[segment]) {
    const s = SEGMENTS[segment];
    colors = {
      color: s.color,
      background: s.bg,
      border: s.border
    };
  } else {
    const tones = {
      brand: {
        color: "#a5b4fc",
        background: "rgba(99,102,241,0.12)",
        border: "rgba(99,102,241,0.25)"
      },
      neutral: {
        color: "#94a3b8",
        background: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.10)"
      },
      success: {
        color: "#4ade80",
        background: "rgba(34,197,94,0.12)",
        border: "rgba(34,197,94,0.20)"
      },
      warning: {
        color: "#fbbf24",
        background: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.20)"
      }
    };
    colors = tones[tone] || tones.brand;
  }
  const content = children ?? (segment && SEGMENTS[segment] ? label ?? SEGMENTS[segment].label : label);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 12px",
      fontSize: "var(--fs-2xs)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-badge)",
      border: `1px solid ${colors.border}`,
      background: colors.background,
      color: colors.color,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), content);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KBRS Button — the indigo-tinted glass action button.
 * Variants: primary (gradient), secondary (tinted glass), ghost (text).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  // Font Awesome class, e.g. "fa-solid fa-bolt"
  iconRight,
  disabled = false,
  full = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "7px 14px",
      fontSize: 13,
      gap: 6
    },
    md: {
      padding: "9px 18px",
      fontSize: 14,
      gap: 7
    },
    lg: {
      padding: "12px 24px",
      fontSize: 15,
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--kbrs-grad-pill)",
      color: "var(--text-on-brand)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-brand)"
    },
    secondary: {
      background: "rgba(99,102,241,0.10)",
      color: "var(--kbrs-indigo-soft)",
      border: "1px solid var(--kbrs-border-brand)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      borderRadius: "var(--radius-input)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "all var(--dur-fast) var(--ease-out)",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === "secondary") {
        e.currentTarget.style.background = "rgba(99,102,241,0.20)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.50)";
      } else if (variant === "ghost") {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      } else {
        e.currentTarget.style.filter = "brightness(1.08)";
      }
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = variants[variant].background;
      e.currentTarget.style.borderColor = variant === "secondary" ? "var(--kbrs-border-brand)" : "transparent";
      e.currentTarget.style.filter = "none";
    }
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: "0.9em"
    }
  }), children, iconRight && /*#__PURE__*/React.createElement("i", {
    className: iconRight,
    style: {
      fontSize: "0.9em"
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KBRS Card — the signature frosted-glass panel: translucent navy body,
 * backdrop blur, hairline border, and an optional 1px gradient highlight
 * across the top edge. The core surface of the whole product.
 */
function Card({
  children,
  topEdge = true,
  // show the brand gradient highlight line
  hover = false,
  // brighten border on hover
  pad = 24,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--radius-card)",
      padding: pad,
      backdropFilter: "var(--blur-card)",
      WebkitBackdropFilter: "var(--blur-card)",
      overflow: "hidden",
      transition: "border-color var(--dur-base), box-shadow var(--dur-base)",
      ...style
    },
    onMouseEnter: e => {
      if (hover) e.currentTarget.style.borderColor = "var(--border-hover)";
    },
    onMouseLeave: e => {
      if (hover) e.currentTarget.style.borderColor = "var(--border-card)";
    }
  }, rest), topEdge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: "var(--edge-top)"
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — a small spec pill with a leading Font Awesome icon, used to render a
 * single hardware fact ("16 GB RAM", "6000 mAh", "120 W"). The most transparent
 * surface in the system (3% white).
 */
function Chip({
  icon,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: "var(--surface-chip)",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--r-sm)",
      padding: "4px 10px",
      fontSize: "var(--fs-xs)",
      color: "var(--text-body)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      color: "var(--kbrs-indigo)",
      fontSize: 10
    }
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square glass button carrying a single Font Awesome icon.
 * Used for toolbar actions (external link, download, settings).
 */
function IconButton({
  icon,
  size = 36,
  active = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-input)",
      background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${active ? "var(--kbrs-border-brand)" : "var(--border-card)"}`,
      color: active ? "var(--kbrs-indigo-soft)" : "var(--text-body)",
      cursor: "pointer",
      transition: "all var(--dur-fast) var(--ease-out)",
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "rgba(99,102,241,0.14)";
      e.currentTarget.style.borderColor = "var(--kbrs-border-brand)";
      e.currentTarget.style.color = "var(--kbrs-indigo-soft)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)";
      e.currentTarget.style.borderColor = active ? "var(--kbrs-border-brand)" : "var(--border-card)";
      e.currentTarget.style.color = active ? "var(--kbrs-indigo-soft)" : "var(--text-body)";
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: size * 0.4
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/TabBar.jsx
try { (() => {
/**
 * TabBar — the pill tab navigation that sits inside a translucent track.
 * Selected tab gets an indigo-tinted fill + soft indigo text. Mirrors the
 * three-tab header of the KBRS app (Gợi ý / EDA Explorer / Dataset).
 *
 * tabs: [{ id, label, icon? }]
 */
function TabBar({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 4,
      padding: 5,
      background: "rgba(255,255,255,0.025)",
      border: "1px solid var(--border-faint, rgba(255,255,255,0.05))",
      borderRadius: "var(--r-lg)",
      ...style
    }
  }, tabs.map(t => {
    const selected = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 22px",
        fontSize: "var(--fs-base)",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--fw-medium)",
        border: "none",
        borderRadius: "var(--r-md)",
        cursor: "pointer",
        transition: "all var(--dur-base) var(--ease-out)",
        background: selected ? "rgba(99,102,241,0.18)" : "transparent",
        color: selected ? "var(--kbrs-indigo-soft)" : "var(--text-muted)"
      },
      onMouseEnter: e => {
        if (!selected) e.currentTarget.style.color = "var(--text-body)";
      },
      onMouseLeave: e => {
        if (!selected) e.currentTarget.style.color = "var(--text-muted)";
      }
    }, t.icon && /*#__PURE__*/React.createElement("i", {
      className: t.icon,
      style: {
        fontSize: "0.85em"
      }
    }), t.label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/BrandMark.jsx
try { (() => {
const SLUGS = {
  samsung: "samsung",
  apple: "apple",
  xiaomi: "xiaomi",
  oppo: "oppo",
  realme: "realme",
  oneplus: "oneplus",
  motorola: "motorola",
  nokia: "nokia",
  huawei: "huawei",
  google: "google",
  sony: "sony",
  asus: "asus",
  vivo: "vivo",
  honor: "honor",
  nothing: "nothing",
  tecno: "tecno",
  nubia: "zte"
};

/**
 * BrandMark — renders a phone-maker logo as a white monochrome Simple Icons
 * glyph at ~75% opacity. Falls back to a rounded indigo-tinted letter tile
 * when the brand has no Simple Icons slug.
 */
function BrandMark({
  brand = "",
  size = 28,
  style = {}
}) {
  const slug = SLUGS[brand.toLowerCase().trim()];
  if (slug) {
    return /*#__PURE__*/React.createElement("img", {
      src: `https://cdn.simpleicons.org/${slug}/ffffff`,
      width: size,
      height: size,
      alt: brand,
      style: {
        opacity: 0.75,
        filter: "brightness(1.1)",
        ...style
      },
      onError: e => {
        e.currentTarget.style.display = "none";
      }
    });
  }
  const letter = brand ? brand[0].toUpperCase() : "?";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "var(--r-xs)",
      background: "rgba(99,102,241,0.25)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size / 2,
      fontWeight: "var(--fw-bold)",
      color: "var(--kbrs-indigo-soft)",
      ...style
    }
  }, letter);
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/MetricCard.jsx
try { (() => {
/**
 * MetricCard — the compact KPI tile from the dashboard header. Uppercase
 * tracked label over a big extrabold value, on a blurred glass surface.
 */
function MetricCard({
  label,
  value,
  sub,
  icon,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-panel)",
      border: "1px solid var(--kbrs-border-faint)",
      borderRadius: "var(--r-xl)",
      padding: "18px 20px",
      backdropFilter: "var(--blur-panel)",
      WebkitBackdropFilter: "var(--blur-panel)",
      transition: "border-color var(--dur-fast)",
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = "var(--kbrs-border-brand)",
    onMouseLeave: e => e.currentTarget.style.borderColor = "var(--kbrs-border-faint)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 10
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      color: "var(--kbrs-indigo)",
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-2xs)",
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-wider)",
      color: "var(--text-muted)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h2)",
      fontWeight: "var(--fw-extrabold)",
      color: "var(--text-heading)",
      lineHeight: 1.1,
      letterSpacing: "var(--ls-tight)"
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-faint)",
      marginTop: 5
    }
  }, sub));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/ScoreBar.jsx
try { (() => {
const AXES = {
  perf: {
    label: "Hiệu năng",
    icon: "fa-solid fa-microchip",
    grad: "var(--kbrs-grad-perf)"
  },
  cam: {
    label: "Camera",
    icon: "fa-solid fa-camera",
    grad: "var(--kbrs-grad-cam)"
  },
  batt: {
    label: "Pin",
    icon: "fa-solid fa-battery-full",
    grad: "var(--kbrs-grad-batt)"
  },
  disp: {
    label: "Màn hình",
    icon: "fa-solid fa-display",
    grad: "var(--kbrs-grad-disp)"
  }
};

/**
 * ScoreBar — a labelled 0–10 KBRS sub-score bar. Pass `axis` (perf/cam/batt/
 * disp) to auto-fill the label, icon and the axis gradient. The fill sweeps in
 * over ~1s. Use raw `label`/`icon`/`gradient` to render a custom metric.
 */
function ScoreBar({
  axis,
  value = 0,
  label,
  icon,
  gradient,
  style = {}
}) {
  const preset = axis && AXES[axis] ? AXES[axis] : null;
  const _label = label ?? preset?.label ?? "";
  const _icon = icon ?? preset?.icon ?? "fa-solid fa-circle";
  const _grad = gradient ?? preset?.grad ?? "var(--kbrs-grad-brand-h)";
  const pct = Math.min(Math.max(value / 10 * 100, 0), 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "6px 0",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 100,
      display: "flex",
      alignItems: "center",
      gap: 7,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: _icon,
    style: {
      color: "var(--kbrs-indigo)",
      fontSize: 12,
      width: 14,
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      fontWeight: "var(--fw-medium)"
    }
  }, _label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 5,
      background: "rgba(255,255,255,0.06)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct.toFixed(0)}%`,
      height: "100%",
      borderRadius: 3,
      background: _grad,
      transition: "width 1s var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-2, #e2e8f0)",
      width: 28,
      textAlign: "right",
      flexShrink: 0
    }
  }, value.toFixed(1)));
}
Object.assign(__ds_scope, { ScoreBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/ScoreBar.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/PhoneCard.jsx
try { (() => {
function fmtVnd(n) {
  return n.toLocaleString("vi-VN");
}

/**
 * PhoneCard — the ranked recommendation card. Left column is identity (rank
 * pill, brand mark, name, segment badge, price, spec chips); right column is
 * the four KBRS score bars + the total-score meter with gradient number.
 * Composes Card / Badge / Chip / BrandMark / ScoreBar.
 *
 * phone: { name, brand, price, seg, perf, cam, batt, disp, ram, storage,
 *          battery, charge, weight, screen, refresh, os, ... }
 */
function PhoneCard({
  phone,
  rank,
  total,
  style = {}
}) {
  const p = phone;
  const totalScore = total ?? (p.perf + p.cam + p.batt + p.disp) / 4;
  const pct = Math.min(totalScore / 10, 1) * 100;
  const osIcon = String(p.os).toLowerCase().includes("ios") ? "fa-brands fa-apple" : "fa-brands fa-android";
  const specs = [["fa-solid fa-memory", `${p.ram} GB RAM`], ["fa-solid fa-hard-drive", `${p.storage} GB`], ["fa-solid fa-battery-full", `${p.battery} mAh`], ["fa-solid fa-bolt", `${p.charge} W`], ["fa-solid fa-weight-hanging", `${p.weight} g`], ["fa-solid fa-mobile-screen", `${p.screen}"`], ["fa-solid fa-rotate", `${p.refresh} Hz`], [osIcon, p.os]];
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    pad: 26,
    hover: true,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      flexWrap: "wrap",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 260
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10
    }
  }, rank != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "var(--kbrs-grad-pill)",
      fontSize: 15,
      fontWeight: "var(--fw-extrabold)",
      color: "#fff",
      flexShrink: 0,
      boxShadow: "var(--shadow-brand)"
    }
  }, rank), /*#__PURE__*/React.createElement(__ds_scope.BrandMark, {
    brand: p.brand,
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-lg)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-heading)",
      lineHeight: 1.2
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    segment: p.seg
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: "var(--fw-extrabold)",
      color: "var(--text-heading)",
      letterSpacing: "var(--ls-tight)",
      margin: "10px 0 4px"
    }
  }, fmtVnd(p.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)",
      fontWeight: 400,
      marginLeft: 3
    }
  }, "\u0111")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 12
    }
  }, specs.map(([icon, val], i) => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: i,
    icon: icon
  }, val))),
  p.url && /*#__PURE__*/React.createElement("div", {style:{marginTop:12}},
    /*#__PURE__*/React.createElement("a", {
      href: p.url, target: "_blank", rel: "noopener noreferrer",
      style: {
        display:"inline-flex",alignItems:"center",gap:6,
        padding:"7px 16px",
        background:"rgba(99,102,241,0.08)",
        border:"1px solid rgba(99,102,241,0.25)",
        borderRadius:8,color:"#a5b4fc",fontSize:13,
        fontWeight:500,textDecoration:"none",
        transition:"all 0.2s"
      }
    },
    /*#__PURE__*/React.createElement("i", {className:"fa-solid fa-arrow-up-right-from-square", style:{fontSize:11}}),
    " cellphones.com.vn")
  )), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 260,
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ScoreBar, {
    axis: "perf",
    value: p.perf
  }), /*#__PURE__*/React.createElement(__ds_scope.ScoreBar, {
    axis: "cam",
    value: p.cam
  }), /*#__PURE__*/React.createElement(__ds_scope.ScoreBar, {
    axis: "batt",
    value: p.batt
  }), /*#__PURE__*/React.createElement(__ds_scope.ScoreBar, {
    axis: "disp",
    value: p.disp
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: "1px solid var(--kbrs-border-faint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      fontWeight: "var(--fw-medium)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star",
    style: {
      color: "var(--kbrs-batt)",
      marginRight: 5
    }
  }), "T\u1ED5ng \u0111i\u1EC3m KBRS"), /*#__PURE__*/React.createElement("span", {
    className: "kbrs-gradient-num",
    style: {
      fontSize: 20,
      fontWeight: "var(--fw-extrabold)",
      background: "var(--kbrs-grad-pill)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent"
    }
  }, totalScore.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 4,
      background: "rgba(255,255,255,0.05)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct.toFixed(1)}%`,
      height: "100%",
      borderRadius: 4,
      background: "var(--kbrs-grad-brand-h)",
      transition: "width var(--dur-bar) var(--ease-out)"
    }
  }))))));
}
Object.assign(__ds_scope, { PhoneCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/PhoneCard.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/UseCaseChip.jsx
try { (() => {
/**
 * UseCaseChip — the active use-case pill shown above the recommendation
 * results (icon + Vietnamese label, indigo glass). Set `selectable` +
 * `selected` to use it as a toggle in a filter row.
 */
function UseCaseChip({
  icon = "fa-solid fa-circle",
  label,
  selected = true,
  onClick,
  style = {}
}) {
  const on = selected;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "5px 14px",
      borderRadius: "var(--radius-badge)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-medium)",
      cursor: onClick ? "pointer" : "default",
      background: on ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${on ? "rgba(99,102,241,0.22)" : "var(--border-card)"}`,
      color: on ? "var(--kbrs-indigo-soft)" : "var(--text-muted)",
      transition: "all var(--dur-fast) var(--ease-out)",
      whiteSpace: "nowrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: "0.85em"
    }
  }), label);
}
Object.assign(__ds_scope, { UseCaseChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/UseCaseChip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recommendation/dataset-screen.jsx
try { (() => {
/* global React */
// KBRS Dataset Browser screen — filter bar (brand / segment / OS / sort) over a
// dense, segment-color-coded table. Exposes window.KBRSDatasetScreen.

const SEG = {
  budget: {
    bg: "#052e16",
    c: "#4ade80",
    label: "budget"
  },
  mid: {
    bg: "#0c1a3a",
    c: "#60a5fa",
    label: "mid"
  },
  high: {
    bg: "#2d1b00",
    c: "#fbbf24",
    label: "high"
  },
  flagship: {
    bg: "#1e0a3a",
    c: "#c084fc",
    label: "flagship"
  }
};
function Pill({
  active,
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      padding: "5px 13px",
      borderRadius: 999,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "var(--font-body)",
      whiteSpace: "nowrap",
      background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${active ? "var(--kbrs-border-brand)" : "var(--border-card)"}`,
      color: active ? "var(--kbrs-indigo-soft)" : "var(--text-muted)",
      transition: "all 0.2s"
    }
  }, children);
}
function DatasetScreen() {
  const {
    BrandMark,
    Button
  } = window.KBRSDesignSystem_5964c9;
  const all = window.KBRS_PHONES;
  const [seg, setSeg] = React.useState(null);
  const [os, setOs] = React.useState(null);
  const [sort, setSort] = React.useState("price");
  const [dir, setDir] = React.useState("asc");
  const DEFAULT_DIR = { price: "asc", perf: "desc", cam: "desc", batt: "desc", disp: "desc" };
  const handleSort = k => {
    if (k === sort) { setDir(d => d === "asc" ? "desc" : "asc"); }
    else { setSort(k); setDir(DEFAULT_DIR[k]); }
  };
  const oses = [...new Set(all.map(p => p.os))].filter(Boolean).sort();
  let rows = all.slice();
  if (seg) rows = rows.filter(p => p.seg === seg);
  if (os) rows = rows.filter(p => p.os === os);
  rows.sort((a, b) => dir === "asc" ? a[sort] - b[sort] : b[sort] - a[sort]);
  const th = {
    textAlign: "left",
    padding: "11px 14px",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--text-muted)",
    borderBottom: "1px solid var(--border-card)",
    whiteSpace: "nowrap"
  };
  const td = {
    padding: "11px 14px",
    fontSize: 13,
    color: "var(--text-body)",
    borderBottom: "1px solid var(--border-faint)",
    whiteSpace: "nowrap"
  };
  const num = {
    ...td,
    fontFamily: "var(--font-mono)",
    textAlign: "right"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "kbrs-fade-in 0.5s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 0 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kbrs-gradient-text",
    style: {
      fontSize: 32,
      fontWeight: 800
    }
  }, "Dataset Browser"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, "387 smartphones \xB7 32 c\u1ED9t \xB7 scored_data.csv")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 18,
      marginBottom: 16,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Ph\xE2n kh\xFAc"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, ["budget", "mid", "high", "flagship"].map(s => /*#__PURE__*/React.createElement(Pill, {
    key: s,
    active: seg === s,
    onClick: () => setSeg(seg === s ? null : s)
  }, s)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "OS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, oses.map(o => /*#__PURE__*/React.createElement(Pill, {
    key: o,
    active: os === o,
    onClick: () => setOs(os === o ? null : o)
  }, o)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "S\u1EAFp x\u1EBFp theo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["price", "Giá"], ["perf", "Hiệu năng"], ["cam", "Camera"], ["batt", "Pin"]].map(([k, v]) => /*#__PURE__*/React.createElement(Pill, {
    key: k,
    active: sort === k,
    onClick: () => handleSort(k)
  }, v)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDir(d => d === "asc" ? "desc" : "asc"),
    title: dir === "asc" ? "Đang tăng dần — bấm để đảo" : "Đang giảm dần — bấm để đảo",
    style: {
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "5px 12px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontWeight: 700,
      fontFamily: "var(--font-body)", background: "rgba(99,102,241,0.15)",
      border: "1px solid var(--kbrs-border-brand)", color: "var(--kbrs-indigo-soft)",
      transition: "all 0.2s", lineHeight: 1, whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("i", {className: dir === "asc" ? "fa-solid fa-arrow-up-short-wide" : "fa-solid fa-arrow-down-wide-short", style:{fontSize:13,marginRight:5}}), dir === "asc" ? "Tăng dần" : "Giảm dần")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-6)",
      marginBottom: 12
    }
  }, "Hi\u1EC3n th\u1ECB ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--kbrs-indigo)"
    }
  }, rows.length), " / ", all.length, " s\u1EA3n ph\u1EA9m"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      overflow: "hidden",
      border: "1px solid var(--border-card)",
      background: "var(--surface-card)",
      backdropFilter: "blur(20px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 460,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "var(--kbrs-surface-1)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: th
  }, "S\u1EA3n ph\u1EA9m"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Ph\xE2n kh\xFAc"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Gi\xE1"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Hiệu năng"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Camera"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Pin"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "M\xE0n h\xECnh"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Chip"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.name
  }, /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    brand: p.brand,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)",
      fontWeight: 500
    }
  }, p.name))), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: SEG[p.seg].bg,
      color: SEG[p.seg].c,
      padding: "3px 10px",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 600
    }
  }, SEG[p.seg].label)), /*#__PURE__*/React.createElement("td", {
    style: num
  }, p.price.toLocaleString("vi-VN"), "\u0111"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...num,
      color: "var(--kbrs-perf-soft)"
    }
  }, p.perf.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...num,
      color: "var(--kbrs-cam-soft)"
    }
  }, p.cam.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...num,
      color: "var(--kbrs-batt-soft)"
    }
  }, p.batt.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...num,
      color: "var(--kbrs-disp-soft)"
    }
  }, p.disp.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      color: "var(--text-muted)",
      fontSize: 12
    }
  }, p.chip))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "fa-solid fa-download"
  }, "T\u1EA3i CSV (filtered)")));
}
const lbl = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  marginBottom: 8
};
window.KBRSDatasetScreen = {
  DatasetScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recommendation/dataset-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recommendation/eda-screen.jsx
try { (() => {
/* global React */
// KBRS EDA Explorer screen — recreates the dark analytics grid: segment
// distribution, top brands, price histogram, score box-plot stand-in,
// perf×camera scatter, panel & OS donuts. Charts are CSS/SVG recreations of
// the source Plotly figures. Exposes window.KBRSEdaScreen.

const SEG_COLOR = {
  budget: "#22c55e",
  mid: "#3b82f6",
  high: "#f59e0b",
  flagship: "#a855f7"
};
function ChartCard({
  title,
  children,
  span
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: span ? `span ${span}` : "auto",
      background: "var(--surface-card)",
      border: "1px solid var(--border-card)",
      borderRadius: 16,
      padding: "18px 20px",
      backdropFilter: "blur(20px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-2)",
      marginBottom: 16
    }
  }, title), children);
}
function VBars({
  data
}) {
  const max = Math.max(...data.map(d => d.v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 18,
      height: 200,
      padding: "0 8px"
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.k,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-body)"
    }
  }, d.v), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 56,
      height: `${d.v / max * 150}px`,
      borderRadius: "6px 6px 0 0",
      background: d.c
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, d.k))));
}
function HBars({
  data,
  color
}) {
  const max = Math.max(...data.map(d => d.v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.k,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      fontSize: 12,
      color: "var(--text-muted)",
      textAlign: "right",
      flexShrink: 0
    }
  }, d.k), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 16,
      background: "rgba(255,255,255,0.04)",
      borderRadius: 4,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${d.v / max * 100}%`,
      height: "100%",
      borderRadius: 4,
      background: color
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-body)"
    }
  }, d.v))));
}
function Donut({
  data
}) {
  let acc = 0;
  const total = data.reduce((s, d) => s + d.v, 0);
  const stops = data.map(d => {
    const start = acc / total * 360;
    acc += d.v;
    return `${d.c} ${start}deg ${acc / total * 360}deg`;
  }).join(", ");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: `conic-gradient(${stops})`,
      position: "relative",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 33,
      borderRadius: "50%",
      background: "var(--kbrs-surface-2)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.k,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: d.c
    }
  }), d.k, " ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-2)"
    }
  }, d.v)))));
}
function Scatter({
  phones
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 280,
      borderLeft: "1px solid var(--border-faint)",
      borderBottom: "1px solid var(--border-faint)",
      margin: "8px 12px 24px 40px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: -34,
      top: "50%",
      transform: "rotate(-90deg)",
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "Camera"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: -22,
      left: "50%",
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "Hi\u1EC7u n\u0103ng"), phones.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    onMouseEnter: e => {
      const tip = e.currentTarget.parentElement.querySelector(".scatter-tip");
      if(tip){ tip.style.display="block"; tip.textContent=`${p.name} · Hiệu năng ${p.perf} · Camera ${p.cam}`; }
    },
    onMouseLeave: e => {
      const tip = e.currentTarget.parentElement.querySelector(".scatter-tip");
      if(tip) tip.style.display="none";
    },
    style: {
      position: "absolute",
      width: 9, height: 9,
      borderRadius: "50%",
      background: SEG_COLOR[p.seg],
      opacity: 0.78,
      left: `${p.perf / 10 * 100}%`,
      bottom: `${p.cam / 10 * 100}%`,
      transform: "translate(-50%, 50%)",
      cursor: "pointer",
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "scatter-tip",
    style: {
      display: "none", position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
      background: "rgba(10,16,36,0.96)", border: "1px solid rgba(99,102,241,0.35)",
      borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "var(--text-body)",
      whiteSpace: "nowrap", zIndex: 20, pointerEvents: "none",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }
  }));
}
function PriceHist({phones}) {
  const bins = [
    {k:"<3M",min:0,max:3e6},{k:"3–5M",min:3e6,max:5e6},{k:"5–8M",min:5e6,max:8e6},
    {k:"8–12M",min:8e6,max:12e6},{k:"12–18M",min:12e6,max:18e6},
    {k:"18–25M",min:18e6,max:25e6},{k:">25M",min:25e6,max:Infinity},
  ];
  const data = bins.map(b=>({k:b.k,v:phones.filter(p=>p.price>=b.min&&p.price<b.max).length,c:"linear-gradient(180deg,#6366f1,#a855f7)"}));
  return /*#__PURE__*/React.createElement(VBars,{data});
}
function ScoreSegment({phones}) {
  const metricState = React.useState("perf");
  const metric = metricState[0]; const setMetric = metricState[1];
  const METRICS = [{id:"perf",label:"Hiệu năng",c:"#10b981"},{id:"cam",label:"Camera",c:"#3b82f6"},{id:"batt",label:"Pin",c:"#f59e0b"},{id:"disp",label:"Màn hình",c:"#8b5cf6"}];
  const m = METRICS.find(x=>x.id===metric);
  const SEG_COLOR = {budget:"#22c55e",mid:"#3b82f6",high:"#f59e0b",flagship:"#a855f7"};
  const data = ["budget","mid","high","flagship"].map(s=>{
    const grp=phones.filter(p=>p.seg===s);
    const avg=grp.length?grp.reduce((sum,p)=>sum+p[metric],0)/grp.length:0;
    return {k:s,v:parseFloat(avg.toFixed(2)),c:SEG_COLOR[s]};
  });
  return /*#__PURE__*/React.createElement("div",null,
    /*#__PURE__*/React.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}},
      METRICS.map(mx=>/*#__PURE__*/React.createElement("button",{key:mx.id,onClick:()=>setMetric(mx.id),style:{
        padding:"4px 11px",borderRadius:7,cursor:"pointer",fontSize:11,fontWeight:600,
        fontFamily:"var(--font-body)",transition:"all .18s",
        background:metric===mx.id?"rgba(99,102,241,0.18)":"rgba(255,255,255,0.03)",
        border:`1px solid ${metric===mx.id?"var(--kbrs-border-brand)":"var(--border-card)"}`,
        color:metric===mx.id?"var(--kbrs-indigo-soft)":"var(--text-muted)",
      }},mx.label))
    ),
    /*#__PURE__*/React.createElement(VBars,{data})
  );
}
function EdaScreen() {
  const phones = window.KBRS_PHONES;
  const segCounts = ["budget", "mid", "high", "flagship"].map(k => ({
    k,
    v: phones.filter(p => p.seg === k).length,
    c: SEG_COLOR[k]
  }));
  const brandMap = {};
  phones.forEach(p => {
    brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
  });
  const brands = Object.entries(brandMap).map(([k, v]) => ({
    k,
    v
  })).sort((a, b) => b.v - a.v).slice(0, 8);
  const panelMap = {};
  phones.forEach(p => {
    panelMap[p.panel] = (panelMap[p.panel] || 0) + 1;
  });
  const panelColors = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"];
  const panels = Object.entries(panelMap).map(([k, v], i) => ({
    k,
    v,
    c: panelColors[i % 4]
  }));
  const osMap = {};
  phones.forEach(p => {
    osMap[p.os] = (osMap[p.os] || 0) + 1;
  });
  const osColors = ["#10b981", "#3b82f6", "#f59e0b", "#94a3b8"];
  const oses = Object.entries(osMap).map(([k, v], i) => ({
    k,
    v,
    c: osColors[i % 4]
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "kbrs-fade-in 0.5s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 0 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kbrs-gradient-text",
    style: {
      fontSize: 32,
      fontWeight: 800
    }
  }, "EDA Explorer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, "387 smartphones \xB7 cellphones.com.vn")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(ChartCard, {
    title: "Ph\xE2n ph\u1ED1i ph\xE2n kh\xFAc gi\xE1"
  }, /*#__PURE__*/React.createElement(VBars, {
    data: segCounts
  })), /*#__PURE__*/React.createElement(ChartCard, {
    title: "Top h\xE3ng theo s\u1ED1 s\u1EA3n ph\u1EA9m"
  }, /*#__PURE__*/React.createElement(HBars, {
    data: brands,
    color: "var(--kbrs-indigo)"
  })), /*#__PURE__*/React.createElement(ChartCard, {
    title: "Ph\xE2n ph\u1ED1i gi\xE1 b\xE1n"
  }, /*#__PURE__*/React.createElement(PriceHist, {
    phones: phones
  })), /*#__PURE__*/React.createElement(ChartCard, {
    title: "\u0110i\u1EC3m KBRS theo ph\xE2n kh\xFAc"
  }, /*#__PURE__*/React.createElement(ScoreSegment, {
    phones: phones
  })), /*#__PURE__*/React.createElement(ChartCard, {
    title: "T\u01B0\u01A1ng quan Hi\u1EC7u n\u0103ng \xD7 Camera",
    span: 2
  }, /*#__PURE__*/React.createElement(Scatter, {
    phones: phones
  })), /*#__PURE__*/React.createElement(ChartCard, {
    title: "Ph\xE2n ph\u1ED1i RAM & Storage",
    span: 2
  }, /*#__PURE__*/React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}},
    /*#__PURE__*/React.createElement("div",null,
      /*#__PURE__*/React.createElement("div",{style:{fontSize:12,color:"var(--text-muted)",marginBottom:10,fontWeight:600}},"RAM (GB)"),
      /*#__PURE__*/React.createElement(VBars,{data:[4,6,8,12,16].map(r=>({k:r+"GB",v:phones.filter(p=>p.ram===r).length,c:"#6366f1"}))})
    ),
    /*#__PURE__*/React.createElement("div",null,
      /*#__PURE__*/React.createElement("div",{style:{fontSize:12,color:"var(--text-muted)",marginBottom:10,fontWeight:600}},"Storage (GB)"),
      /*#__PURE__*/React.createElement(VBars,{data:[64,128,256,512,1024].map(s=>({k:s>=1000?(s/1000)+"TB":s+"GB",v:phones.filter(p=>p.storage===s).length,c:"#a855f7"}))})
    )
  )), /*#__PURE__*/React.createElement(ChartCard, {
    title: "T\u1EA5m n\u1EC1n & H\u1EC7 \u0111i\u1EC1u h\xE0nh",
    span: 2
  }, /*#__PURE__*/React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}},
    /*#__PURE__*/React.createElement("div",null,
      /*#__PURE__*/React.createElement("div",{style:{fontSize:12,color:"var(--text-muted)",marginBottom:12,fontWeight:600}},"T\u1EA5m n\u1EC1n (Panel)"),
      /*#__PURE__*/React.createElement(Donut,{data:panels})
    ),
    /*#__PURE__*/React.createElement("div",null,
      /*#__PURE__*/React.createElement("div",{style:{fontSize:12,color:"var(--text-muted)",marginBottom:12,fontWeight:600}},"H\u1EC7 \u0111i\u1EC1u h\xE0nh (OS)"),
      /*#__PURE__*/React.createElement(Donut,{data:oses})
    )
  ))));
}
window.KBRSEdaScreen = {
  EdaScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recommendation/eda-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recommendation/reco-screen.jsx
try { (() => {
/* global React */
// KBRS Recommendation screen — ports run_kbrs() from app.py over the sample
// dataset and renders the metrics row, active use-case chips, and ranked
// PhoneCards. Exposes window.KBRSRecoScreen.

// Hard filters per use case (subset matching app.py MAPPING_MATRIX_CONFIG)
const HARD = {
  Gia_Re:             p => p.seg === "budget",
  Flagship:           p => p.seg === "flagship",
  Lien_Lac_Co_Ban:    _ => true,
  Choi_Game:          p => p.perf >= 5.8 && p.refresh >= 120 && p.ram >= 8,
  Giai_Tri_MXH:       p => p.display_tier >= 3,
  Chup_Hinh:          p => p.cam >= 7.7 && p.storage >= 128 && p.rear_cam >= 48 && p.front_cam >= 12,
  Quay_Phim:          p => p.cam >= 7.7 && p.storage >= 256 && p.video_rank >= 4 && p.fps >= 30,
  Pin_Trau_Sac_Nhanh: p => p.battery >= 6000 && p.charge >= 33,
  Nho_Gon_Nhe_Tay:    p => p.weight_tier === 1,
  Khang_Nuoc:         p => p.ip === 1,
  Can_Bang:           _ => true
};
function runKbrs(phones, needs, budgetVnd, topK) {
  const cfg = window.KBRS_USECASES;
  const valid = needs.filter(n => cfg.some(c => c.id === n));
  if (!valid.length) return {
    results: [],
    err: "Chọn ít nhất 1 mục đích sử dụng."
  };
  const acc = {
    perf: 0,
    cam: 0,
    batt: 0,
    disp: 0
  };
  valid.forEach(id => {
    const w = cfg.find(c => c.id === id).w;
    acc.perf += w.perf;
    acc.cam += w.cam;
    acc.batt += w.batt;
    acc.disp += w.disp;
  });
  const n = valid.length;
  const vec = {
    perf: acc.perf / n,
    cam: acc.cam / n,
    batt: acc.batt / n,
    disp: acc.disp / n
  };
  let pool = phones.filter(p => p.price <= budgetVnd * 1.1);
  valid.forEach(id => {
    if (HARD[id]) pool = pool.filter(HARD[id]);
  });
  if (!pool.length) return {
    results: [],
    err: "Không có máy nào thỏa mãn đồng thời tất cả điều kiện bắt buộc của các use-case đã chọn."
  };
  const scored = pool.map(p => {
    let base = p.perf * vec.perf + p.cam * vec.cam + p.batt * vec.batt + p.disp * vec.disp;
    if (p.price > budgetVnd) base -= base * ((p.price - budgetVnd) / budgetVnd * 0.5);
    return {
      ...p,
      total: base
    };
  });
  scored.sort((a, b) => b.total - a.total);
  return {
    results: scored.slice(0, topK),
    err: null
  };
}
function RecoScreen({
  selected, budget, topK, brands, osFilter
}) {
  const {
    MetricCard,
    UseCaseChip,
    PhoneCard
  } = window.KBRSDesignSystem_5964c9;
  let phones = window.KBRS_PHONES;
  if (brands && brands.length > 0) phones = phones.filter(p => brands.includes(p.brand));
  if (osFilter) phones = phones.filter(p => p.os === osFilter);
  const budgetVnd = budget * 1e6;
  const {
    results,
    err
  } = runKbrs(phones, selected, budgetVnd, topK);
  const within = phones.filter(p => p.price <= budgetVnd).length;
  const cfg = window.KBRS_USECASES;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "kbrs-fade-in 0.5s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 0 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kbrs-gradient-text",
    style: {
      fontSize: 32,
      fontWeight: 800
    }
  }, "G\u1EE3i \xFD \u0111i\u1EC7n tho\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, "H\u1EC7 th\u1ED1ng g\u1EE3i \xFD d\u1EF1a tr\xEAn tri th\u1EE9c \xB7 Scoring theo use-case c\u1EE7a b\u1EA1n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "T\u1ED5ng dataset",
    value: `${phones.length} máy`,
    icon: "fa-solid fa-database"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Trong ng\xE2n s\xE1ch",
    value: `${within} máy`,
    icon: "fa-solid fa-wallet"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Sau hard filter",
    value: err ? "—" : `${results.length} máy`,
    icon: "fa-solid fa-filter"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "\u0110i\u1EC3m top 1",
    value: err ? "—" : `${results[0].total.toFixed(2)} / 10`,
    icon: "fa-solid fa-star"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7,
      marginBottom: 8
    }
  }, selected.map(id => {
    const u = cfg.find(c => c.id === id);
    return u ? /*#__PURE__*/React.createElement(UseCaseChip, {
      key: id,
      icon: u.icon,
      label: u.label
    }) : null;
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-6)",
      marginBottom: 22
    }
  }, "Ng\xE2n s\xE1ch ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--kbrs-indigo)"
    }
  }, budget, "M VND"), " (soft \xB110%) \xB7 Top ", topK, " m\xE1y"), err ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-panel)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 12,
      padding: "18px 20px",
      color: "var(--text-body)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-circle-info",
    style: {
      color: "var(--kbrs-indigo)",
      marginRight: 8
    }
  }), err) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, results.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      animation: `kbrs-slide-up 0.45s ease ${i * 0.07}s both`
    }
  }, /*#__PURE__*/React.createElement(PhoneCard, {
    rank: i + 1,
    phone: p,
    total: p.total
  })))));
}
window.KBRSRecoScreen = {
  RecoScreen,
  runKbrs
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recommendation/reco-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recommendation/shell.jsx
try { (() => {
/* global React */
// KBRS UI-kit shell — animated orb background + the fixed filter sidebar.
// Exposes window.KBRSShell = { OrbBackground, Sidebar, Eyebrow }.

function OrbBackground() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 900,
      height: 900,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 65%)",
      top: -350,
      left: -250,
      animation: "kbrs-orb-1 20s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 700,
      height: 700,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)",
      bottom: -250,
      right: -150,
      animation: "kbrs-orb-2 17s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 500,
      height: 500,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%)",
      top: "45%",
      left: "40%",
      animation: "kbrs-orb-1 24s ease-in-out infinite"
    }
  }));
}
function Eyebrow({
  icon,
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-faint)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      color: "var(--kbrs-indigo)",
      marginRight: 6
    }
  }), children);
}
function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--divider)",
      margin: "16px 0"
    }
  });
}
function Sidebar({
  usecases, selected, onToggle,
  budget, onBudget, topK, onTopK,
  brands, onToggleBrand, osFilter, onOsFilter
}) {
  const { UseCaseChip, BrandMark } = window.KBRSDesignSystem_5964c9;
  const allBrands = [...new Set((window.KBRS_PHONES||[]).map(p=>p.brand))].filter(Boolean).sort();
  const OS_LIST = ["Android","iOS"];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 288,
      flexShrink: 0,
      alignSelf: "stretch",
      background: "var(--surface-sidebar)",
      borderRight: "1px solid rgba(99,102,241,0.12)",
      backdropFilter: "blur(12px)",
      padding: "26px 22px",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "4px 0 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 900,
      letterSpacing: "-0.02em",
      lineHeight: 1,
      background: "var(--kbrs-grad-brand)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "KBRS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-faint)",
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginTop: 3
    }
  }, "Knowledge-Based Recommendation")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Eyebrow, {
    icon: "fa-solid fa-sliders",
    style: {
      marginBottom: 12
    }
  }, "B\u1ED9 l\u1ECDc g\u1EE3i \xFD"), /*#__PURE__*/React.createElement("label", {
    style: lblStyle
  }, "M\u1EE5c \u0111\xEDch s\u1EED d\u1EE5ng"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7,
      marginBottom: 22
    }
  }, usecases.map(u => /*#__PURE__*/React.createElement(UseCaseChip, {
    key: u.id,
    icon: u.icon,
    label: u.label.split(" — ")[0].split(" & ")[0],
    selected: selected.includes(u.id),
    onClick: () => onToggle(u.id)
  }))), /*#__PURE__*/React.createElement("label", {
    style: lblStyle
  }, "Ng\xE2n s\xE1ch t\u1ED1i \u0111a"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: "var(--text-heading)"
    }
  }, budget), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "tri\u1EC7u VND")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "2",
    max: "65",
    value: budget,
    onChange: e => onBudget(+e.target.value),
    style: {
      width: "100%",
      accentColor: "var(--kbrs-indigo)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: lblStyle
  }, "S\u1ED1 m\xE1y g\u1EE3i \xFD"),
  /*#__PURE__*/React.createElement("div", {style:{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}},
    /*#__PURE__*/React.createElement("span",{style:{fontSize:24,fontWeight:800,color:"var(--text-heading)"}},topK),
    /*#__PURE__*/React.createElement("span",{style:{fontSize:13,color:"var(--text-muted)"}},"m\xE1y")
  ),
  /*#__PURE__*/React.createElement("input",{
    type:"range",min:1,max:20,value:topK,
    onChange:e=>onTopK(+e.target.value),
    style:{width:"100%",accentColor:"var(--kbrs-indigo)"}
  }),
  /*#__PURE__*/React.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--text-faint)",marginTop:3}},"1","10","20"),
  /*#__PURE__*/React.createElement(Divider, null),
  /*#__PURE__*/React.createElement("label", {style:lblStyle}, "Hệ điều hành"),
  /*#__PURE__*/React.createElement("div", {style:{display:"flex",gap:6,marginBottom:18}},
    ["Tất cả","Android","iOS"].map(o => {
      const active = o==="Tất cả" ? osFilter===null : osFilter===o;
      return /*#__PURE__*/React.createElement("button",{
        key:o, onClick:()=>onOsFilter(o==="Tất cả"?null:o),
        style:{flex:1,padding:"7px 0",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,
          fontFamily:"var(--font-body)",
          background:active?"rgba(99,102,241,0.18)":"rgba(255,255,255,0.03)",
          border:`1px solid ${active?"var(--kbrs-border-brand)":"var(--border-card)"}`,
          color:active?"var(--kbrs-indigo-soft)":"var(--text-muted)",transition:"all 0.2s"}
      }, o==="Android"?/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement("i",{className:"fa-brands fa-android",style:{marginRight:4}}),"Android"):
         o==="iOS"?/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement("i",{className:"fa-brands fa-apple",style:{marginRight:4}}),"iOS"):o);
    })
  ),
  /*#__PURE__*/React.createElement("label", {style:lblStyle}, "Hãng sản xuất"),
  /*#__PURE__*/React.createElement("div", {style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:6}},
    allBrands.map(b => {
      const active = (brands||[]).includes(b);
      return /*#__PURE__*/React.createElement("button",{
        key:b, onClick:()=>onToggleBrand(b),
        style:{display:"inline-flex",alignItems:"center",gap:5,
          padding:"5px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:500,
          fontFamily:"var(--font-body)",
          background:active?"rgba(99,102,241,0.18)":"rgba(255,255,255,0.03)",
          border:`1px solid ${active?"var(--kbrs-border-brand)":"var(--border-card)"}`,
          color:active?"var(--kbrs-indigo-soft)":"var(--text-muted)",transition:"all 0.18s"}
      }, /*#__PURE__*/React.createElement(BrandMark,{brand:b,size:14}), b);
    })
  ),
  (brands||[]).length>0 && /*#__PURE__*/React.createElement("button",{
    onClick:()=>{ brands.slice().forEach(b=>onToggleBrand(b)); },
    style:{fontSize:11,color:"var(--kbrs-indigo-soft)",background:"none",border:"none",cursor:"pointer",padding:"2px 0",marginBottom:10}
  }, /*#__PURE__*/React.createElement("i",{className:"fa-solid fa-xmark",style:{marginRight:4}}),"Xóa hết (",brands.length,")"),
  /*#__PURE__*/React.createElement(Divider, null),
  /*#__PURE__*/React.createElement("div", {
    style: { fontSize: 11, color: "var(--text-6)", textAlign: "center", lineHeight: 1.6 }
  }, "Dataset \xB7 ", /*#__PURE__*/React.createElement("b", {style:{color:"var(--text-faint)"}}, "387 smartphones"),
  /*#__PURE__*/React.createElement("br", null), "cellphones.com.vn \xB7 DS108"));
}
const lblStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  marginBottom: 10
};
window.KBRSShell = {
  OrbBackground,
  Sidebar,
  Eyebrow,
  Divider
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recommendation/shell.jsx", error: String((e && e.message) || e) }); }
Object.assign(__ds_ns, __ds_scope);
})();
