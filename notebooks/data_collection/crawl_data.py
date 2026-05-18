import pandas as pd
import re
import time
import os
import sys

from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

PROJECT_ROOT = Path(__file__).resolve().parents[2]

URL_DATA_DIR = PROJECT_ROOT / "data" / "raw" / "url"
PHONE_DATA_DIR = PROJECT_ROOT / "data" / "raw" / "phone"

#INPUT 
FILE_INPUT = URL_DATA_DIR / "url_final.csv"

#OUTPUT
FILE_OUTPUT = PHONE_DATA_DIR / "phone_specs.csv"
FILE_SKIPPED = PHONE_DATA_DIR / "skipped_no_price.csv"
FILE_FAILED = PHONE_DATA_DIR / "failed_urls.csv"

# Test trước. Khi ổn thì đổi thành None để cào toàn bộ.
LIMIT = None
# LIMIT = None

SAVE_EVERY = 20
DEBUG_SPECS = False

COLUMNS_ORDER = [
    "Tên sản phẩm",
    "Giá bán",
    "RAM",
    "Bộ nhớ trong",
    "Kích thước màn hình",
    "Tấm nền",
    "Tần số quét",
    "Độ phân giải",
    "Dung lượng pin",
    "Chip xử lý",
    "Hãng sản xuất",
    "Hệ điều hành",
    "Camera trước",
    "Camera sau",
    "Quay video",
    "Sạc nhanh",
    "Kháng nước / bụi",
    "Trọng lượng",
    "Khuyến mãi giảm giá",
    "URL",
]


# ===== SETUP DRIVER =====
options = Options()
options.page_load_strategy = "eager"
options.add_argument("--headless=new")
options.add_argument("--disable-notifications")
options.add_argument("--disable-geolocation")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--window-size=1920,1080")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--no-sandbox")
options.add_argument(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
)

driver = webdriver.Edge(options=options)
driver.set_page_load_timeout(35)
wait = WebDriverWait(driver, 10)


# ===== LOAD URL INPUT =====
df_input = pd.read_csv(FILE_INPUT)
urls = df_input.iloc[:, 0].dropna().drop_duplicates().tolist()

if LIMIT is not None:
    urls = urls[:LIMIT]


# ===== LOAD DATA CŨ ĐỂ CHẠY TIẾP =====
data = []
done_urls = set()

if os.path.exists(FILE_OUTPUT):
    df_old = pd.read_csv(FILE_OUTPUT)
    if "URL" in df_old.columns:
        df_old = df_old.drop_duplicates(subset=["URL"], keep="last")
        data = df_old.to_dict("records")
        done_urls = set(df_old["URL"].dropna().tolist())
        print(f"--- Đã tìm thấy {FILE_OUTPUT}. Sẽ bỏ qua {len(done_urls)} sản phẩm đã cào. ---")


# ===== LOAD SẢN PHẨM ĐÃ BỎ QUA DO KHÔNG CÓ GIÁ =====
skipped_rows = []
skipped_urls = set()

if os.path.exists(FILE_SKIPPED):
    df_skip_old = pd.read_csv(FILE_SKIPPED)
    if "URL" in df_skip_old.columns:
        skipped_rows = df_skip_old.to_dict("records")
        skipped_urls = set(df_skip_old["URL"].dropna().tolist())
        print(f"--- Đã tìm thấy {FILE_SKIPPED}. Sẽ bỏ qua {len(skipped_urls)} sản phẩm không có giá. ---")


# ===== LOAD FILE LỖI TẠM THỜI =====
failed_rows = []

if os.path.exists(FILE_FAILED):
    df_failed_old = pd.read_csv(FILE_FAILED)
    failed_rows = df_failed_old.to_dict("records")


# ===== HÀM LƯU FILE =====
def save_data():
    if not data:
        return

    df_out = pd.DataFrame(data)
    df_out = df_out.reindex(columns=COLUMNS_ORDER)
    df_out = df_out.drop_duplicates(subset=["URL"], keep="last")
    df_out.to_csv(FILE_OUTPUT, index=False, encoding="utf-8-sig")

    print(f"--- Đã lưu {len(df_out)} dòng vào {FILE_OUTPUT} ---")


def add_skipped(url, name=None, reason=None):
    if url in skipped_urls:
        return

    skipped_urls.add(url)
    skipped_rows.append({
        "Tên sản phẩm": name,
        "Lý do bỏ qua": reason,
        "URL": url,
    })


def save_skipped():
    if not skipped_rows:
        return

    df_skip = pd.DataFrame(skipped_rows)
    df_skip = df_skip.drop_duplicates(subset=["URL"], keep="last")
    df_skip.to_csv(FILE_SKIPPED, index=False, encoding="utf-8-sig")


def add_failed(url, name=None, reason=None):
    failed_rows.append({
        "Tên sản phẩm": name,
        "Lý do lỗi": reason,
        "URL": url,
    })


def save_failed():
    if not failed_rows:
        return

    df_failed = pd.DataFrame(failed_rows)
    df_failed.to_csv(FILE_FAILED, index=False, encoding="utf-8-sig")


# ===== HÀM PHỤ =====
def clean_text(text):
    if text is None:
        return None
    text = str(text).replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text if text else None

def clean_text_keep_lines(text):
    """
    Giữ nguyên từng dòng trong box khuyến mãi.
    Không nén tất cả thành 1 dòng như clean_text().
    """
    if text is None:
        return None

    text = str(text).replace("\xa0", " ")
    lines = []

    for line in text.splitlines():
        line = re.sub(r"\s+", " ", line).strip()
        if line:
            lines.append(line)

    return "\n".join(lines) if lines else None

def split_lines(text):
    if not text:
        return []
    return [clean_text(line) for line in str(text).splitlines() if clean_text(line)]


def normalize_key(text):
    if not text:
        return ""
    return clean_text(text).lower()


def safe_get(url, retries=2):
    for attempt in range(1, retries + 1):
        try:
            driver.get(url)
            return True

        except TimeoutException:
            print(f"   -> Timeout khi load trang, thử lại {attempt}/{retries}")

            try:
                driver.execute_script("window.stop();")
            except:
                pass

            time.sleep(2)

        except WebDriverException as e:
            print(f"   -> Lỗi WebDriver khi load trang, thử lại {attempt}/{retries}: {str(e)[:200]}")
            time.sleep(2)

    return False


def remove_promo_noise(text):
    text = clean_text(text)
    if not text:
        return None

    noise_words = [
        "Xem chi tiết",
        "Thu thập",
        "Kiểm tra ngay",
        "Đăng nhập ngay",
        "Xác thực ngay",
        "Xem thể lệ",
        "Xem tất cả voucher",
    ]

    for word in noise_words:
        text = text.replace(word, "")

    text = re.sub(r"^\d+\s*", "", text).strip()
    return clean_text(text)


def add_to_specs(specs_dict, key, val):
    key = clean_text(key)
    val = clean_text(val)

    if not key or not val:
        return

    if key == val:
        return

    if len(key) > 90:
        return

    # Lưu ý: KHÔNG được đưa "camera sau", "camera trước" vào bad_keys
    # vì đó chính là key cần cào.
    bad_keys = [
        "thông số kĩ thuật",
        "thông số kỹ thuật",
        "màn hình",
        "vi xử lý & đồ họa",
        "giao tiếp & kết nối",
        "ram & lưu trữ",
        "tính năng khác",
        "kích thước & trọng lượng",
        "pin & công nghệ sạc",
        "tiện ích khác",
        "cổng kết nối",
        "thông tin chung",
    ]

    if normalize_key(key) in bad_keys:
        return

    if key in specs_dict:
        if val not in specs_dict[key]:
            specs_dict[key] += " | " + val
    else:
        specs_dict[key] = val


# ===== TÊN / GIÁ =====
def get_name():
    selectors = [
        ".box-product-name h1",
        "h1",
    ]

    for selector in selectors:
        try:
            el = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, selector)))
            text = clean_text(el.text)
            if text:
                return text
        except:
            pass

    return None


def is_contact_price_product():
    try:
        elements = driver.find_elements(
            By.XPATH,
            "//*[contains(translate(normalize-space(.), 'LIÊN HỆ ĐỂ BÁO GIÁ', 'liên hệ để báo giá'), 'liên hệ để báo giá')]"
        )

        for el in elements:
            if el.is_displayed():
                return True
    except:
        pass

    return False


def get_price():
    if is_contact_price_product():
        return None

    price_selectors = [
        ".sale-price",
        ".box-product-price .special-price",
        ".product__price--show",
        "[class*='sale-price']",
        "[class*='special-price']",
        "[class*='price']",
    ]

    for selector in price_selectors:
        try:
            elements = driver.find_elements(By.CSS_SELECTOR, selector)

            for el in elements:
                if not el.is_displayed():
                    continue

                text = clean_text(el.text)
                if not text:
                    continue

                lower_text = text.lower()

                if "liên hệ" in lower_text or "báo giá" in lower_text:
                    return None

                match = re.search(r"\d[\d\.]*\s?đ", text)
                if match:
                    return match.group(0).replace(" ", "")

        except:
            pass

    return None


# ===== BẤM XEM TẤT CẢ THÔNG SỐ =====
def click_see_all_specs():
    """
    Chỉ click nút Xem tất cả gần mục Thông số kỹ thuật.
    Không click Xem tất cả voucher.
    """

    try:
        driver.execute_script("""
            const els = [...document.querySelectorAll('h2,h3,p,div,span')];
            const target = els.find(e => {
                const t = (e.innerText || '').trim();
                return t.length < 80 && /Thông số k[ĩỹ] thuật/i.test(t);
            });
            if (target) target.scrollIntoView({block: 'center'});
        """)
        time.sleep(0.7)
    except:
        pass

    xpaths = [
        "//*[string-length(normalize-space()) < 90 and (contains(normalize-space(), 'Thông số kỹ thuật') or contains(normalize-space(), 'Thông số kĩ thuật'))]/following::*[(self::a or self::button or @role='button') and contains(normalize-space(), 'Xem tất cả')][1]",
        "//*[string-length(normalize-space()) < 90 and (contains(normalize-space(), 'Thông số kỹ thuật') or contains(normalize-space(), 'Thông số kĩ thuật'))]/following::*[(self::a or self::button or @role='button') and contains(normalize-space(), 'Xem chi tiết')][1]",
        "//*[string-length(normalize-space()) < 90 and (contains(normalize-space(), 'Thông số kỹ thuật') or contains(normalize-space(), 'Thông số kĩ thuật'))]/following::*[(self::a or self::button or @role='button') and contains(normalize-space(), 'Xem cấu hình')][1]",
    ]

    for xpath in xpaths:
        try:
            elements = driver.find_elements(By.XPATH, xpath)

            for el in elements:
                if el.is_displayed():
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", el)
                    time.sleep(0.4)
                    driver.execute_script("arguments[0].click();", el)
                    time.sleep(1.5)
                    return True
        except:
            pass

    try:
        clicked = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
            }

            const headings = [...document.querySelectorAll('h2,h3,p,div,span')]
                .filter(e => visible(e))
                .filter(e => {
                    const t = (e.innerText || '').trim();
                    return t.length < 80 && /Thông số k[ĩỹ] thuật/i.test(t);
                });

            for (const h of headings) {
                h.scrollIntoView({block: 'center'});

                let area = h;
                for (let i = 0; i < 5 && area.parentElement; i++) {
                    area = area.parentElement;
                    const buttons = [...area.querySelectorAll('a,button,[role="button"]')]
                        .filter(visible)
                        .filter(b => /Xem tất cả|Xem chi tiết|Xem cấu hình/i.test((b.innerText || '').trim()))
                        .filter(b => !/voucher|khuyến mãi|ưu đãi/i.test((b.innerText || '').trim()));

                    if (buttons.length > 0) {
                        buttons[0].click();
                        return true;
                    }
                }
            }

            return false;
        """)

        if clicked:
            time.sleep(1.5)
            return True
    except:
        pass

    return False


def scroll_specs_modal():
    try:
        for _ in range(5):
            driver.execute_script("""
                function visible(el) {
                    const s = window.getComputedStyle(el);
                    const r = el.getBoundingClientRect();
                    return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
                }

                const scopes = [...document.querySelectorAll('[role="dialog"], .modal, .modal-content, div[class*="modal"], div[class*="popup"]')]
                    .filter(visible)
                    .filter(e => /Thông số|Màn hình|Camera|RAM|Pin/i.test(e.innerText || ''));

                const scope = scopes.sort((a, b) => (a.innerText || '').length - (b.innerText || '').length)[0];

                if (scope) {
                    scope.scrollTop = scope.scrollHeight;
                } else {
                    window.scrollTo(0, document.body.scrollHeight);
                }
            """)
            time.sleep(0.25)
    except:
        pass


def close_specs_modal():
    try:
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        time.sleep(0.4)
    except:
        pass

    try:
        buttons = driver.find_elements(
            By.XPATH,
            "//*[(@aria-label='Close' or @aria-label='Đóng') or normalize-space()='×' or normalize-space()='x' or normalize-space()='X']"
        )
        for btn in buttons:
            if btn.is_displayed():
                driver.execute_script("arguments[0].click();", btn)
                time.sleep(0.4)
                return
    except:
        pass


# ===== LẤY TOÀN BỘ BẢNG THÔNG SỐ =====
def collect_spec_pairs_by_js():
    try:
        pairs = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
            }

            const dialogScopes = [...document.querySelectorAll('[role="dialog"], .modal, .modal-content, div[class*="modal"], div[class*="popup"]')]
                .filter(visible)
                .filter(e => /Thông số|Màn hình|Camera|RAM|Pin|Chipset/i.test(e.innerText || ''));

            let scope = null;

            if (dialogScopes.length > 0) {
                scope = dialogScopes.sort((a, b) => (a.innerText || '').length - (b.innerText || '').length)[0];
            } else {
                const candidates = [...document.querySelectorAll('section, div')]
                    .filter(visible)
                    .filter(e => /Thông số k[ĩỹ] thuật|Kích thước màn hình|Camera sau|Chipset/i.test(e.innerText || ''));
                scope = candidates.sort((a, b) => (a.innerText || '').length - (b.innerText || '').length)[0] || document.body;
            }

            const rows = [];
            const rowNodes = [...scope.querySelectorAll('tr, .technical-content-item, [class*="technical"] tr, [class*="spec"] tr')];

            for (const row of rowNodes) {
                if (!visible(row)) continue;

                const cells = [...row.querySelectorAll('td, th')]
                    .map(c => (c.innerText || '').trim())
                    .filter(Boolean);

                if (cells.length >= 2) {
                    rows.push([cells[0], cells.slice(1).join(' ')]);
                    continue;
                }

                const children = [...row.children]
                    .map(c => (c.innerText || '').trim())
                    .filter(Boolean);

                if (children.length >= 2 && children[0].length < 90) {
                    rows.push([children[0], children.slice(1).join(' ')]);
                }
            }

            return rows;
        """)

        return pairs or []
    except:
        return []


def get_specs():
    specs_dict = {}

    try:
        wait.until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(normalize-space(), 'Thông số kỹ thuật') or contains(normalize-space(), 'Thông số kĩ thuật') or contains(normalize-space(), 'Kích thước màn hình')]"
                )
            )
        )
    except:
        pass

    opened = click_see_all_specs()

    if opened:
        scroll_specs_modal()

    for key, val in collect_spec_pairs_by_js():
        add_to_specs(specs_dict, key, val)

    row_selectors = [
        ".technical-content-item",
        ".modal .technical-content-item",
        ".modal-content .technical-content-item",
        "[class*='technical'] tr",
        "[class*='spec'] tr",
        "table tr",
    ]

    for selector in row_selectors:
        try:
            rows = driver.find_elements(By.CSS_SELECTOR, selector)

            for row in rows:
                if not row.is_displayed():
                    continue

                cols = row.find_elements(By.TAG_NAME, "td")

                if len(cols) >= 2:
                    key = cols[0].text
                    val = " ".join([col.text for col in cols[1:]])
                    add_to_specs(specs_dict, key, val)
                    continue

                lines = split_lines(row.text)
                if len(lines) >= 2:
                    key = lines[0]
                    val = " | ".join(lines[1:])
                    add_to_specs(specs_dict, key, val)

        except:
            pass

    return specs_dict


# ===== TÌM THÔNG SỐ THEO KEY =====
def find_spec(specs_dict, exact_keys=None, key_contains=None):
    exact_keys = exact_keys or []
    key_contains = key_contains or []

    for key in exact_keys:
        if key in specs_dict:
            return specs_dict[key]

    for k, v in specs_dict.items():
        nk = normalize_key(k)

        for target in exact_keys:
            if nk == normalize_key(target):
                return v

    for k, v in specs_dict.items():
        nk = normalize_key(k)

        for keyword in key_contains:
            if normalize_key(keyword) in nk:
                return v

    return None


def find_value_by_regex(specs_dict, pattern, prefer_key_contains=None):
    prefer_key_contains = prefer_key_contains or []

    for k, v in specs_dict.items():
        nk = normalize_key(k)
        if any(normalize_key(key) in nk for key in prefer_key_contains):
            match = re.search(pattern, str(v), flags=re.IGNORECASE)
            if match:
                return clean_text(match.group(0))

    for k, v in specs_dict.items():
        match = re.search(pattern, str(v), flags=re.IGNORECASE)
        if match:
            return clean_text(match.group(0))

    return None


def get_fast_charge(specs_dict):
    fast_charge = find_spec(
        specs_dict,
        exact_keys=[
            "Sạc nhanh",
            "Công nghệ sạc",
            "Công suất sạc",
            "Hỗ trợ sạc tối đa",
        ],
        key_contains=[
            "sạc nhanh",
            "công nghệ sạc",
            "công suất sạc",
            "hỗ trợ sạc",
            "sạc tối đa",
        ],
    )

    if fast_charge:
        return fast_charge

    # Tìm trong toàn bộ value của bảng thông số, kể cả key Pin
    for k, v in specs_dict.items():
        nk = normalize_key(k)
        text = clean_text(v)

        if not text:
            continue

        if "cổng sạc" in nk or "công sạc" in nk:
            continue

        lower_text = text.lower()

        if "sạc" in lower_text or "fast charging" in lower_text or re.search(r"\b\d{1,3}\s?W\b", text, re.IGNORECASE):
            match = re.search(
                r"(sạc nhanh\s*\d{1,3}\s?W|fast charging\s*\d{1,3}\s?W|sạc siêu nhanh\s*\d{1,3}\s?W|sạc\s*\d{1,3}\s?W)",
                text,
                flags=re.IGNORECASE
            )

            if match:
                return clean_text(match.group(0))

            watt = re.search(r"\b\d{1,3}\s?W\b", text, flags=re.IGNORECASE)
            if watt and ("pin" in nk or "sạc" in lower_text or "fast charging" in lower_text):
                return clean_text(watt.group(0))

    return None


def infer_ram_from_name(name):
    if not name:
        return None

    match = re.search(r"\b(\d{1,2})\s?GB\s*(?:RAM)?\b", name, re.IGNORECASE)
    if match:
        return f"{match.group(1)} GB"

    return None


def infer_storage_from_name(name):
    if not name:
        return None

    matches = re.findall(r"\b(\d{2,4})\s?GB\b", name, re.IGNORECASE)
    if matches:
        return f"{matches[-1]} GB"

    tb_match = re.search(r"\b(\d)\s?TB\b", name, re.IGNORECASE)
    if tb_match:
        return f"{tb_match.group(1)} TB"

    return None


def parse_specs(specs_dict, name=None):
    ram = find_spec(
        specs_dict,
        exact_keys=["Dung lượng RAM", "RAM"],
        key_contains=["ram"],
    )

    storage = find_spec(
        specs_dict,
        exact_keys=["Bộ nhớ trong", "Dung lượng lưu trữ", "ROM"],
        key_contains=["bộ nhớ trong", "lưu trữ", "rom"],
    )

    screen_size = find_spec(
        specs_dict,
        exact_keys=["Kích thước màn hình"],
        key_contains=["kích thước màn hình"],
    )

    panel = find_spec(
        specs_dict,
        exact_keys=["Công nghệ màn hình", "Tấm nền", "Loại màn hình"],
        key_contains=["công nghệ màn hình", "tấm nền", "loại màn hình"],
    )

    # Được phép lấy 120Hz từ "Tính năng màn hình" vì vẫn nằm trong bảng thông số kỹ thuật
    refresh_rate = find_spec(
        specs_dict,
        exact_keys=["Tần số quét", "Tần số quét màn hình"],
        key_contains=["tần số quét"],
    ) or find_value_by_regex(
        specs_dict,
        r"\b\d{2,3}\s?Hz\b",
        prefer_key_contains=["tính năng màn hình", "màn hình"]
    )

    resolution = find_spec(
        specs_dict,
        exact_keys=["Độ phân giải màn hình", "Độ phân giải"],
        key_contains=["độ phân giải"],
    ) or find_value_by_regex(
        specs_dict,
        r"(QVGA\s*\d{3,4}\s*[*x×]\s*\d{3,4}|\d{3,4}\s*[*x×]\s*\d{3,4}\s*(?:pixels|pixel)?|\d+\.\d+\s*x\s*\d+\.\d+\s*pixels)",
        prefer_key_contains=["tính năng màn hình", "màn hình"]
    )

    battery = find_spec(
        specs_dict,
        exact_keys=["Dung lượng pin", "Pin"],
        key_contains=["dung lượng pin", "pin"],
    ) or find_value_by_regex(
        specs_dict,
        r"\b\d{3,5}\s?mAh\b",
        prefer_key_contains=["pin"]
    )

    chipset = find_spec(
        specs_dict,
        exact_keys=["Chipset", "Chip xử lý", "CPU", "Vi xử lý"],
        key_contains=["chipset", "chip xử lý", "vi xử lý", "cpu"],
    )

    os_name = find_spec(
        specs_dict,
        exact_keys=["Hệ điều hành", "OS"],
        key_contains=["hệ điều hành"],
    )

    front_camera = find_spec(
        specs_dict,
        exact_keys=["Camera trước", "Camera selfie"],
        key_contains=["camera trước", "camera selfie"],
    )

    rear_camera = find_spec(
        specs_dict,
        exact_keys=["Camera sau", "Camera chính"],
        key_contains=["camera sau", "camera chính"],
    )

    video = find_spec(
        specs_dict,
        exact_keys=["Quay video", "Quay phim", "Video"],
        key_contains=["quay video", "quay phim"],
    )

    water_dust = find_spec(
        specs_dict,
        exact_keys=[
            "Chỉ số kháng nước, bụi",
            "Kháng nước / bụi",
            "Kháng nước, bụi",
            "Tiêu chuẩn kháng nước",
            "Chuẩn kháng nước",
            "Khả năng kháng nước",
        ],
        key_contains=[
            "chỉ số kháng nước",
            "kháng nước",
            "kháng bụi",
            "chuẩn ip",
            "chỉ số ip",
        ],
    )

    # Chỉ tìm IP trong specs_dict, không tìm trong mô tả bên dưới
    if not water_dust:
        for k, v in specs_dict.items():
            text = clean_text(v)
            if not text:
                continue
            if re.search(r"\bIP\d{2}\b", text, re.IGNORECASE) or "kháng nước" in text.lower():
                water_dust = text
                break

    weight = find_spec(
        specs_dict,
        exact_keys=["Trọng lượng"],
        key_contains=["trọng lượng"],
    ) or find_value_by_regex(
        specs_dict,
        r"\b\d{2,3}\s?g\b",
        prefer_key_contains=["trọng lượng", "kích thước"]
    )

    fast_charge = get_fast_charge(specs_dict)

    return {
        "RAM": ram,
        "Bộ nhớ trong": storage,
        "Kích thước màn hình": screen_size,
        "Tấm nền": panel,
        "Tần số quét": refresh_rate,
        "Độ phân giải": resolution,
        "Dung lượng pin": battery,
        "Chip xử lý": chipset,
        "Hệ điều hành": os_name,
        "Camera trước": front_camera,
        "Camera sau": rear_camera,
        "Quay video": video,
        "Sạc nhanh": fast_charge,
        "Kháng nước / bụi": water_dust,
        "Trọng lượng": weight,
    }


# ===== SUY LUẬN HÃNG / HỆ ĐIỀU HÀNH =====
def get_brand(name):
    if not name:
        return None

    brand_map = {
        "iphone": "Apple",
        "apple": "Apple",
        "samsung": "Samsung",
        "xiaomi": "Xiaomi",
        "redmi": "Xiaomi",
        "poco": "Xiaomi",
        "oppo": "OPPO",
        "vivo": "Vivo",
        "realme": "Realme",
        "nokia": "Nokia",
        "huawei": "Huawei",
        "honor": "Honor",
        "nothing": "Nothing",
        "infinix": "Infinix",
        "tecno": "Tecno",
        "meizu": "Meizu",
        "bphone": "Bkav",
        "nubia": "Nubia",
        "asus": "ASUS",
        "rog": "ASUS",
        "motorola": "Motorola",
        "itel": "itel",
        "tcl": "TCL",
        "sony": "Sony",
        "oneplus": "OnePlus",
        "zte": "ZTE",
        "masstel": "Masstel",
    }

    lower_name = name.lower()

    for key, brand in brand_map.items():
        if key in lower_name:
            return brand

    return name.split()[0].capitalize()


def infer_os(name, brand, os_from_specs):
    if os_from_specs:
        return os_from_specs

    if brand == "Apple":
        return "iOS"

    android_brands = {
        "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Nokia",
        "Huawei", "Honor", "Nothing", "Infinix", "Tecno", "Meizu",
        "Nubia", "ASUS", "Motorola", "OnePlus", "ZTE", "itel", "TCL"
    }

    if brand in android_brands:
        return "Android"

    return None


# ===== KHUYẾN MÃI =====
def clean_voucher_card_text(text):
    """
    Làm sạch text trong card voucher đỏ.
    Ví dụ raw:
    Giảm 5%
    Voucher 5%
    Tối đa 1 triệu cho sản phẩm có hiển thị voucher
    Thu thập
    Xem thể lệ

    Output:
    Giảm 5% Voucher 5% Tối đa 1 triệu cho sản phẩm có hiển thị voucher
    """
    if text is None:
        return None

    lines = []

    for line in str(text).replace("\xa0", " ").splitlines():
        line = re.sub(r"\s+", " ", line).strip()

        if not line:
            continue

        noise_words = [
            "Thu thập",
            "Xem thể lệ",
            "Xem chi tiết",
            "Đóng",
            "Ưu đãi & voucher",
            "Xem tất cả voucher",
        ]

        for word in noise_words:
            line = line.replace(word, "")

        line = re.sub(r"\s+", " ", line).strip()

        if line:
            lines.append(line)

    if not lines:
        return None

    return clean_text(" ".join(lines))


def get_product_promo_box():
    """
    Tìm đúng box 'Khuyến mãi đi kèm'.
    Trả về DOM element của box đó.
    Không lấy box 'Ưu đãi thanh toán'.
    """
    try:
        box = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' &&
                       s.visibility !== 'hidden' &&
                       r.width > 0 &&
                       r.height > 0;
            }

            const headings = [...document.querySelectorAll('div, section, article, aside, h2, h3, p, span')]
                .filter(visible)
                .filter(el => {
                    const text = (el.innerText || '').trim();
                    return text.includes('Khuyến mãi đi kèm') && text.length < 150;
                });

            for (const heading of headings) {
                let box = heading;

                for (let i = 0; i < 8 && box; i++) {
                    const text = (box.innerText || '').trim();
                    const lower = text.toLowerCase();

                    if (
                        lower.includes('khuyến mãi đi kèm') &&
                        !lower.includes('ưu đãi thanh toán') &&
                        text.length > 50 &&
                        text.length < 4000
                    ) {
                        return box;
                    }

                    box = box.parentElement;
                }
            }

            return null;
        """)

        return box

    except:
        return None


def open_product_voucher_modal():
    """
    Click nút 'Xem tất cả voucher' nằm đúng trong box 'Khuyến mãi đi kèm'.
    Nếu không mở được popup thì hàm trả False.
    """
    try:
        clicked = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' &&
                       s.visibility !== 'hidden' &&
                       r.width > 0 &&
                       r.height > 0;
            }

            const headings = [...document.querySelectorAll('div, section, article, aside, h2, h3, p, span')]
                .filter(visible)
                .filter(el => {
                    const text = (el.innerText || '').trim();
                    return text.includes('Khuyến mãi đi kèm') && text.length < 150;
                });

            for (const heading of headings) {
                heading.scrollIntoView({block: 'center'});

                let box = heading;

                for (let i = 0; i < 8 && box; i++) {
                    const text = (box.innerText || '').trim();
                    const lower = text.toLowerCase();

                    const isPromotionBox =
                        lower.includes('khuyến mãi đi kèm') &&
                        lower.includes('xem tất cả voucher') &&
                        !lower.includes('ưu đãi thanh toán');

                    if (isPromotionBox) {
                        const buttons = [...box.querySelectorAll('a, button, div, span')]
                            .filter(visible)
                            .filter(el => {
                                const t = (el.innerText || '').trim();
                                return t.includes('Xem tất cả voucher');
                            });

                        if (buttons.length > 0) {
                            buttons[0].scrollIntoView({block: 'center'});
                            buttons[0].click();
                            return true;
                        }
                    }

                    box = box.parentElement;
                }
            }

            return false;
        """)

        if not clicked:
            return False

        time.sleep(1.2)
        return True

    except:
        return False


def close_voucher_modal():
    """
    Đóng popup voucher nếu đang mở.
    """
    try:
        buttons = driver.find_elements(
            By.XPATH,
            "//*[normalize-space()='×' or normalize-space()='x' or normalize-space()='X' or @aria-label='Close' or @aria-label='Đóng']"
        )

        for btn in buttons:
            if btn.is_displayed():
                driver.execute_script("arguments[0].click();", btn)
                time.sleep(0.5)
                return

    except:
        pass

    try:
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        time.sleep(0.5)
    except:
        pass


def get_voucher_cards_from_modal():
    """
    Lấy voucher card trong popup.
    Dấu hiệu card voucher thật:
    - Có 'Thu thập'
    - Có 'Xem thể lệ'
    - Có 'Voucher' hoặc 'Giảm'
    """
    try:
        raw_cards = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' &&
                       s.visibility !== 'hidden' &&
                       r.width > 0 &&
                       r.height > 0;
            }

            const modalCandidates = [...document.querySelectorAll('[role="dialog"], .modal, .modal-content, div[class*="modal"], div[class*="popup"], div')]
                .filter(visible)
                .filter(el => {
                    const text = (el.innerText || '').trim();
                    const lower = text.toLowerCase();

                    return text.length > 20 &&
                           text.length < 4000 &&
                           lower.includes('ưu đãi') &&
                           lower.includes('voucher');
                });

            if (modalCandidates.length === 0) {
                return [];
            }

            modalCandidates.sort((a, b) => {
                const ta = (a.innerText || '').trim().length;
                const tb = (b.innerText || '').trim().length;
                return ta - tb;
            });

            const scope = modalCandidates[0];

            const nodes = [...scope.querySelectorAll('div, section, article, li')]
                .filter(visible);

            let cards = nodes.filter(el => {
                const text = (el.innerText || '').trim();
                const lower = text.toLowerCase();

                return text.length >= 20 &&
                       text.length <= 700 &&
                       lower.includes('thu thập') &&
                       lower.includes('xem thể lệ') &&
                       (
                            lower.includes('voucher') ||
                            lower.includes('giảm')
                       );
            });

            // Loại container cha nếu bên trong có card con nhỏ hơn
            cards = cards.filter(el => {
                const text = (el.innerText || '').trim();

                const hasChildCard = [...el.children].some(child => {
                    if (!visible(child)) return false;

                    const childText = (child.innerText || '').trim();
                    const lower = childText.toLowerCase();

                    return childText.length >= 20 &&
                           childText.length < text.length &&
                           lower.includes('thu thập') &&
                           lower.includes('xem thể lệ') &&
                           (
                                lower.includes('voucher') ||
                                lower.includes('giảm')
                           );
                });

                return !hasChildCard;
            });

            return cards.map(el => el.innerText);
        """)

        return raw_cards or []

    except:
        return []


def get_voucher_cards_from_promo_box():
    """
    Fallback: nếu popup không lấy được, lấy trực tiếp các card voucher đỏ
    đang hiện sẵn trong box 'Khuyến mãi đi kèm'.

    Vẫn không lấy các dòng khuyến mãi bên dưới vì chỉ lấy card có:
    Thu thập + Xem thể lệ + Voucher/Giảm.
    """
    try:
        raw_cards = driver.execute_script("""
            function visible(el) {
                const s = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return s.display !== 'none' &&
                       s.visibility !== 'hidden' &&
                       r.width > 0 &&
                       r.height > 0;
            }

            const headings = [...document.querySelectorAll('div, section, article, aside, h2, h3, p, span')]
                .filter(visible)
                .filter(el => {
                    const text = (el.innerText || '').trim();
                    return text.includes('Khuyến mãi đi kèm') && text.length < 150;
                });

            let promoBox = null;

            for (const heading of headings) {
                let box = heading;

                for (let i = 0; i < 8 && box; i++) {
                    const text = (box.innerText || '').trim();
                    const lower = text.toLowerCase();

                    if (
                        lower.includes('khuyến mãi đi kèm') &&
                        !lower.includes('ưu đãi thanh toán') &&
                        text.length > 50 &&
                        text.length < 4000
                    ) {
                        promoBox = box;
                        break;
                    }

                    box = box.parentElement;
                }

                if (promoBox) break;
            }

            if (!promoBox) {
                return [];
            }

            const nodes = [...promoBox.querySelectorAll('div, section, article, li')]
                .filter(visible);

            let cards = nodes.filter(el => {
                const text = (el.innerText || '').trim();
                const lower = text.toLowerCase();

                return text.length >= 20 &&
                       text.length <= 700 &&
                       lower.includes('thu thập') &&
                       lower.includes('xem thể lệ') &&
                       (
                            lower.includes('voucher') ||
                            lower.includes('giảm')
                       );
            });

            cards = cards.filter(el => {
                const text = (el.innerText || '').trim();

                const hasChildCard = [...el.children].some(child => {
                    if (!visible(child)) return false;

                    const childText = (child.innerText || '').trim();
                    const lower = childText.toLowerCase();

                    return childText.length >= 20 &&
                           childText.length < text.length &&
                           lower.includes('thu thập') &&
                           lower.includes('xem thể lệ') &&
                           (
                                lower.includes('voucher') ||
                                lower.includes('giảm')
                           );
                });

                return !hasChildCard;
            });

            return cards.map(el => el.innerText);
        """)

        return raw_cards or []

    except:
        return []

def remove_substring_duplicates(lines):
    """
    Xóa các dòng voucher bị lặp kiểu:
    - Giữ dòng đầy đủ dài hơn
    - Bỏ dòng ngắn nếu nó đã nằm trong dòng dài hơn

    Ví dụ:
    Giữ:
    'Giảm 5% Voucher 5% Tối đa 1 triệu...'

    Bỏ:
    'Voucher 5% Tối đa 1 triệu...'
    """
    cleaned = []

    for line in lines:
        if not line:
            continue

        line_norm = line.lower().strip()
        is_substring = False

        for other in lines:
            if line == other:
                continue

            other_norm = other.lower().strip()

            if line_norm in other_norm and len(line_norm) < len(other_norm):
                is_substring = True
                break

        if not is_substring:
            cleaned.append(line)

    return list(dict.fromkeys(cleaned))

def get_voucher_modal_lines():
    """
    Logic cuối:
    1. Cố mở popup 'Xem tất cả voucher' trong đúng box 'Khuyến mãi đi kèm'
    2. Cào các voucher card thật trong popup
    3. Nếu popup không lấy được, fallback lấy voucher card đỏ đang hiện trong box
    """
    raw_cards = []

    opened = open_product_voucher_modal()

    if opened:
        raw_cards = get_voucher_cards_from_modal()
        close_voucher_modal()

    if not raw_cards:
        raw_cards = get_voucher_cards_from_promo_box()

    voucher_lines = []

    for raw in raw_cards:
        text = clean_voucher_card_text(raw)

        if not text:
            continue

        lower_text = text.lower()

        # Chặn ưu đãi thanh toán nếu lỡ lọt vào
        payment_blacklist = [
            "ưu đãi thanh toán",
            "thanh toán",
            "ngân hàng",
            "thẻ tín dụng",
            "mở thẻ",
            "e-voucher",
            "vib",
            "ocb",
            "hsbc",
            "nam á",
            "shopeepay",
            "spaylater",
            "momo",
            "zalopay",
            "vnpay",
            "tpbank",
        ]

        if any(bad in lower_text for bad in payment_blacklist):
            continue

        if "voucher" not in lower_text and "giảm" not in lower_text:
            continue

        voucher_lines.append(text)

    voucher_lines = remove_substring_duplicates(voucher_lines)

    return voucher_lines


def get_smember_promotion_lines():
    """
    Lấy ưu đãi Smember ở khu vực trên giá.
    Ví dụ:
    - Tiết kiệm lên đến 115.000đ cho Smember
    - Giảm thêm 100.000đ cho Smember
    - Voucher 10% cho Smember
    """
    try:
        body_text = driver.find_element(By.TAG_NAME, "body").text
    except:
        return []

    patterns = [
        r"Tiết kiệm\s+lên\s+đến\s+\d[\d\.]*\s?đ\s+cho\s+Smember",
        r"Giảm\s+(?:thêm\s+)?\d[\d\.]*\s?đ\s+cho\s+Smember",
        r"Voucher\s+\d{1,3}%\s+cho\s+Smember",
    ]

    lines = []

    for pattern in patterns:
        matches = re.findall(pattern, body_text, flags=re.IGNORECASE)

        for match in matches:
            line = clean_text(match)

            if line:
                lines.append(line)

    lines = list(dict.fromkeys(lines))

    return lines


def get_discount_promotions():
    promo_lines = []

    # 1. Lấy Smember phía trên giá
    promo_lines.extend(get_smember_promotion_lines())

    # 2. Lấy voucher card đỏ trong popup hoặc trong box Khuyến mãi đi kèm
    promo_lines.extend(get_voucher_modal_lines())

    promo_lines = list(dict.fromkeys([line for line in promo_lines if line]))

    if not promo_lines:
        return None

    return " | ".join(promo_lines)

# ===== LOOP CÀO DATA =====
new_success_count = 0

try:
    for i, url in enumerate(urls, start=1):
        if url in done_urls:
            print(f"[{i}/{len(urls)}] Bỏ qua vì đã cào: {url}")
            continue

        if url in skipped_urls:
            print(f"[{i}/{len(urls)}] Bỏ qua vì đã biết không có giá: {url}")
            continue

        print(f"\n[{i}/{len(urls)}] Đang cào: {url}")

        try:
            if not safe_get(url, retries=2):
                print("   -> Bỏ qua tạm thời: trang load quá lâu. Lần sau chạy lại sẽ thử tiếp.")
                add_failed(url, reason="Timeout khi load trang")
                save_failed()
                continue

            time.sleep(1.5)

            name = get_name()

            if is_contact_price_product():
                print("   -> Bỏ qua: sản phẩm Liên hệ để báo giá.")
                add_skipped(url, name=name, reason="Liên hệ để báo giá")
                save_skipped()
                continue

            price = get_price()

            if not price:
                print("   -> Bỏ qua: không tìm thấy giá bán.")
                add_skipped(url, name=name, reason="Không tìm thấy giá bán")
                save_skipped()
                continue

            specs_dict = get_specs()

            if DEBUG_SPECS:
                print("===== KEYS THÔNG SỐ CÀO ĐƯỢC =====")
                for k, v in specs_dict.items():
                    print(k, "=>", v)
                print("===================================")

            parsed = parse_specs(specs_dict, name=name)

            close_specs_modal()

            brand = get_brand(name)
            os_name = infer_os(name, brand, parsed["Hệ điều hành"])
            discount_promo = get_discount_promotions()

            row = {
                "Tên sản phẩm": name,
                "Giá bán": price,
                "RAM": parsed["RAM"],
                "Bộ nhớ trong": parsed["Bộ nhớ trong"],
                "Kích thước màn hình": parsed["Kích thước màn hình"],
                "Tấm nền": parsed["Tấm nền"],
                "Tần số quét": parsed["Tần số quét"],
                "Độ phân giải": parsed["Độ phân giải"],
                "Dung lượng pin": parsed["Dung lượng pin"],
                "Chip xử lý": parsed["Chip xử lý"],
                "Hãng sản xuất": brand,
                "Hệ điều hành": os_name,
                "Camera trước": parsed["Camera trước"],
                "Camera sau": parsed["Camera sau"],
                "Quay video": parsed["Quay video"],
                "Sạc nhanh": parsed["Sạc nhanh"],
                "Kháng nước / bụi": parsed["Kháng nước / bụi"],
                "Trọng lượng": parsed["Trọng lượng"],
                "Khuyến mãi giảm giá": discount_promo,
                "URL": url,
            }

            data.append(row)
            done_urls.add(url)
            new_success_count += 1

            print(f"   -> Thành công: {name}")

            if new_success_count % SAVE_EVERY == 0:
                save_data()
                save_skipped()
                save_failed()

        except KeyboardInterrupt:
            print("\n--- Bạn đã dừng chương trình. Đang lưu dữ liệu hiện tại... ---")
            break

        except Exception as e:
            print(f"   -> Lỗi tại {url}: {e}")
            add_failed(url, name=None, reason=str(e)[:300])
            save_failed()

            try:
                close_specs_modal()
            except:
                pass

            continue

finally:
    save_data()
    save_skipped()
    save_failed()

    driver.quit()

    print("\n--- Hoàn tất ---")
    print(f"Sản phẩm cào thành công trong lần chạy này: {new_success_count}")
    print(f"File dữ liệu: {FILE_OUTPUT}")
    print(f"File sản phẩm bỏ qua do không có giá: {FILE_SKIPPED}")
    print(f"File URL lỗi tạm thời: {FILE_FAILED}")