# Hướng Dẫn Kết Nối Form Với Google Sheets

## Bước 1: Tạo Google Sheet

1. Truy cập https://sheets.google.com
2. Tạo một bảng tính mới
3. Đặt tên cho bảng (ví dụ: "Đăng Ký Thành Viên LGBT+")
4. Tạo các cột tiêu đề ở hàng đầu tiên:
   - A1: Thời gian
   - B1: Họ và Tên
   - C1: Số Điện Thoại
   - D1: Tuổi
   - E1: Số Zalo
   - F1: Vai Trò
   - G1: Giới Thiệu

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** (Tiện ích mở rộng) → **Apps Script**
2. Xóa code mặc định và dán code sau:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      new Date(),
      data.fullname,
      data.phone,
      data.age,
      data.zaloPhone,
      data.position,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Đăng ký thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (biểu tượng đĩa mềm)
4. Đặt tên project (ví dụ: "Form Đăng Ký")

## Bước 3: Deploy Script

1. Click **Deploy** → **New deployment**
2. Click biểu tượng bánh răng ⚙️ → chọn **Web app**
3. Cấu hình:
   - **Description**: Form Đăng Ký Thành Viên
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** → chọn tài khoản Google của bạn
6. Click **Advanced** → **Go to [tên project] (unsafe)**
7. Click **Allow**
8. **SAO CHÉP URL** được tạo ra (dạng: https://script.google.com/macros/s/...../exec)

## Bước 4: Cập Nhật Website

1. Mở file `script.js`
2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Thay thế `PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE` bằng URL bạn vừa sao chép
4. Lưu file

## Bước 5: Test

1. Mở file `index.html` trên trình duyệt
2. Điền form và gửi
3. Kiểm tra Google Sheet xem dữ liệu đã được thêm chưa

## Lưu Ý

- URL script phải được giữ bí mật
- Nếu cần sửa script, phải deploy lại (Deploy → Manage deployments → Edit → New version)
- Dữ liệu sẽ được thêm vào cuối bảng tính

## Khắc Phục Sự Cố

**Lỗi 403**: Kiểm tra lại quyền truy cập trong Deploy settings
**Không có dữ liệu**: Kiểm tra URL script đã đúng chưa
**CORS Error**: Đảm bảo "Who has access" được set là "Anyone"
