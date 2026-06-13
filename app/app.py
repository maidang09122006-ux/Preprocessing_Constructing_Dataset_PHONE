"""
KBRS — Knowledge-Based Recommendation Scoring
DS108 Final Project Bonus 3
Streamlit wrapper: inlines Claude Design HTML/React app via st.components.v1.html()
"""
import os
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="KBRS — Gợi ý điện thoại",
    page_icon="\U0001f4f1",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Hide all Streamlit chrome
st.markdown(
    "<style>"
    "#MainMenu,header,footer{display:none!important}"
    "html,body,.stApp{height:100vh!important;overflow:hidden!important;margin:0!important}"
    ".block-container{padding:0!important;max-width:100%!important;margin:0!important;height:100vh!important}"
    ".stApp>div:first-child{padding:0!important;height:100vh!important}"
    "iframe{width:100%!important;height:100vh!important;border:none!important;display:block!important}"
    "</style>",
    unsafe_allow_html=True,
)

BASE   = os.path.dirname(__file__)
DESIGN = os.path.join(BASE, "design")
KITS   = os.path.join(DESIGN, "ui_kits", "recommendation")

def rd(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

css_tokens = (
    rd(os.path.join(DESIGN, "tokens", "fonts.css"))      +
    rd(os.path.join(DESIGN, "tokens", "colors.css"))     +
    rd(os.path.join(DESIGN, "tokens", "spacing.css"))    +
    rd(os.path.join(DESIGN, "tokens", "typography.css")) +
    rd(os.path.join(DESIGN, "tokens", "base.css"))
)

# Layout CSS: sidebar + main each scroll independently inside fixed-height iframe
LAYOUT_CSS = """
html, body { margin: 0; height: 100%; overflow: hidden; background: var(--surface-page); }
#root { height: 100%; }
.kbrs-shell { display: flex; height: 100vh; overflow: hidden; position: relative; z-index: 1; }
.kbrs-sidebar { overflow-y: auto; height: 100vh; flex-shrink: 0; }
.kbrs-main   { flex: 1; overflow-y: auto; height: 100vh; }
"""

APP_ENTRY_JS = """
function App() {
  var ds  = window.KBRSDesignSystem_5964c9;
  var sh  = window.KBRSShell;
  var TabBar       = ds.TabBar;
  var OrbBackground = sh.OrbBackground;
  var Sidebar      = sh.Sidebar;
  var RecoScreen   = window.KBRSRecoScreen.RecoScreen;
  var EdaScreen    = window.KBRSEdaScreen.EdaScreen;
  var DatasetScreen = window.KBRSDatasetScreen.DatasetScreen;

  var tabState      = React.useState("reco");
  var tab = tabState[0]; var setTab = tabState[1];
  var selState      = React.useState(["Can_Bang"]);
  var selected = selState[0]; var setSelected = selState[1];
  var budgetState   = React.useState(15);
  var budget = budgetState[0]; var setBudget = budgetState[1];
  var topKState     = React.useState(5);
  var topK = topKState[0]; var setTopK = topKState[1];
  var brandState    = React.useState([]);
  var brands = brandState[0]; var setBrands = brandState[1];
  var osState       = React.useState(null);
  var osFilter = osState[0]; var setOsFilter = osState[1];

  var toggle = function(id) {
    setSelected(function(s) { return s.includes(id) ? s.filter(function(x){return x!==id;}) : s.concat([id]); });
  };
  var toggleBrand = function(b) {
    setBrands(function(s) { return s.includes(b) ? s.filter(function(x){return x!==b;}) : s.concat([b]); });
  };

  var e = React.createElement;
  return e('div', { style: { height:"100vh", overflow:"hidden", position:"relative" } },
    e(OrbBackground, null),
    e('div', { className:"kbrs-shell" },
      e('div', { className:"kbrs-sidebar" },
        e(Sidebar, { usecases:window.KBRS_USECASES, selected:selected, onToggle:toggle,
                     budget:budget, onBudget:setBudget, topK:topK, onTopK:setTopK,
                     brands:brands, onToggleBrand:toggleBrand,
                     osFilter:osFilter, onOsFilter:setOsFilter })
      ),
      e('main', { className:"kbrs-main", style:{ padding:"24px 40px 64px" } },
        e('div', { style:{ maxWidth:1140, margin:"0 auto", width:"100%" } },
          e('div', { style:{ marginBottom:24 } },
            e(TabBar, { value:tab, onChange:setTab, tabs:[
              { id:"reco", label:"Gợi ý",        icon:"fa-solid fa-wand-magic-sparkles" },
              { id:"eda",  label:"EDA Explorer", icon:"fa-solid fa-chart-column" },
              { id:"data", label:"Dataset",      icon:"fa-solid fa-table" },
            ]})
          ),
          tab==="reco" && e(RecoScreen,   { selected:selected, budget:budget, topK:topK, brands:brands, osFilter:osFilter }),
          tab==="eda"  && e(EdaScreen,    null),
          tab==="data" && e(DatasetScreen, null)
        )
      )
    )
  );
}

function mount() {
  if (!window.KBRSDesignSystem_5964c9 || !window.KBRS_PHONES ||
      !window.KBRSShell || !window.KBRSRecoScreen ||
      !window.KBRSEdaScreen || !window.KBRSDatasetScreen)
    return setTimeout(mount, 40);
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
}
mount();
"""

html = (
    '<!DOCTYPE html><html lang="vi"><head>'
    '<meta charset="utf-8"/>'
    '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>'
    '<script>' + rd(os.path.join(DESIGN, "assets", "react.min.js")) + '</script>'
    '<script>' + rd(os.path.join(DESIGN, "assets", "react-dom.min.js")) + '</script>'
    '<style>' + css_tokens + LAYOUT_CSS + '</style>'
    '<script>' + rd(os.path.join(DESIGN, "_ds_bundle.js")) + '</script>'
    '<script>' + rd(os.path.join(DESIGN, "assets", "data", "phones_data.js")) + '</script>'
    '</head><body><div id="root"></div>'
    '<script>' + APP_ENTRY_JS + '</script>'
    '</body></html>'
)

components.html(html, height=980, scrolling=False)
