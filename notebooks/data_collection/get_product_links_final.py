import pandas as pd
import time
import os
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options

import sys
sys.stdout.reconfigure(encoding='utf-8')

# --- CẤU HÌNH ---
PROJECT_ROOT = Path(__file__).resolve().parents[2]
URL_DATA_DIR = PROJECT_ROOT / "data" / "raw" / "url"
URL_DATA_DIR.mkdir(parents=True, exist_ok=True)

FILE_INPUT = URL_DATA_DIR / "cellphones_urls.csv"
FILE_OUTPUT = URL_DATA_DIR / "url_final.csv"

# 1. ĐỌC DỮ LIỆU ĐẦU VÀO VÀ ĐẦU RA
df_input = pd.read_csv(FILE_INPUT)
tat_ca_urls = df_input.iloc[:, 0].tolist()

# Kiểm tra nếu file output đã tồn tại thì đọc lên để lấy danh sách đã cào
da_cao = set()
if os.path.exists(FILE_OUTPUT):
    df_old = pd.read_csv(FILE_OUTPUT)
    da_cao = set(df_old.iloc[:, 0].tolist())
    print(f"--- Đã tìm thấy file cũ. Sẽ bỏ qua {len(da_cao)} link đã hoàn thành. ---")

# 2. KHỞI TẠO SELENIUM
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")

driver = webdriver.Edge(options=options)
driver.set_page_load_timeout(30)

print(f"Bắt đầu quét từ link thứ {len(da_cao) + 1}...")

# Thiết lập vị trí link trong file urls.csv để bắt đầu cào
START_INDEX = 1

try:
    for index, url in enumerate(tat_ca_urls[START_INDEX - 1:], start=START_INDEX):

        # Nếu link đã cào rồi thì bỏ qua
        if url in da_cao:
            continue

        try:
            print(f"[{index}/{len(tat_ca_urls)}] Đang quét: {url}")

            driver.get(url)
            time.sleep(2)

            # Lấy các phiên bản sản phẩm nhưng bỏ màu sắc
            xpath_variants = """
            //div[contains(@class, 'box-linked') or contains(@class, 'box-product-variants')]
            //a[not(contains(@class, 'button__change-color'))]
            """

            elements = driver.find_elements(By.XPATH, xpath_variants)

            # Thêm link gốc
            da_cao.add(url)

            # Thêm các link phiên bản, trừ màu sắc
            for el in elements:
                href = el.get_attribute("href")
                if href and href.startswith("http"):
                    da_cao.add(href)

        except KeyboardInterrupt:
            print("\n--- Bạn đã bấm dừng chương trình. Đang lưu dữ liệu... ---")
            break

        except Exception as e:
            print(f"   -> Lỗi tại {url}: {e}. Đang bỏ qua...")
            continue

finally:
    driver.quit()

    if len(da_cao) > 0:
        print(f"\n--- Đang lưu tổng cộng {len(da_cao)} link vào {FILE_OUTPUT} ---")
        df_final = pd.DataFrame(list(da_cao), columns=["URL_Final"])
        df_final.to_csv(FILE_OUTPUT, index=False, encoding='utf-8-sig')
        print("--- Lưu file hoàn tất! ---")
    else:
        print("Không có dữ liệu mới để lưu.")
