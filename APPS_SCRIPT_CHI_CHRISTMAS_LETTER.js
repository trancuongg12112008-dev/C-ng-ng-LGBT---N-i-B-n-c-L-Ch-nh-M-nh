// ===== APPS SCRIPT CHỈ CHO CHRISTMAS LETTER - ĐỂ TEST =====
// Copy code này vào Google Apps Script để test riêng Christmas Letter

function doPost(e) {
  try {
    console.log('📥 Received POST request');
    console.log('📄 Post data:', e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    console.log('📊 Parsed data:', data);
    
    // Chỉ xử lý Christmas letters
    if (data.action === 'addChristmasLetter') {
      console.log('✅ Processing Christmas letter');
      return createChristmasDoc(data.data);
    }
    
    console.log('❌ Invalid action:', data.action);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Invalid action: ' + data.action}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createChristmasDoc(data) {
  try {
    console.log('🎄 Creating Christmas document with data:', data);
    
    // ID thư mục Google Drive - KIỂM TRA ID NÀY
    const FOLDER_ID = '1vowVFFSvkvisssh1b3Yz7u5koYU8swUt';
    console.log('📁 Using folder ID:', FOLDER_ID);
    
    // Kiểm tra folder có tồn tại không
    let folder;
    try {
      folder = DriveApp.getFolderById(FOLDER_ID);
      console.log('✅ Folder found:', folder.getName());
    } catch (folderError) {
      console.error('❌ Folder not found:', folderError);
      throw new Error('Folder not found: ' + FOLDER_ID);
    }
    
    // Tạo tên document
    const docTitle = `Thư Giáng Sinh - ${data.senderName} gửi ${data.receiverName} - ${data.date}`;
    console.log('📝 Document title:', docTitle);
    
    // Tạo Google Doc mới
    console.log('📄 Creating new document...');
    const doc = DocumentApp.create(docTitle);
    const docId = doc.getId();
    console.log('✅ Document created with ID:', docId);
    
    // Chuyển document vào thư mục
    console.log('📁 Moving document to folder...');
    const file = DriveApp.getFileById(docId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    console.log('✅ Document moved to folder');
    
    // Lấy nội dung document
    console.log('✏️ Adding content to document...');
    const body = doc.getBody();
    body.clear();
    
    // Thêm header
    const header = body.appendParagraph('🎄 THƯ CHÚC MỪNG GIÁNG SINH 2025 🎅');
    header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    header.editAsText().setFontSize(20).setBold(true).setForegroundColor('#c0392b');
    
    body.appendParagraph('');
    
    // Thêm đường trang trí
    const decorLine = body.appendParagraph('✨ ═══════════════════════════════════════ ✨');
    decorLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorLine.editAsText().setForegroundColor('#f39c12');
    
    body.appendParagraph('');
    
    // Thông tin người gửi
    const fromPara = body.appendParagraph(`💌 Từ: ${data.senderName}`);
    fromPara.editAsText().setFontSize(14).setBold(true).setForegroundColor('#2c3e50');
    
    // Thông tin người nhận
    const toPara = body.appendParagraph(`🎁 Gửi đến: ${data.receiverName}`);
    toPara.editAsText().setFontSize(14).setBold(true).setForegroundColor('#2c3e50');
    
    // Ngày giờ
    const datePara = body.appendParagraph(`📅 Ngày: ${data.date} - ${data.time}`);
    datePara.editAsText().setFontSize(12).setForegroundColor('#7f8c8d');
    
    body.appendParagraph('');
    
    // Đường trang trí 2
    const decorLine2 = body.appendParagraph('🎄 ═══════════════════════════════════════ 🎄');
    decorLine2.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorLine2.editAsText().setForegroundColor('#27ae60');
    
    body.appendParagraph('');
    
    // Header lời chúc
    const messageHeader = body.appendParagraph('💝 LỜI CHÚC:');
    messageHeader.editAsText().setFontSize(16).setBold(true).setForegroundColor('#c0392b');
    
    body.appendParagraph('');
    
    // Nội dung lời chúc
    const messagePara = body.appendParagraph(data.message);
    messagePara.editAsText().setFontSize(14).setForegroundColor('#2c3e50');
    messagePara.setLineSpacing(1.5);
    messagePara.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    
    body.appendParagraph('');
    body.appendParagraph('');
    
    // Footer
    const footerLine = body.appendParagraph('🌟 ═══════════════════════════════════════ 🌟');
    footerLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footerLine.editAsText().setForegroundColor('#9b59b6');
    
    const footer = body.appendParagraph('🏳️‍🌈 Cộng Đồng LGBT+ - Mùa Giáng Sinh 2025 🎄');
    footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footer.editAsText().setFontSize(12).setItalic(true).setForegroundColor('#7f8c8d');
    
    const wishFooter = body.appendParagraph('Chúc bạn một mùa Giáng Sinh ấm áp và hạnh phúc! ✨');
    wishFooter.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    wishFooter.editAsText().setFontSize(11).setItalic(true).setForegroundColor('#95a5a6');
    
    // Lưu document
    console.log('💾 Saving document...');
    doc.saveAndClose();
    console.log('✅ Document saved successfully');
    
    const docUrl = `https://docs.google.com/document/d/${docId}/edit`;
    console.log('🔗 Document URL:', docUrl);
    
    // Trả về kết quả thành công
    const result = {
      success: true,
      message: 'Thư đã được lưu vào Google Docs',
      docId: docId,
      docUrl: docUrl,
      docTitle: docTitle,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Returning success result:', result);
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error in createChristmasDoc:', error);
    const errorResult = {
      success: false,
      error: error.toString(),
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== FUNCTION TEST - CHẠY FUNCTION NÀY ĐỂ TEST =====
function testChristmasLetterDirect() {
  console.log('🧪 Starting direct test...');
  
  const testData = {
    timestamp: new Date().toISOString(),
    senderName: 'Direct Test User - ' + Date.now(),
    receiverName: 'Direct Test Receiver',
    message: 'Đây là thư test trực tiếp từ Apps Script. Chúc mừng Giáng Sinh và năm mới an lành! 🎄🎅✨\n\nMong rằng bạn sẽ có một mùa Giáng Sinh thật ấm áp bên gia đình và những người thân yêu.',
    date: new Date().toLocaleDateString('vi-VN'),
    time: new Date().toLocaleTimeString('vi-VN')
  };
  
  console.log('🧪 Test data:', testData);
  
  try {
    const result = createChristmasDoc(testData);
    const resultContent = result.getContent();
    console.log('🧪 Test result:', resultContent);
    
    const parsedResult = JSON.parse(resultContent);
    if (parsedResult.success) {
      console.log('✅ TEST THÀNH CÔNG!');
      console.log('📄 Document ID:', parsedResult.docId);
      console.log('🔗 Document URL:', parsedResult.docUrl);
      console.log('📝 Document Title:', parsedResult.docTitle);
      console.log('👉 Kiểm tra Google Drive để xem document!');
    } else {
      console.log('❌ TEST THẤT BẠI!');
      console.log('❌ Error:', parsedResult.error);
    }
    
    return parsedResult;
    
  } catch (error) {
    console.error('❌ Test failed with exception:', error);
    return { success: false, error: error.toString() };
  }
}

// Function để test doPost
function testDoPost() {
  console.log('🧪 Testing doPost function...');
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'addChristmasLetter',
        data: {
          timestamp: new Date().toISOString(),
          senderName: 'DoPost Test User - ' + Date.now(),
          receiverName: 'DoPost Test Receiver',
          message: 'Test message từ doPost function. Chúc mừng Giáng Sinh! 🎄',
          date: new Date().toLocaleDateString('vi-VN'),
          time: new Date().toLocaleTimeString('vi-VN')
        }
      })
    }
  };
  
  try {
    const result = doPost(mockEvent);
    const resultContent = result.getContent();
    console.log('🧪 DoPost result:', resultContent);
    
    const parsedResult = JSON.parse(resultContent);
    if (parsedResult.success) {
      console.log('✅ DOPOST TEST THÀNH CÔNG!');
    } else {
      console.log('❌ DOPOST TEST THẤT BẠI!');
    }
    
    return parsedResult;
    
  } catch (error) {
    console.error('❌ DoPost test failed:', error);
    return { success: false, error: error.toString() };
  }
}

// ===== HƯỚNG DẪN SỬ DỤNG =====
/*
1. Copy toàn bộ code này vào Google Apps Script
2. Chạy function testChristmasLetterDirect() để test
3. Kiểm tra Execution transcript để xem logs
4. Kiểm tra Google Drive để xem document được tạo
5. Nếu thành công, deploy as Web App
6. Test từ website bằng test-letter-connection.html
*/