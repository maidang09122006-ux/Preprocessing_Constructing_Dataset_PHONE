import pandas as pd
import time
import os
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 1. Khai báo 1 User-Agent duy nhất ở đây cho dễ quản lý
MY_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"

def scrape_single_page(url):
    """Mở trình duyệt -> Vào link -> Lấy dữ liệu -> Đóng trình duyệt"""
    print(f"\n🚀 Đang khởi động trình duyệt cho: {url}")
    
    edge_options = Options()
    edge_options.add_argument("--no-sandbox")
    edge_options.add_argument("--headless")
    edge_options.add_argument("--disable-dev-shm-usage")
    edge_options.add_argument(f"user-agent={MY_USER_AGENT}") # Sử dụng User-Agent duy nhất
    edge_options.add_argument("--log-level=3")
    edge_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-automation"])
    edge_options.add_experimental_option('useAutomationExtension', False)
    edge_options.add_argument("--disable-blink-features=AutomationControlled")

    driver = webdriver.Edge(options=edge_options)
    
    
    page_data = []

    try:
        driver.get(url)
        
        # Chờ load bảng dữ liệu (tối đa 15 giây)
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "table tbody tr"))
        )
        
        rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
        print(f"-> Đã lấy thành công {len(rows)} SoC từ trang này.")
        
        for row in rows:
            try:
                name_element = row.find_element(By.CSS_SELECTOR, "td > div > a")
                processor_name = name_element.text.strip()
                
                try:
                    brand_element = row.find_element(By.CSS_SELECTOR, "td > span.text-gray-small")
                    brand_name = brand_element.text.strip()
                except:
                    brand_name = "Unknown"

                score_element = row.find_element(By.CSS_SELECTOR, "td div.table-list-score-box")
                rating_score = score_element.text.strip()
                
                page_data.append({
                    "brand": brand_name,
                    "processor": processor_name,
                    "rating": int(rating_score)
                })
            except Exception:
                continue

    except Exception as e:
        print(f"Có lỗi xảy ra tại {url}: {e}")
    finally:
        print("Đang đóng trình duyệt này...")
        driver.quit() # Đảm bảo trình duyệt luôn được đóng lại
        
    return page_data

def main():
    urls = [
        "https://nanoreview.net/en/soc-list/rating",
        "https://nanoreview.net/en/soc-list/rating?page=2"
    ]
    
    all_soc_data = []

    # Vòng lặp duyệt qua đúng 2 đường link
    for index, url in enumerate(urls):
        # Lấy dữ liệu từ từng trang
        data_from_page = scrape_single_page(url)
        all_soc_data.extend(data_from_page)
        
        # Dừng 3 giây trước khi mở lại trình duyệt cho link thứ 2
        if index < len(urls) - 1:
            print("\n Tạm nghỉ 3 giây trước khi mở trang tiếp theo...")
            time.sleep(3)

# Lưu file CSV
    if all_soc_data:
        df = pd.DataFrame(all_soc_data)
    
        # Lấy đường dẫn của chính file script này: D:\...\notebooks\data_collection\crawl_processors.py
        current_file = Path(__file__).resolve()
    
        # Đi ngược lên 3 cấp để tới thư mục gốc (cellphones_scraping)
        project_root = current_file.parents[2]
    
        # Định nghĩa đường dẫn tương đối từ thư mục gốc
        output_path = project_root / "data" / "raw" / "processor" / "processors_ratings.csv"
    
        # Tự động tạo các thư mục cha nếu chưa có
        output_path.parent.mkdir(parents=True, exist_ok=True)
    
        # Lưu DataFrame
        df.to_csv(output_path, index=False, encoding='utf-8-sig')
    
        print(f"\nHOÀN TẤT! Đã lưu tổng cộng {len(all_soc_data)} bộ vi xử lý.")
        print(f"Đường dẫn file: {output_path}")
    else:
        print("Không có dữ liệu nào được trích xuất.")

if __name__ == "__main__":
    main()