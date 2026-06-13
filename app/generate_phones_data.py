"""
generate_phones_data.py
Regenerate app/design/assets/data/phones_data.js from data/final/scored_data.csv.
Run from project root: python app/generate_phones_data.py
"""
import pandas as pd
import json
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "data", "final", "scored_data.csv")
DST  = os.path.join(ROOT, "app", "design", "assets", "data", "phones_data.js")

df = pd.read_csv(SRC)

def val(v):
    if isinstance(v, float) and math.isnan(v):
        return None
    if isinstance(v, float) and v == int(v):
        return int(v)
    return v

records = []
for _, r in df.iterrows():
    records.append({
        "name":         val(r["product_name"]),
        "brand":        val(r["brand"]),
        "url":          val(r["url"]),
        "price":        val(r["price_vnd"]),
        "seg":          val(r["price_segment"]),
        "os":           val(r["os_family"]),
        "chip":         val(r["chip_name"]),
        "ram":          val(r["ram_gb"]),
        "storage":      val(r["storage_gb"]),
        "panel":        val(r["panel_group"]),
        "perf":         round(float(r["score_perf"]), 2),
        "cam":          round(float(r["score_cam"]), 2),
        "batt":         round(float(r["score_batt"]), 2),
        "disp":         round(float(r["score_disp"]), 2),
        "battery":      val(r["battery_mah"]),
        "screen":       val(r["screen_size_inch"]),
        "refresh":      val(r["refresh_rate_hz"]),
        "video":        val(r["max_video_resolution"]),
        "video_rank":   val(r["video_resolution_rank"]),
        "fps":          val(r["fps_at_max_resolution"]),
        "ip":           val(r["ip_status"]),
        "charge":       val(r["fast_charge_w"]),
        "front_cam":    val(r["front_camera_mp"]),
        "rear_cam":     val(r["rear_main_camera_mp"]),
        "weight":       val(r["weight_g"]),
        "weight_tier":  val(r["weight_tier"]),
        "display_tier": val(r["display_tier"]),
    })

js = "window.KBRS_PHONES = " + json.dumps(records, ensure_ascii=False, indent=2) + ";\n"

with open(DST, "w", encoding="utf-8") as f:
    f.write(js)

print(f"✅ Generated {len(records)} phones → {DST}")
