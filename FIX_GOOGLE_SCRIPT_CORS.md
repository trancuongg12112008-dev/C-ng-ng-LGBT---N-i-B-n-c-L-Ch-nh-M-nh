# Sửa Lỗi Google Sheets Không Cập Nhật Trên GitHub Pages

## Vấn đề: CORS (Cross-Origin)

Khi website chạy trên GitHub Pages, Google Apps Script cần được cấu hình để chấp nhận request từ domain khác.

## Giải pháp: Cập nhật Google Apps Script

### Bước 1: Mở Google Apps Script

1. Mở Google Sheet của bạn
2. Click **Extensions** → **Apps Script**

### Bước 2: Thay thế toàn bộ code bằng code mới này:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      new Date(),
      data.fullname,
      data.age,
      data.zaloPhone,
      data.position,
      data.message
    ]);
    
    // Trả về response với CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Đăng ký thành công!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Thêm hàm này để xử lý OPTIONS request (CORS preflight)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({'status': 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Bước 3: Deploy lại

1. Click **💾 Save**
2. Click **Deploy** → **Manage deployments**
3. Click **✏️ Edit**
4. Chọn **New version**
5. Ở phần **Who has access**: Đảm bảo chọn **Anyone** (Quan trọng!)
6. Click **Deploy**
7. Copy URL mới

### Bước 4: Cập nhật URL trong script.js

Nếu URL thay đổi, cập nhật lại trong file `script.js`

---

## Lưu ý quan trọng:

⚠️ **"Who has access" phải là "Anyone"** - Đây là điều kiện bắt buộc để website từ GitHub Pages có thể gửi dữ liệu vào Google Sheets.

## Nếu vẫn không hoạt động:

### Kiểm tra Console (F12):

1. Mở website trên GitHub Pages
2. Nhấn **F12** để mở Developer Tools
3. Vào tab **Console**
4. Điền form và gửi
5. Xem có lỗi gì không, gửi cho tôi

### Thử nghiệm:

1. Mở file `index.html` trực tiếp từ máy tính (không qua GitHub)
2. Nếu hoạt động → Vấn đề là CORS
3. Nếu không hoạt động → Vấn đề là Google Script

---

## Giải pháp thay thế (nếu vẫn không được):

Sử dụng **Google Forms** thay vì Google Apps Script:
1. Tạo Google Form với các câu hỏi giống form website
2. Lấy link Google Form
3. Thêm nút "Đăng ký qua Google Form" vào website

Cách này đơn giản hơn và không có vấn đề CORS!
