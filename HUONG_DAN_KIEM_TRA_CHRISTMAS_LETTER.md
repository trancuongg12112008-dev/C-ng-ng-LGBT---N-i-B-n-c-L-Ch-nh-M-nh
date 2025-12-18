# 🎄 HƯỚNG DẪN KIỂM TRA CHRISTMAS LETTER

## 🔍 Vấn Đề: Không thấy thư được lưu vào Google Docs

### 📋 Các Bước Kiểm Tra:

## 1. ✅ Kiểm Tra Google Apps Script

### Bước 1: Mở Google Apps Script
- Truy cập: https://script.google.com
- Mở project Apps Script của bạn

### Bước 2: Kiểm Tra Code
- Đảm bảo code có function `createChristmasDoc(data)`
- Đảm bảo trong `doPost(e)` có xử lý `addChristmasLetter`

### Bước 3: Deploy Lại
1. Click **Deploy** > **New deployment**
2. Chọn type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy URL mới (nếu có)

## 2. 🧪 Test Kết Nối

### Cách 1: Sử dụng File Test
1. Mở file `test-letter-connection.html`
2. Click "🎄 Test Christmas Letter"
3. Kiểm tra Google Drive folder

### Cách 2: Test Trực Tiếp Trong Apps Script
1. Trong Apps Script, chạy function `testCreateDoc()`
2. Kiểm tra Logs để xem kết quả
3. Kiểm tra Google Drive folder

## 3. 📁 Kiểm Tra Google Drive

### Folder ID Hiện Tại:
```
1vowVFFSvkvisssh1b3Yz7u5koYU8swUt
```

### Kiểm Tra:
1. Truy cập Google Drive
2. Tìm folder "Christmas Letters 2025"
3. Xem có documents mới không

## 4. 🔧 Khắc Phục Sự Cố

### Nếu không thấy documents:

#### A. Kiểm Tra Permissions
- Apps Script cần quyền truy cập Google Drive
- Apps Script cần quyền tạo Google Docs

#### B. Kiểm Tra Folder ID
- Đảm bảo folder ID đúng
- Folder phải tồn tại và có quyền truy cập

#### C. Kiểm Tra URL Deployment
- URL hiện tại: `https://script.google.com/macros/s/AKfycbz8sLYj9AyduSo5LeMISLUEHOiD2X2Yhnnn3YBeMNiJ8cgq1Z-HBZ3FxOGC1nQlbkXc/exec`
- Nếu deploy lại, cần cập nhật URL trong `christmas-letter.js`

## 5. 🎯 Code Cần Có Trong Apps Script

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Handle Christmas letters
    if (data.action === 'addChristmasLetter') {
      return createChristmasDoc(data.data);
    }
    
    // Handle game results
    if (data.action === 'addGameResult') {
      return addGameResult(data.data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Invalid action'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 6. 📝 Test Data Mẫu

```javascript
{
  "action": "addChristmasLetter",
  "data": {
    "timestamp": "2024-12-18T10:30:00.000Z",
    "senderName": "Test User",
    "receiverName": "Test Receiver", 
    "message": "Chúc mừng Giáng Sinh!",
    "date": "18/12/2024",
    "time": "17:30:00"
  }
}
```

## 7. 🚀 Các Bước Thực Hiện

1. **Kiểm tra Apps Script có đúng code không**
2. **Deploy lại nếu cần**
3. **Chạy test file để kiểm tra**
4. **Kiểm tra Google Drive folder**
5. **Nếu vẫn không work, kiểm tra console logs**

## 8. 📞 Debug Console

Mở Developer Tools (F12) và xem Console khi gửi thư để xem có lỗi gì không.

---

## ✅ Kết Quả Mong Đợi

Sau khi gửi thư thành công, bạn sẽ thấy:
- Document mới trong Google Drive folder
- Tên file: "Thư Giáng Sinh - [Tên người gửi] gửi [Tên người nhận] - [Ngày]"
- Nội dung được format đẹp với header, footer và lời chúc

## 🎄 Lưu Ý

- Sử dụng `APPS_SCRIPT_FULL_SYSTEM.js` để có cả game và letter functionality
- Đảm bảo folder ID đúng
- Kiểm tra permissions của Apps Script