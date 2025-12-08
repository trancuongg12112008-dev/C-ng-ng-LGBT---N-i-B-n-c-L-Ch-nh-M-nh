# CẬP NHẬT GOOGLE APPS SCRIPT

## Bạn cần cập nhật lại code trong Google Apps Script:

1. Mở Google Sheet của bạn
2. Click **Extensions** → **Apps Script**
3. **Xóa code cũ** và dán code mới này:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.fullname,
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

4. Click **💾 Save**
5. Click **Deploy** → **Manage deployments**
6. Click biểu tượng **✏️ Edit** (bút chì)
7. Chọn **New version**
8. Click **Deploy**

## Cập nhật tiêu đề cột trong Google Sheet:

- **A1**: Thời gian
- **B1**: Họ và Tên
- **C1**: Tuổi
- **D1**: Số Zalo
- **E1**: Vai Trò
- **F1**: Giới Thiệu

Xóa cột "Số Điện Thoại" cũ nếu có.
