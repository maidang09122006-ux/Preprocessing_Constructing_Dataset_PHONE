import time
from pathlib import Path
import pandas as pd
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# BẮT BUỘC: Import thêm 2 thư viện này để xử lý lỗi gián đoạn của nút Load More
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException 

# ---------------------------------------------------------
# 1. Cấu hình Đường dẫn Output
# ---------------------------------------------------------
project_root = Path.cwd()
output_dir = project_root / "data" / "raw" / "rating"
output_dir.mkdir(parents=True, exist_ok=True)
output_path = output_dir / "phone_ratings.csv"

# ---------------------------------------------------------
# 2. Khởi tạo Edge WebDriver
# ---------------------------------------------------------
edge_options = Options()
edge_options.add_argument("--disable-notifications")
edge_options.add_argument("--disable-geolocation")
edge_options.add_argument("--disable-blink-features=AutomationControlled")
#edge_options.add_argument("--headless")

driver = webdriver.Edge(options=edge_options)
url = "https://www.dxomark.com/smartphones/" 

try:
    print("Đang truy cập trang web...")
    driver.get(url)
    
    # ---------------------------------------------------------
    # 3. XỬ LÝ TẮT POPUP NẾU CÓ (Giữ nguyên code của bạn)
    # ---------------------------------------------------------
    try:
        print("Đang kiểm tra popup...")
        popup_close_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.mfp-close"))
        )
        popup_close_btn.click()
        print("Đã phát hiện và tắt popup thành công!")
        time.sleep(1.5) 
    except Exception:
        print("Không có popup nào hoặc đã tự biến mất, bỏ qua...")

    # ---------------------------------------------------------
    # 4. Vòng lặp nhấn nút "Load more" (ĐÃ FIX)
    # ---------------------------------------------------------
    click_count = 0
    while True:
        try:
            # Đợi và tìm nút nằm trong row-container
            load_more_btn = WebDriverWait(driver, 7).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'row-container')]//button[contains(text(), 'Load more')]"))
            )
            
            if "hidden" in load_more_btn.get_attribute("class"):
                print("Đã tải toàn bộ danh sách thiết bị.")
                break
            
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", load_more_btn)
            time.sleep(0.5)
            driver.execute_script("arguments[0].click();", load_more_btn)
            
            click_count += 1
            print(f"Đang tải thêm dữ liệu... (lần {click_count})")
            time.sleep(2.5) # Chờ dữ liệu mới đổ về
            
        except TimeoutException:
            # Hết 7 giây không thấy nút -> Đã tới đáy bảng
            print("Không tìm thấy nút Load More nữa (Hết danh sách).")
            break
            
        except StaleElementReferenceException:
            # Nút đang bị làm mới DOM, cho phép vòng lặp thử tìm lại
            print("Web đang cập nhật DOM, thử lại...")
            time.sleep(1)
            continue
            
        except Exception as e:
            print(f"Đã dừng bấm nút do lỗi: {e}")
            break

    # ---------------------------------------------------------
    # 5. Trích xuất dữ liệu từ DOM (Đã cập nhật đúng 7 cột)
    # ---------------------------------------------------------
    print("Đang thu thập dữ liệu...")
    names = driver.find_elements(By.XPATH, "//span[@x-text='deviceData.name']")
    scores = driver.find_elements(By.XPATH, "//span[@x-text='scoreValueToDisplay(score, deviceData)']")
    
    data_to_save = []
    
    # Cập nhật lại số lượng cột và vị trí chính xác dựa trên giao diện thực tế
    columns_per_device = 7 # Tổng cộng có 7 cột dùng chung thẻ span này
    camera_offset = 2      # Cột CAMERA nằm ở vị trí số 2 (đếm từ 0)
    display_offset = 5     # Cột DISPLAY nằm ở vị trí số 5 (đếm từ 0)
    
    for i, name_elem in enumerate(names):
        product_name = name_elem.text.strip()
        base_index = i * columns_per_device
        
        try:
            camera_rating = scores[base_index + camera_offset].text.strip()
        except IndexError:
            camera_rating = "N/A"
            
        try:
            display_rating = scores[base_index + display_offset].text.strip()
        except IndexError:
            display_rating = "N/A"
            
        data_to_save.append({
            "product_name": product_name,
            "camera_rating": camera_rating,
            "display_rating": display_rating
        })
    # ---------------------------------------------------------
    # 6. Xuất CSV bằng PANDAS
    # ---------------------------------------------------------
    df = pd.DataFrame(data_to_save)
    df.to_csv(output_path, index=False, encoding="utf-8-sig")
        
    print(f"\nHoàn thành! Đã cào thành công {len(df)} sản phẩm.")
    print(f"File CSV đã được lưu tại: {output_path}")

finally:
    driver.quit()