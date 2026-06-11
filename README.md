# KBRS — Knowledge-Based Recommendation Scoring for Smartphones

**DS108 Final Project — Frame 1: Data Integration & Tabular Architecture**

> Hệ thống chấm điểm và gợi ý điện thoại thông minh dựa trên dữ liệu thu thập từ [cellphones.com.vn](https://cellphones.com.vn). Người dùng chọn mục đích sử dụng (chụp hình, chơi game, pin trâu…), hệ thống trả về top-5 smartphone phù hợp nhất.

---

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục)
3. [Pipeline dữ liệu](#3-pipeline-dữ-liệu)
4. [Cài đặt môi trường](#4-cài-đặt-môi-trường)
5. [Hướng dẫn chạy theo thứ tự](#5-hướng-dẫn-chạy-theo-thứ-tự)
6. [Mô tả dữ liệu](#6-mô-tả-dữ-liệu)
7. [Kết quả chính](#7-kết-quả-chính)
8. [Lưu ý kỹ thuật](#8-lưu-ý-kỹ-thuật)

---

## 1. Tổng quan dự án

| Thuộc tính | Chi tiết |
|---|---|
| **Nguồn dữ liệu** | cellphones.com.vn (scrape tự động bằng Selenium) |
| **Số sản phẩm** | 387 smartphones (sau khi lọc feature phone) |
| **Số thuộc tính cuối** | 32 cột trong `scored_data.csv` |
| **Phương pháp chính** | KBRS (Knowledge-Based Recommendation Scoring) |
| **Công nghệ** | Python · pandas · scikit-learn · rapidfuzz · Selenium · Plotly |

### Nguồn dữ liệu tích hợp (Data Integration)

| File | Nội dung | Số dòng |
|---|---|---|
| `data/raw/phone/phone_specs.csv` | Thông số kỹ thuật + giá từ cellphones.com.vn | 412 |
| `data/raw/rating/phone_ratings.csv` | Điểm camera & display (crowdsourced) | 412 |
| `data/raw/processor/processors_ratings.csv` | Điểm hiệu năng chip (AnTuTu benchmark) | 234 |

---

## 2. Cấu trúc thư mục

```
.
├── data/
│   ├── raw/
│   │   ├── phone/           # Dữ liệu thô từ cellphones.com.vn
│   │   ├── rating/          # Điểm đánh giá camera/display
│   │   ├── processor/       # Bảng điểm chip
│   │   └── url/             # Danh sách URL đã crawl
│   ├── processed/
│   │   ├── phone_specs_preprocessed.csv     # Sau bước preprocessing (411 dòng)
│   │   └── phone_specs_preprocessed_v2.csv  # Sau bước EDA + KNN imputation (387 dòng)
│   └── final/
│       └── scored_data.csv  # Dataset cuối (387 dòng × 32 cột)
│
├── notebooks/
│   ├── data_collection/     # Scripts thu thập dữ liệu (Selenium)
│   ├── data_cleaning_and_imputation/
│   │   └── data_preprocessing.ipynb   # Bước 1: Làm sạch dữ liệu thô
│   ├── EDA/
│   │   └── EDA.ipynb                  # Bước 2: Phân tích khám phá (9 bookmark)
│   └── KBRS/
│       ├── kbrs_scoring.ipynb         # Bước 3: Tính điểm KBRS
│       └── kbs_engine.ipynb           # Bước 4: Engine gợi ý
│
├── requirements.txt
├── CODE_BOOK.md             # Từ điển dữ liệu cho scored_data.csv
└── README.md
```

---

## 3. Pipeline dữ liệu

```
[Selenium Scraping]
        ↓
data/raw/phone/phone_specs.csv  +  phone_ratings.csv  +  processors_ratings.csv
        ↓
[data_preprocessing.ipynb]
  • Đổi tên cột (Vietnamese → English)
  • Parse giá VND, RAM GB, storage GB, weight_g
  • Tạo derived features: price_segment, panel_score, os_family
  • Loại bỏ 1 bản ghi trùng lặp
        ↓
data/processed/phone_specs_preprocessed.csv  (411 dòng × 30 cột)
        ↓
[EDA.ipynb]
  • 9 nhóm phân tích (Price, Specs, Camera, Display, Brand/OS, Chip, Missing Values, Correlation)
  • MCAR/MAR/MNAR test (Little's MCAR chi-squared + logistic regression proxy)
  • Lọc feature phones → 387 smartphones
  • KNN Imputation (k=5) cho các cột thiếu quan trọng
        ↓
data/processed/phone_specs_preprocessed_v2.csv  (387 dòng × 30 cột)
        ↓
[kbrs_scoring.ipynb]
  • Tích hợp 3 nguồn: phone specs + camera ratings (fuzzy match) + chip ratings (fuzzy match)
  • Min-Max normalization → 4 điểm thành phần (score_perf, score_cam, score_batt, score_disp)
  • KMeans clustering (k=4) → display_tier
  • weight_tier, ip_status, video_resolution_rank
        ↓
data/final/scored_data.csv  (387 dòng × 32 cột)
        ↓
[kbs_engine.ipynb]
  • 10 use-case profiles với hard filters + weighted np.dot scoring
  • Soft budget constraint ±10%
  • Top-5 recommendations per use case
```

---

## 4. Cài đặt môi trường

```bash
# Clone repo
git clone <repo_url>
cd <repo_folder>

# Tạo virtual environment (khuyến nghị)
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
.venv\Scripts\activate           # Windows

# Cài dependencies
pip install -r requirements.txt
```

**Yêu cầu hệ thống:**
- Python >= 3.10
- Google Chrome (cho Selenium scraping)
- RAM >= 4GB (KMeans + KNN imputation)

---

## 5. Hướng dẫn chạy theo thứ tự

> **Nếu chỉ muốn chạy engine**: `scored_data.csv` đã có sẵn, bỏ qua bước 1–3.

### Bước 0 — Thu thập dữ liệu (tùy chọn)

```bash
python notebooks/data_collection/get_product_links_final.py
python notebooks/data_collection/crawl_data.py
python notebooks/data_collection/crawl_phone_rating
python notebooks/data_collection/crawl_processors.py
```

### Bước 1 — Preprocessing

Mở và chạy toàn bộ: `notebooks/data_cleaning_and_imputation/data_preprocessing.ipynb`

Đầu ra: `data/processed/phone_specs_preprocessed.csv`

### Bước 2 — EDA

Mở và chạy toàn bộ: `notebooks/EDA/EDA.ipynb`

Đầu ra: `data/processed/phone_specs_preprocessed_v2.csv`

### Bước 3 — KBRS Scoring

Mở và chạy toàn bộ: `notebooks/KBRS/kbrs_scoring.ipynb`

Đầu ra: `data/final/scored_data.csv`

### Bước 4 — Recommendation Engine

Mở và chạy: `notebooks/KBRS/kbs_engine.ipynb`

---

## 6. Mô tả dữ liệu

Xem chi tiết từng cột tại: [CODE_BOOK.md](CODE_BOOK.md)

| Nhóm | Cột | Mô tả |
|---|---|---|
| Định danh | product_name, brand, url | Tên, hãng, đường dẫn sản phẩm |
| Giá | price_vnd, price_segment | Giá VND, phân khúc |
| Điểm KBRS | score_perf, score_cam, score_batt, score_disp | 0–10, Min-Max normalized |
| Tier | weight_tier, display_tier, ip_status, video_resolution_rank | Phân hạng rời rạc |
| Thông số | ram_gb, storage_gb, battery_mah, fast_charge_w, weight_g | Giá trị số |
| Màn hình | screen_size_inch, panel_group, refresh_rate_hz, resolution_width/height | Màn hình |
| Camera | front_camera_mp, rear_main_camera_mp, rear_camera_count, max_video_resolution, fps_at_max_resolution | Camera |
| HĐH | chip_name, os_family, os_version, promotion | Chip, OS, khuyến mãi |

---

## 7. Kết quả chính

**10 use-case profiles được hỗ trợ:**

| Use Case | Mô tả | Hard Filters |
|---|---|---|
| Gia_Re | Giá rẻ nhất trong ngân sách | — |
| Flagship | Hiệu năng tổng thể cao nhất | — |
| Lien_Lac_Co_Ban | Liên lạc cơ bản | — |
| Choi_Game | Gaming | score_perf >= 5.5, RAM >= 8GB, 120Hz |
| Giai_Tri_MXH | Giải trí mạng xã hội | display_tier >= 3 |
| Chup_Hinh_Quay_Phim | Chụp hình & quay phim | score_cam >= 8, video_rank >= 4, storage >= 256GB |
| Pin_Trau_Sac_Nhanh | Pin lớn & sạc nhanh | battery >= 6000mAh, fast_charge >= 33W |
| Nho_Gon_Nhe_Tay | Nhỏ gọn nhẹ tay | weight_tier = 1 (< 185g) |
| Khang_Nuoc | Kháng nước | ip_status = 1 |
| Bat_Ky | Cân bằng mọi tiêu chí | — |

---

## 8. Lưu ý kỹ thuật

**Entity Resolution — Fuzzy matching**: Dùng rapidfuzz (threshold=75) + validate_model_match để tránh khớp sai model. 163/387 máy khớp trực tiếp; 224 máy dùng brand+segment median fallback.

**KMeans trên Windows**: OMP_NUM_THREADS=2 trong kbrs_scoring.ipynb Cell 5 để tránh MKL memory leak. Không ảnh hưởng kết quả.

**Missing value analysis**: EDA Bookmark 8 thực hiện Little's MCAR test (chi-squared) và logistic regression proxy trước khi áp dụng KNN Imputation (k=5).

**Không có data leakage**: KBRS là recommendation system không có train/test split. Min-Max scaling trên 387 dòng là feature normalization cho scoring, không phải preprocessing cho supervised learning.

**Outlier handling**: weight_g < 100g bị thay bằng segment median (ví dụ: OPPO Find X9 Ultra ghi 35g thay vì ~214g thực tế).
