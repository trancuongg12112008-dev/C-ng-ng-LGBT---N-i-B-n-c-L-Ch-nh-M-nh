// ===== GOOGLE APPS SCRIPT CODE HOÀN CHỈNH =====
// Copy toàn bộ code này vào Google Apps Script

function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Handle game results (save to Sheets)
    if (data.action === 'addGameResult') {
      return addGameResult(data.data);
    }
    
    // Handle Christmas letters (save to Docs)
    if (data.action === 'addChristmasLetter') {
      return addChristmasLetterToDocs(data.data);
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

// Function for game results (save to Sheets)
function addGameResult(data) {
  try {
    // Get the game results sheet (first sheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // First sheet for game results
    
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
        message: 'Game result saved successfully'
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

// Function for Christmas letters (save to Docs)
function addChristmasLetterToDocs(data) {
  try {
    // Folder ID từ Google Drive link của bạn
    const FOLDER_ID = '1TwZxrqYwIFxpf3b6ee0znHFWOkJsWIgT';
    
    // Get the folder
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Create document title
    const docTitle = `Thư Giáng Sinh - ${data.senderName} gửi ${data.receiverName} - ${data.date}`;
    
    // Create new Google Doc
    const doc = DocumentApp.create(docTitle);
    const docId = doc.getId();
    
    // Move document to specific folder
    const file = DriveApp.getFileById(docId);
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    
    // Get document body
    const body = doc.getBody();
    
    // Clear default content
    body.clear();
    
    // Add Christmas header
    const headerParagraph = body.appendParagraph('🎄 THƯ CHÚC MỪNG GIÁNG SINH 2025 🎅');
    headerParagraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    headerParagraph.editAsText().setFontSize(20).setBold(true).setForegroundColor('#c0392b');
    
    body.appendParagraph(''); // Empty line
    
    // Add decorative line
    const decorLine = body.appendParagraph('✨ ═══════════════════════════════════════ ✨');
    decorLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorLine.editAsText().setForegroundColor('#f39c12');
    
    body.appendParagraph(''); // Empty line
    
    // Add sender info
    const fromParagraph = body.appendParagraph(`💌 Từ: ${data.senderName}`);
    fromParagraph.editAsText().setFontSize(14).setBold(true).setForegroundColor('#2c3e50');
    
    // Add receiver info
    const toParagraph = body.appendParagraph(`🎁 Gửi đến: ${data.receiverName}`);
    toParagraph.editAsText().setFontSize(14).setBold(true).setForegroundColor('#2c3e50');
    
    // Add date
    const dateParagraph = body.appendParagraph(`📅 Ngày: ${data.date} - ${data.time}`);
    dateParagraph.editAsText().setFontSize(12).setForegroundColor('#7f8c8d');
    
    body.appendParagraph(''); // Empty line
    
    // Add decorative line
    const decorLine2 = body.appendParagraph('🎄 ═══════════════════════════════════════ 🎄');
    decorLine2.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorLine2.editAsText().setForegroundColor('#27ae60');
    
    body.appendParagraph(''); // Empty line
    
    // Add message header
    const messageHeader = body.appendParagraph('💝 LỜI CHÚC:');
    messageHeader.editAsText().setFontSize(16).setBold(true).setForegroundColor('#c0392b');
    
    body.appendParagraph(''); // Empty line
    
    // Add the actual message
    const messageParagraph = body.appendParagraph(data.message);
    messageParagraph.editAsText().setFontSize(14).setForegroundColor('#2c3e50');
    messageParagraph.setLineSpacing(1.5);
    messageParagraph.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    
    body.appendParagraph(''); // Empty line
    body.appendParagraph(''); // Empty line
    
    // Add footer
    const footerLine = body.appendParagraph('🌟 ═══════════════════════════════════════ 🌟');
    footerLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footerLine.editAsText().setForegroundColor('#9b59b6');
    
    const footer = body.appendParagraph('🏳️‍🌈 Cộng Đồng LGBT+ - Mùa Giáng Sinh 2025 🎄');
    footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footer.editAsText().setFontSize(12).setItalic(true).setForegroundColor('#7f8c8d');
    
    const wishFooter = body.appendParagraph('Chúc bạn một mùa Giáng Sinh ấm áp và hạnh phúc! ✨');
    wishFooter.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    wishFooter.editAsText().setFontSize(11).setItalic(true).setForegroundColor('#95a5a6');
    
    // Save the document
    doc.saveAndClose();
    
    // Also save to spreadsheet for tracking
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let letterSheet;
    
    try {
      letterSheet = spreadsheet.getSheetByName('Christmas Letters');
    } catch (e) {
      letterSheet = spreadsheet.insertSheet('Christmas Letters');
      letterSheet.getRange(1, 1, 1, 7).setValues([[
        'Thời gian', 'Người gửi', 'Người nhận', 'Lời chúc', 'Ngày', 'Giờ', 'Google Docs Link'
      ]]);
      
      const headerRange = letterSheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#27ae60');
      headerRange.setFontColor('white');
    }
    
    // Add tracking data
    const docUrl = `https://docs.google.com/document/d/${docId}/edit`;
    const rowData = [
      data.timestamp,
      data.senderName,
      data.receiverName,
      data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
      data.date,
      data.time,
      docUrl
    ];
    
    letterSheet.appendRow(rowData);
    
    // Return success response with document info
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Christmas letter saved to Google Docs successfully',
        docId: docId,
        docUrl: docUrl,
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

// Test function for game results
function testAddGameResult() {
  const testData = {
    timestamp: new Date().toISOString(),
    playerName: 'Test Player - ' + Date.now(),
    score: 25,
    completionTime: '00:35',
    moves: 20,
    matches: 8,
    playDate: new Date().toLocaleDateString('vi-VN'),
    device: 'Apps Script Test',
    gameStatus: 'Test từ Apps Script'
  };
  
  const result = addGameResult(testData);
  Logger.log('Game test result: ' + result.getContent());
  return result;
}

// Test function for Christmas letters
function testAddChristmasLetter() {
  const testData = {
    timestamp: new Date().toISOString(),
    senderName: 'Test Sender - ' + Date.now(),
    receiverName: 'Test Receiver',
    message: 'Đây là thư test từ Apps Script. Chúc mừng Giáng Sinh và năm mới an lành! 🎄🎅✨',
    date: new Date().toLocaleDateString('vi-VN'),
    time: new Date().toLocaleTimeString('vi-VN')
  };
  
  const result = addChristmasLetterToDocs(testData);
  Logger.log('Letter test result: ' + result.getContent());
  return result;
}