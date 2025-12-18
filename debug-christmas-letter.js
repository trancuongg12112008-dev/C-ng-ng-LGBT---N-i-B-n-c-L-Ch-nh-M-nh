// Debug version of Christmas Letter with detailed logging

class DebugChristmasLetter {
    constructor() {
        this.form = document.getElementById('letterForm');
        this.messageTextarea = document.getElementById('message');
        this.submitBtn = document.getElementById('submitBtn');
        
        this.init();
    }
    
    init() {
        console.log('🎄 Debug Christmas Letter System initialized');
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.debugSubmitLetter();
        });
    }
    
    async debugSubmitLetter() {
        console.log('🧪 Starting debug letter submission...');
        
        const formData = new FormData(this.form);
        const letterData = {
            senderName: formData.get('senderName').trim(),
            receiverName: formData.get('receiverName').trim() || 'Tất cả mọi người',
            message: formData.get('message').trim(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('vi-VN'),
            time: new Date().toLocaleTimeString('vi-VN')
        };
        
        console.log('📝 Letter data prepared:', letterData);
        
        // Validation
        if (!letterData.senderName || !letterData.message) {
            console.error('❌ Validation failed: Missing required fields');
            alert('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        if (letterData.message.length < 10) {
            console.error('❌ Validation failed: Message too short');
            alert('⚠️ Lời chúc quá ngắn! Hãy viết ít nhất 10 ký tự.');
            return;
        }
        
        console.log('✅ Validation passed');
        
        // Show loading
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = '📤 Đang gửi...';
        
        try {
            console.log('🚀 Sending to Google Apps Script...');
            await this.debugSendToGoogleDocs(letterData);
            
            console.log('✅ Letter sent successfully');
            alert('✅ Thư đã được gửi thành công! Kiểm tra Google Drive folder để xem document mới.');
            
            this.form.reset();
            
        } catch (error) {
            console.error('❌ Error sending letter:', error);
            alert('❌ Có lỗi xảy ra! Kiểm tra console để xem chi tiết.');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = '💌 Gửi Lời Chúc';
        }
    }
    
    async debugSendToGoogleDocs(data) {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys-t8yLgORCrTmvrMeXoGrSrr9sRe-ZnQrYvPMLg09jOSSk9yDv2a0ZWc9cbBSF6C-pA/exec';
        
        const payload = {
            action: 'addChristmasLetter',
            data: {
                timestamp: data.timestamp,
                senderName: data.senderName,
                receiverName: data.receiverName,
                message: data.message,
                date: data.date,
                time: data.time
            }
        };
        
        console.log('📤 Payload being sent:', payload);
        console.log('🌐 URL:', GOOGLE_SCRIPT_URL);
        
        // Try with different approaches
        console.log('🧪 Attempting fetch with no-cors...');
        
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            console.log('📥 Response received:', response);
            console.log('📊 Response status:', response.status);
            console.log('📊 Response type:', response.type);
            
            // Since no-cors doesn't allow reading response, we assume success if no error
            if (response.type === 'opaque') {
                console.log('✅ Request sent successfully (opaque response due to no-cors)');
                return { success: true, message: 'Request sent' };
            }
            
        } catch (error) {
            console.error('❌ Fetch failed:', error);
            throw error;
        }
        
        // Also try a CORS request for debugging (will likely fail but gives more info)
        console.log('🧪 Also attempting CORS request for debugging...');
        try {
            const corsResponse = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            const corsResult = await corsResponse.text();
            console.log('📥 CORS Response:', corsResult);
            
        } catch (corsError) {
            console.log('⚠️ CORS request failed (expected):', corsError.message);
        }
    }
}

// Test function
function debugTestChristmasLetter() {
    console.log('🧪 Running debug test...');
    
    const testData = {
        timestamp: new Date().toISOString(),
        senderName: 'Debug Test User - ' + Date.now(),
        receiverName: 'Debug Test Receiver',
        message: 'Đây là thư test debug để kiểm tra kết nối Google Docs. Chúc mừng Giáng Sinh! 🎄🎅✨',
        date: new Date().toLocaleDateString('vi-VN'),
        time: new Date().toLocaleTimeString('vi-VN')
    };
    
    const debugSystem = new DebugChristmasLetter();
    debugSystem.debugSendToGoogleDocs(testData);
}

// Initialize debug system
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('letterForm')) {
        window.debugLetterSystem = new DebugChristmasLetter();
        window.debugTestChristmasLetter = debugTestChristmasLetter;
        console.log('🎄 Debug Christmas Letter System ready');
        console.log('🧪 Use debugTestChristmasLetter() to test');
    }
});