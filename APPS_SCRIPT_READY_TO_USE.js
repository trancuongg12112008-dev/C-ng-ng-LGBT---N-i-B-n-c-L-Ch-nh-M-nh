// ===== CODE APPS SCRIPT SẴN SÀNG SỬ DỤNG =====
// Copy toàn bộ code này vào Google Apps Script

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addChristmasLetter') {
      return createChristmasDoc(data.data);
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

function createChristmasDoc(data) {
  try {
    // ID thư mục Google Drive của bạn (ĐÃ CẬP NHẬT)
    const FOLDER_ID = '1vowVFFSvkvisssh1b3Yz7u5koYU8swUt';
    
    // Lấy thư mục
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Tạo tên document
    const docTitle = `Thư Giáng Sinh - ${data.senderName} gửi ${data.receiverName} - ${data.date}`;
    
    // Tạo Google Doc mới
    const doc = DocumentApp.create(docTitle);
    const docId = doc.getId();
    
    // Chuyển document vào thư mục
    const file = DriveApp.getFileById(docId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    
    // Lấy nội dung document
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
    doc.saveAndClose();
    
    // Trả về kết quả thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Thư đã được lưu vào Google Docs',
        docId: docId,
        docUrl: `https://docs.google.com/document/d/${docId}/edit`,
        docTitle: docTitle
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

// Function test - CHẠY FUNCTION NÀY ĐỂ TEST
function testCreateDoc() {
  const testData = {
    senderName: 'Test Sender - ' + Date.now(),
    receiverName: 'Test Receiver', 
    message: 'Đây là thư test từ Apps Script. Chúc mừng Giáng Sinh và năm mới an lành! 🎄🎅✨\n\nMong rằng bạn sẽ có một mùa Giáng Sinh thật ấm áp bên gia đình và những người thân yêu.',
    date: new Date().toLocaleDateString('vi-VN'),
    time: new Date().toLocaleTimeString('vi-VN')
  };
  
  const result = createChristmasDoc(testData);
  Logger.log('Test result: ' + result.getContent());
  
  // Parse result để lấy thông tin document
  try {
    const resultData = JSON.parse(result.getContent());
    if (resultData.success) {
      Logger.log('✅ Document created successfully!');
      Logger.log('📄 Document title: ' + resultData.docTitle);
      Logger.log('🔗 Document URL: ' + resultData.docUrl);
    } else {
      Logger.log('❌ Error: ' + resultData.error);
    }
  } catch (e) {
    Logger.log('❌ Parse error: ' + e.toString());
  }
  
  return result;
}