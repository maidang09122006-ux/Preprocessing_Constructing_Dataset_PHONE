# Code Book — `data/final/scored_data.csv`

**Dataset**: KBRS Scored Smartphone Dataset  
**Rows**: 387 smartphones  
**Columns**: 32  
**Source**: Crawled from cellphones.com.vn + processor ratings + camera ratings  
**Produced by**: `notebooks/KBRS/kbrs_scoring.ipynb`

---

## Nhóm 1 — Định danh sản phẩm

| Cột | Kiểu | Null | Mô tả |
|---|---|---|---|
| `product_name` | string | 0 | Tên đầy đủ sản phẩm trên cellphones.com.vn (ví dụ: *Samsung Galaxy S24 Ultra 256GB*) |
| `brand` | string | 0 | Hãng sản xuất (21 hãng: Samsung, Apple, Xiaomi, OPPO, vivo, …) |
| `url` | string | 0 | URL trang sản phẩm trên cellphones.com.vn |

---

## Nhóm 2 — Giá & Phân khúc

| Cột | Kiểu | Null | Mô tả | Giá trị |
|---|---|---|---|---|
| `price_vnd` | int64 | 0 | Giá niêm yết (VND) | 1,590,000 – 63,990,000 |
| `price_segment` | string | 0 | Phân khúc giá | `budget` (< 5M), `mid` (5–10M), `high` (10–20M), `flagship` (≥ 20M) |
| `promotion` | string | 19 | Nội dung khuyến mãi từ trang web (nullable — không phải sản phẩm nào cũng có) | Văn bản tự do |

---

## Nhóm 3 — Điểm KBRS (0–10)

> Tất cả điểm được chuẩn hóa Min-Max từ giá trị thực tế trong dataset. Điểm 0 = thấp nhất, 10 = cao nhất trong 387 máy.

| Cột | Kiểu | Null | Mô tả | Khoảng thực tế |
|---|---|---|---|---|
| `score_perf` | float64 | 0 | Điểm hiệu năng — dựa trên chip rating (AnTuTu benchmark, nguồn: `processors_ratings.csv`). Apple và Android được scale riêng biệt theo hệ sinh thái | 0.48 – 9.30 |
| `score_cam` | float64 | 0 | Điểm camera — từ `phone_ratings.csv`, khớp qua fuzzy matching (rapidfuzz threshold=75 + validate_model_match). 224/387 máy dùng brand+segment median fallback | 0.00 – 10.00 |
| `score_batt` | float64 | 0 | Điểm pin — tổ hợp dung lượng pin (battery_mah) và tốc độ sạc (fast_charge_w), scale Min-Max | 0.91 – 8.00 |
| `score_disp` | float64 | 0 | Điểm màn hình — từ `phone_ratings.csv` (display_rating), khớp tương tự camera | 0.00 – 8.29 |

---

## Nhóm 4 — Tier & Trạng thái (biến rời rạc)

| Cột | Kiểu | Null | Mô tả | Giá trị |
|---|---|---|---|---|
| `weight_tier` | int64 | 0 | Phân hạng trọng lượng | `1` = nhẹ (< 185g), `2` = trung bình (185–209g), `3` = nặng (≥ 210g) |
| `ip_status` | int64 | 0 | Chuẩn kháng nước/bụi | `1` = có chuẩn IP (IP67, IP68, …), `0` = không có |
| `display_tier` | int64 | 0 | Chất lượng màn hình — KMeans clustering (k=4) trên screen_size_inch + panel_score + resolution_total_pixels | `1` = thấp nhất → `4` = cao nhất |
| `video_resolution_rank` | int64 | 0 | Xếp hạng độ phân giải quay video tối đa | `0`=Unknown, `2`=1080p, `3`=2K, `4`=4K, `5`=4K+, `6`=8K |

---

## Nhóm 5 — Thông số phần cứng

| Cột | Kiểu | Null | Mô tả | Khoảng thực tế |
|---|---|---|---|---|
| `chip_name` | string | 0 | Tên chip (ví dụ: *Snapdragon 8 Gen 3*, *Apple A17 Pro*) | 206 giá trị duy nhất |
| `ram_gb` | float64 | 0 | RAM (GB) | 2 – 16 |
| `storage_gb` | float64 | 0 | Bộ nhớ trong (GB) | 16 – 2048 |
| `battery_mah` | float64 | 0 | Dung lượng pin (mAh) | 323 – 8300 |
| `fast_charge_w` | float64 | 0 | Công suất sạc nhanh tối đa (W) | 10 – 120 |
| `weight_g` | float64 | 0 | Trọng lượng máy (g). Outlier < 100g được thay bằng segment median | 135 – 263 |

---

## Nhóm 6 — Màn hình

| Cột | Kiểu | Null | Mô tả | Khoảng thực tế |
|---|---|---|---|---|
| `screen_size_inch` | float64 | 1 | Kích thước màn hình (inch) | 5.4 – 8.12 |
| `panel_group` | string | 0 | Loại tấm nền | `AMOLED`, `LCD`, `Unknown` |
| `refresh_rate_hz` | float64 | 28 | Tần số quét màn hình (Hz) | 60, 90, 120, 144, 165 |
| `resolution_width` | float64 | 27 | Độ phân giải chiều ngang (px) | 720 – 2268 |
| `resolution_height` | float64 | 27 | Độ phân giải chiều dọc (px) | 1440 – 3216 |

---

## Nhóm 7 — Camera & Video

| Cột | Kiểu | Null | Mô tả | Khoảng thực tế |
|---|---|---|---|---|
| `front_camera_mp` | float64 | 3 | Độ phân giải camera trước (MP) | 5 – 50 |
| `rear_main_camera_mp` | float64 | 7 | Độ phân giải camera sau chính (MP) | 8 – 200 |
| `rear_camera_count` | float64 | 7 | Số lượng camera sau | 1 – 5 |
| `max_video_resolution` | string | 0 | Độ phân giải quay video tối đa | `1080p`, `4K`, `4K+`, `8K`, `2K`, `Unknown` |
| `fps_at_max_resolution` | int64 | 0 | FPS tại độ phân giải tối đa | 30, 60, 120, 240 |

---

## Nhóm 8 — Hệ điều hành

| Cột | Kiểu | Null | Mô tả | Giá trị |
|---|---|---|---|---|
| `os_family` | string | 0 | Hệ điều hành | `Android`, `iOS`, `Other`, `Unknown` |
| `os_version` | float64 | 74 | Phiên bản hệ điều hành (nullable — một số máy không ghi rõ) | 8.1 – 26.0 |

---

## Ghi chú về Missing Values

| Cột | Số null | Lý do | Xử lý |
|---|---|---|---|
| `promotion` | 19 | Không phải sản phẩm nào cũng có khuyến mãi | Giữ nguyên NaN (thông tin tùy chọn) |
| `os_version` | 74 | Một số máy chạy OS cũ/custom không ghi phiên bản | Giữ nguyên NaN |
| `screen_size_inch` | 1 | Thiếu trong trang sản phẩm gốc | Segment median imputation trong EDA |
| `refresh_rate_hz` | 28 | Nhiều máy budget không ghi thông số | Segment median (60Hz default) |
| `resolution_width/height` | 27 | Màn hình không ghi độ phân giải | Giữ nguyên NaN |
| `front_camera_mp` | 3 | Một số máy không ghi camera trước | Giữ nguyên NaN |
| `rear_main_camera_mp` | 7 | Một số máy feature phone/đặc biệt | Giữ nguyên NaN |
| `rear_camera_count` | 7 | Tương tự rear_main_camera_mp | Giữ nguyên NaN |

---

## Nguồn dữ liệu cho từng cột

| Nguồn gốc | Các cột |
|---|---|
| `data/raw/phone/phone_specs.csv` (crawl trực tiếp) | product_name, brand, url, price_vnd, chip_name, ram_gb, storage_gb, os_family, os_version, screen_size_inch, panel_group, refresh_rate_hz, resolution_width, resolution_height, battery_mah, fast_charge_w, front_camera_mp, rear_main_camera_mp, rear_camera_count, max_video_resolution, weight_g, promotion |
| `data/raw/rating/phone_ratings.csv` (crawl + fuzzy match) | score_cam, score_disp |
| `data/raw/processor/processors_ratings.csv` (crawl + fuzzy match) | score_perf |
| Tính toán/derived trong pipeline | price_segment, score_batt, weight_tier, ip_status, display_tier, video_resolution_rank, fps_at_max_resolution |
