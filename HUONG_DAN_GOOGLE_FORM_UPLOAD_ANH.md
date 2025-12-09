# Hướng Dẫn: Upload Ảnh Qua Google Form Và Hiển Thị Trên Website

## Cách Hoạt Động:

1. Người dùng upload ảnh qua Google Form
2. Ảnh được lưu vào Google Drive
3. Link ảnh được lưu vào Google Sheets
4. Website tự động lấy link từ Google Sheets và hiển thị ảnh

---

## BƯỚC 1: Tạo Google Form Upload Ảnh

1. Truy cập: https://forms.google.com
2. Click **+ Blank** (Tạo form mới)
3. Đặt tên form: "Chia Sẻ Ảnh Tết - Cộng Đồng LGBT+"

### Thêm các câu hỏi:

**Câu 1: Họ và Tên**
- Loại: Short answer (Câu trả lời ngắn)
- Bật "Required" (Bắt buộc)

**Câu 2: Mô Tả Ảnh**
- Loại: Short answer
- Placeholder: "Ví dụ: Tết 2024 cùng gia đình"
- Bật "Required"

**Câu 3: Upload Ảnh**
- Loại: **File upload** (Tải tệp lên)
- Click **Continue**
- Cài đặt:
  - Allow only specific file types: **Image**
  - Maximum number of files: **1**
  - Maximum file size: **10 MB**
- Bật "Required"

4. Click **Send** → Copy link form

---

## BƯỚC 2: Kết Nối Form Với Google Sheets

1. Trong Google Form, click tab **Responses** (Câu trả lời)
2. Click biểu tượng **Google Sheets** (màu xanh lá)
3. Chọn **Create a new spreadsheet**
4. Đặt tên: "Ảnh Tết - Cộng Đồng LGBT+"
5. Click **Create**

→ Google Sheet sẽ tự động được tạo và kết nối với Form

---

## BƯỚC 3: Tạo Apps Script Để Lấy Link Ảnh Công Khai

1. Mở Google Sheet vừa tạo
2. Click **Extensions** → **Apps Script**
3. Xóa code cũ, dán code này:

```javascript
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
    var data = sheet.getDataRange().getValues();
    var photos = [];
    
    // Bỏ qua hàng tiêu đề (row 0)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var fileUrl = row[3]; // Cột D - Link file upload
      
      if (fileUrl) {
        // Lấy File ID từ URL
        var fileId = extractFileId(fileUrl);
        
        if (fileId) {
          photos.push({
            name: row[1],           // Cột B - Họ tên
            description: row[2],    // Cột C - Mô tả
            imageUrl: 'https://drive.google.com/uc?export=view&id=' + fileId,
            timestamp: row[0]       // Cột A - Thời gian
          });
        }
      }
    }
    
    // Trả về JSON
    return ContentService
      .createTextOutput(JSON.stringify(photos))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function extractFileId(url) {
  if (!url) return null;
  
  // Xử lý các dạng URL khác nhau
  var patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /open\?id=([a-zA-Z0-9_-]+)/
  ];
  
  for (var i = 0; i < patterns.length; i++) {
    var match = url.match(patterns[i]);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}
```

4. Click **💾 Save**
5. Đặt tên project: "Photo Gallery API"

---

## BƯỚC 4: Deploy Apps Script

1. Click **Deploy** → **New deployment**
2. Click ⚙️ → chọn **Web app**
3. Cài đặt:
   - **Execute as**: Me
   - **Who has access**: **Anyone** ← Quan trọng!
4. Click **Deploy**
5. **Authorize access** → Allow
6. **Copy URL** (dạng: https://script.google.com/.../exec)

---

## BƯỚC 5: Cấp Quyền Công Khai Cho Ảnh

**Quan trọng:** Ảnh trong Google Drive phải được chia sẻ công khai

### Cách 1: Tự động (Khuyên dùng)

Thêm script này vào Apps Script:

```javascript
function makeFilesPublic() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var fileUrl = data[i][3];
    if (fileUrl) {
      var fileId = extractFileId(fileUrl);
      if (fileId) {
        try {
          var file = DriveApp.getFileById(fileId);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          Logger.log('Made public: ' + fileId);
        } catch(e) {
          Logger.log('Error: ' + e);
        }
      }
    }
  }
}
```

Chạy hàm này mỗi khi có ảnh mới upload.

### Cách 2: Thủ công

1. Mở Google Drive
2. Tìm folder chứa ảnh upload từ Form
3. Click chuột phải → **Share** → **Anyone with the link**

---

## BƯỚC 6: Cập Nhật Website

Tôi sẽ tạo code JavaScript để tự động lấy ảnh từ Google Sheets và hiển thị trên website.

---

## LƯU Ý:

- ⚠️ Ảnh phải được set public trong Google Drive
- ⚠️ Apps Script phải deploy với "Who has access" = "Anyone"
- ⚠️ Có thể mất vài phút để ảnh hiển thị sau khi upload

---

## Giải Pháp Thay Thế (Đơn Giản Hơn):

Nếu cách trên phức tạp, bạn có thể:
1. Tạo Google Form upload ảnh
2. Thêm link Google Form vào website
3. Admin xem ảnh trong Google Drive
4. Tải ảnh về và upload lên website thủ công

Bạn muốn làm theo cách nào?
