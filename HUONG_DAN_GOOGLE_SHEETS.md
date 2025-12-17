# 📊 Hướng Dẫn Lưu Kết Quả Vào Google Sheets

## 🎯 Tổng Quan
Hệ thống này sẽ tự động lưu kết quả người chơi vào Google Sheets thông qua Google Apps Script.

---

## 📝 BƯỚC 1: Tạo Google Sheets

### 1.1. Tạo Spreadsheet Mới
1. Truy cập https://sheets.google.com
2. Click "Blank" để tạo sheet mới
3. Đặt tên: "Kết Quả Trò Chơi Giáng Sinh"

### 1.2. Tạo Header Row
Trong dòng đầu tiên (row 1), nhập các tiêu đề sau:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Thời gian | Tên người chơi | Điểm | Thời gian hoàn thành | Số lượt | Số cặp | Ngày chơi | Thiết bị | Trạng thái |

---

## ⚙️ BƯỚC 2: Tạo Google Apps Script

### 2.1. Mở Script Editor
1. Trong Google Sheets, click **Extensions** → **Apps Script**
2. Xóa code mặc định
3. Copy và paste code sau:

```javascript
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
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

function addGameResult(data) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare row data
    const rowData = [
      data.timestamp,
      data.playerName,
      data.score,
      data.completionTime,
      data.moves,
      data.matches,
      data.playDate,
      data.device,
      data.gameStatus
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function testAddGameResult() {
  const testData = {
    timestamp: new Date().toISOString(),
    playerName: 'Test Player',
    score: 25,
    completionTime: '00:35',
    moves: 20,
    matches: 8,
    playDate: new Date().toLocaleDateString('vi-VN'),
    device: 'Desktop',
    gameStatus: 'Hoàn thành'
  };
  
  const result = addGameResult(testData);
  Logger.log(result.getContent());
}
```

### 2.2. Lưu Script
1. Click icon **💾 Save** hoặc nhấn `Ctrl+S`
2. Đặt tên project: "Christmas Game Results"

### 2.3. Deploy Web App
1. Click **Deploy** → **New deployment**
2. Click icon ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: "Christmas Game API"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Chọn tài khoản Google của bạn
8. Click **Advanced** → **Go to [Project name] (unsafe)**
9. Click **Allow**
10. **Copy Web App URL** (dạng: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

---

## 🔧 BƯỚC 3: Cập Nhật Code Game

### 3.1. Mở file `christmas-card-game.js`

### 3.2. Tìm function `submitToGoogleSheets`

### 3.3. Thay đổi URL:

```javascript
// Thay YOUR_SCRIPT_ID bằng Script ID thực tế
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

**Ví dụ:**
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxx...xxx/exec';
```

---

## 🧪 BƯỚC 4: Test Hệ Thống

### 4.1. Test trong Apps Script
1. Trong Apps Script Editor, chọn function `testAddGameResult`
2. Click **Run** (▶️)
3. Kiểm tra Google Sheets xem có dữ liệu test không

### 4.2. Test từ Game
1. Mở `christmas-card-game.html` trong browser
2. Chơi và hoàn thành game
3. Nhập tên khi được prompt
4. Kiểm tra:
   - Console (F12) có log "✅ Kết quả đã được lưu"
   - Google Sheets có dữ liệu mới
   - Notification "✅ Đã lưu vào bảng xếp hạng!" xuất hiện

---

## 📊 BƯỚC 5: Tạo Bảng Xếp Hạng

### 5.1. Tạo Sheet Mới
1. Click dấu **+** ở dưới cùng
2. Đặt tên: "Bảng Xếp Hạng"

### 5.2. Sắp Xếp Theo Điểm
Trong cell A1, nhập formula:
```
=SORT(Sheet1!A2:I, 3, FALSE)
```

### 5.3. Top 10 Players
Trong cell A1, nhập formula:
```
=QUERY(SORT(Sheet1!A2:I, 3, FALSE), "SELECT * LIMIT 10")
```

---

## 🎨 BƯỚC 6: Format Đẹp

### 6.1. Format Header
1. Select row 1
2. **Bold** text
3. Background color: Xanh lá nhạt
4. Text color: Trắng
5. Center align

### 6.2. Conditional Formatting
1. Select cột điểm (column C)
2. **Format** → **Conditional formatting**
3. Format rules:
   - Điểm >= 25: Màu xanh lá
   - Điểm 15-24: Màu vàng
   - Điểm < 15: Màu đỏ

### 6.3. Freeze Header
1. Select row 1
2. **View** → **Freeze** → **1 row**

---

## 🔒 BẢO MẬT

### Quan trọng:
- ✅ Web App URL có thể public (an toàn)
- ❌ KHÔNG share link edit của Google Sheets
- ✅ Chỉ share link view nếu muốn public bảng xếp hạng

### Để Share Bảng Xếp Hạng:
1. Click **Share** ở góc trên
2. Change to "Anyone with the link"
3. Set permission to "Viewer"
4. Copy link và share

---

## 🐛 TROUBLESHOOTING

### Vấn đề 1: "Authorization required"
**Giải pháp:**
- Chạy lại Deploy process
- Đảm bảo đã click "Allow" tất cả permissions

### Vấn đề 2: Không thấy dữ liệu trong Sheets
**Giải pháp:**
- Kiểm tra Web App URL có đúng không
- Mở Console (F12) xem có lỗi gì
- Test function `testAddGameResult` trong Apps Script

### Vấn đề 3: CORS Error
**Giải pháp:**
- Đảm bảo "Who has access" = "Anyone"
- Redeploy Web App
- Clear browser cache

### Vấn đề 4: Dữ liệu bị sai
**Giải pháp:**
- Kiểm tra thứ tự columns trong header
- Kiểm tra thứ tự data trong `rowData` array

---

## 📱 TÍNH NĂNG

### Dữ Liệu Được Lưu:
- ✅ **Thời gian**: Timestamp chính xác
- ✅ **Tên người chơi**: Từ prompt hoặc localStorage
- ✅ **Điểm số**: Tính toán tự động
- ✅ **Thời gian hoàn thành**: MM:SS format
- ✅ **Số lượt chơi**: Moves counter
- ✅ **Số cặp ghép**: Matches counter
- ✅ **Ngày chơi**: DD/MM/YYYY format
- ✅ **Thiết bị**: Mobile/Desktop detection
- ✅ **Trạng thái**: Hoàn thành/Hết giờ

### User Experience:
- 🎯 Prompt tên lần đầu chơi
- 💾 Lưu tên vào localStorage
- 🔔 Notification khi lưu thành công
- 📊 Tự động gửi dữ liệu sau mỗi game

---

## ✅ CHECKLIST

- [ ] Đã tạo Google Sheets với header đúng
- [ ] Đã tạo Apps Script với code đầy đủ
- [ ] Đã Deploy Web App và lấy URL
- [ ] Đã cập nhật URL trong `christmas-card-game.js`
- [ ] Đã test function trong Apps Script
- [ ] Đã test từ game và thấy dữ liệu trong Sheets
- [ ] Đã tạo bảng xếp hạng (optional)
- [ ] Đã format đẹp (optional)

---

## 🎉 HOÀN THÀNH!

Bây giờ mỗi khi người chơi hoàn thành game:
1. ✅ Prompt nhập tên
2. ✅ Tự động lưu kết quả vào Google Sheets
3. ✅ Hiển thị notification xác nhận
4. ✅ Lưu tên cho lần chơi tiếp theo

**Dữ liệu được lưu real-time và có thể xem/phân tích bất cứ lúc nào!**
