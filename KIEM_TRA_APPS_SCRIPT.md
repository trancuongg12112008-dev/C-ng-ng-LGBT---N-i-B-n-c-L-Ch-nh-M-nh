# 🔧 KIỂM TRA GOOGLE APPS SCRIPT - BƯỚC BY BƯỚC

## ❗ Vấn Đề: Thư không được lưu vào Google Docs

### 🎯 BƯỚC 1: Kiểm Tra Apps Script Hiện Tại

1. **Mở Google Apps Script:**
   - Truy cập: https://script.google.com
   - Mở project của bạn

2. **Kiểm tra function doPost:**
   ```javascript
   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       
       // PHẢI CÓ DÒNG NÀY:
       if (data.action === 'addChristmasLetter') {
         return createChristmasDoc(data.data);
       }
       
       // Game function
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

3. **Kiểm tra function createChristmasDoc:**
   - Phải có function này trong code
   - Folder ID phải đúng: `1vowVFFSvkvisssh1b3Yz7u5koYU8swUt`

### 🎯 BƯỚC 2: Test Trực Tiếp Trong Apps Script

1. **Thêm function test này vào Apps Script:**
   ```javascript
   function testChristmasLetterDirect() {
     const testData = {
       timestamp: new Date().toISOString(),
       senderName: 'Direct Test - ' + Date.now(),
       receiverName: 'Test Receiver',
       message: 'Test message từ Apps Script trực tiếp. Chúc mừng Giáng Sinh! 🎄',
       date: new Date().toLocaleDateString('vi-VN'),
       time: new Date().toLocaleTimeString('vi-VN')
     };
     
     console.log('Testing with data:', testData);
     
     try {
       const result = createChristmasDoc(testData);
       console.log('Result:', result.getContent());
       return result;
     } catch (error) {
       console.error('Error:', error);
       return error;
     }
   }
   ```

2. **Chạy function test:**
   - Click vào function `testChristmasLetterDirect`
   - Click **Run**
   - Xem kết quả trong **Execution transcript**

### 🎯 BƯỚC 3: Kiểm Tra Permissions

1. **Khi chạy test, Apps Script sẽ hỏi permissions:**
   - Allow access to Google Drive
   - Allow access to Google Docs
   - Click **Allow** cho tất cả

2. **Nếu không hỏi permissions:**
   - Có thể đã có permissions rồi
   - Hoặc có lỗi trong code

### 🎯 BƯỚC 4: Kiểm Tra Folder

1. **Kiểm tra Folder ID:**
   - Mở Google Drive
   - Tìm folder "Christmas Letters 2025"
   - URL sẽ có dạng: `https://drive.google.com/drive/folders/1vowVFFSvkvisssh1b3Yz7u5koYU8swUt`
   - ID phải khớp với code

2. **Nếu không tìm thấy folder:**
   - Tạo folder mới
   - Copy ID từ URL
   - Cập nhật trong Apps Script

### 🎯 BƯỚC 5: Deploy Lại

1. **Deploy as Web App:**
   - Click **Deploy** > **New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**

2. **Copy URL mới:**
   - Nếu URL thay đổi, cần cập nhật trong `christmas-letter.js`

### 🎯 BƯỚC 6: Test Từ Website

1. **Mở `test-letter-connection.html`**
2. **Click "Test Christmas Letter"**
3. **Kiểm tra Console (F12)**
4. **Kiểm tra Google Drive**

---

## 🚨 CÁC LỖI THƯỜNG GẶP:

### Lỗi 1: Function không tồn tại
```
ReferenceError: createChristmasDoc is not defined
```
**Giải pháp:** Thêm function `createChristmasDoc` vào Apps Script

### Lỗi 2: Folder không tồn tại
```
Exception: Folder not found
```
**Giải pháp:** Kiểm tra Folder ID, tạo folder mới nếu cần

### Lỗi 3: Không có permissions
```
Exception: You do not have permission to call DriveApp.getFolderById
```
**Giải pháp:** Chạy function test để trigger permission request

### Lỗi 4: URL không đúng
```
Network error hoặc không có response
```
**Giải pháp:** Kiểm tra URL deployment, deploy lại nếu cần

---

## ✅ KẾT QUẢ MONG ĐỢI:

Sau khi test thành công:
1. **Execution transcript** hiển thị success
2. **Google Drive** có document mới
3. **Website test** không có lỗi trong console

## 📞 NEXT STEPS:

1. Chạy test trực tiếp trong Apps Script trước
2. Nếu thành công → kiểm tra website
3. Nếu thất bại → fix lỗi trong Apps Script
4. Deploy lại và test website