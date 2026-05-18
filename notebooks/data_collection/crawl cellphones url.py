from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import pandas as pd
import time
import sys
from pathlib import Path

# fix unicode
sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = Path(__file__).resolve().parents[2]
URL_DATA_DIR = PROJECT_ROOT / "data" / "raw" / "url"
URL_DATA_DIR.mkdir(parents=True, exist_ok=True)
FILE_OUTPUT = URL_DATA_DIR / "cellphones_urls.csv"

# options
options = Options()
options.add_argument("--disable-notifications")
options.add_argument("--disable-geolocation")
options.add_argument("--disable-blink-features=AutomationControlled")

driver = webdriver.Edge(options=options)
driver.get("https://cellphones.com.vn/mobile.html")

wait = WebDriverWait(driver, 10)

wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a.product__link")))

print("Đang load toàn bộ sản phẩm...")

while True:
    try:
        # scroll xuống đáy
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1.5)

        prev_count = len(driver.find_elements(By.CSS_SELECTOR, "a.product__link"))

        # tìm nút "Xem thêm"
        show_more_btn = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.button__show-more-product"))
        )

        # click bằng JS (tránh bị chặn)
        driver.execute_script("arguments[0].click();", show_more_btn)
        print(f"Đã bấm Xem thêm... ({prev_count})")

        # đợi load thêm
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "a.product__link")) > prev_count)

    except TimeoutException:
        print("Đã load hết!")
        break

# scroll thêm để load lazy items còn sót
for _ in range(3):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1)

print("Đang lấy link...")

elements = driver.find_elements(By.CSS_SELECTOR, "a.product__link")

print("Total elements:", len(elements))

url_sp = set()

for e in elements:
    try:
        href = WebDriverWait(driver, 5).until(lambda d: e.get_attribute("href"))
        if href:
            url_sp.add(href)
    except:
        pass

print(f"Thu thập được {len(url_sp)} links")

driver.quit()

pd.DataFrame(list(url_sp), columns=["URL"]).to_csv(FILE_OUTPUT, index=False)

print("Đã lưu file CSV!")
