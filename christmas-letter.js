// Christmas Letter System
class ChristmasLetter {
    constructor() {
        this.form = document.getElementById('letterForm');
        this.messageTextarea = document.getElementById('message');
        this.charCounter = document.getElementById('charCount');
        this.submitBtn = document.getElementById('submitBtn');
        
        this.init();
    }
    
    init() {
        // Character counter
        this.messageTextarea.addEventListener('input', () => {
            this.updateCharCounter();
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLetter();
        });
        
        // Create snowfall effect
        this.createSnowfall();
        
        // Initial character count
        this.updateCharCounter();
    }
    
    updateCharCounter() {
        const currentLength = this.messageTextarea.value.length;
        this.charCounter.textContent = currentLength;
        
        // Change color based on length
        if (currentLength > 800) {
            this.charCounter.style.color = '#e74c3c';
        } else if (currentLength > 600) {
            this.charCounter.style.color = '#f39c12';
        } else {
            this.charCounter.style.color = '#7f8c8d';
        }
    }
    
    async submitLetter() {
        const formData = new FormData(this.form);
        const letterData = {
            senderName: formData.get('senderName').trim(),
            receiverName: formData.get('receiverName').trim() || 'Tất cả mọi người',
            message: formData.get('message').trim(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('vi-VN'),
            time: new Date().toLocaleTimeString('vi-VN')
        };
        
        // Validation
        if (!letterData.senderName || !letterData.message) {
            this.showNotification('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            return;
        }
        
        if (letterData.message.length < 10) {
            this.showNotification('⚠️ Lời chúc quá ngắn! Hãy viết ít nhất 10 ký tự.', 'error');
            return;
        }
        
        // Show loading
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = '📤 Đang gửi...';
        
        try {
            await this.sendToGoogleDocs(letterData);
            this.showSuccessMessage(letterData);
            this.form.reset();
            this.updateCharCounter();
        } catch (error) {
            console.error('Error sending letter:', error);
            this.showNotification('❌ Có lỗi xảy ra! Vui lòng thử lại.', 'error');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = '💌 Gửi Lời Chúc';
        }
    }
    
    async sendToGoogleDocs(data) {
        // Google Apps Script URL for letters
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
        
        console.log('📤 Sending letter to Google Docs:', payload);
        
        return fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    }
    
    showSuccessMessage(data) {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            max-width: 90%;
            width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
            border: 3px solid #27ae60;
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #27ae60; margin-bottom: 1rem; font-size: 2rem;">Gửi Thành Công!</h2>
            <p style="color: #2c3e50; margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.5;">
                💌 Lời chúc của <strong>${data.senderName}</strong> đã được gửi đến <strong>${data.receiverName}</strong>!<br>
                📄 Thư đã được tự động lưu vào <strong>Google Docs</strong><br>
                🎄 Cảm ơn bạn đã chia sẻ tình yêu thương trong mùa Giáng Sinh!
            </p>
            <div style="background: #ecf0f1; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; text-align: left;">
                <strong style="color: #c0392b;">Lời chúc của bạn:</strong><br>
                <em style="color: #2c3e50; font-size: 0.95rem;">"${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}"</em>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);">
                ✨ Đóng
            </button>
            <p style="margin-top: 1rem; font-size: 0.85rem; color: #7f8c8d;">
                🌟 Bạn có thể viết thêm nhiều lời chúc khác!
            </p>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add animations
        if (!document.querySelector('#modalAnimations')) {
            const style = document.createElement('style');
            style.id = 'modalAnimations';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create celebration effect
        this.createCelebration();
        
        // Show notification
        setTimeout(() => {
            this.showNotification('✅ Thư đã được lưu vào Google Docs!', 'success');
        }, 1000);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        
        const backgroundColor = type === 'success' ? 
            'linear-gradient(135deg, #27ae60, #2ecc71)' : 
            type === 'error' ?
            'linear-gradient(135deg, #e74c3c, #c0392b)' :
            'linear-gradient(135deg, #3498db, #2980b9)';
        
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 1.2rem 2rem;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: bold;
            z-index: 10001;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.6s ease;
            max-width: 350px;
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 5000);
    }
    
    createCelebration() {
        const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💖', '🏳️‍🌈', '🎄', '🎅', '🤶', '🎁', '💌', '⭐'];
        
        // Create fireworks effect
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                emoji.style.position = 'fixed';
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-50px';
                emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
                emoji.style.zIndex = '1001';
                emoji.style.pointerEvents = 'none';
                emoji.style.animation = `snowfall ${Math.random() * 2 + 3}s linear forwards`;
                emoji.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.remove();
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    createSnowfall() {
        const snowflakes = ['❄️', '❅', '❆', '🌟', '✨'];
        
        // Create continuous snowfall
        setInterval(() => {
            if (Math.random() < 0.3) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                snowflake.style.left = Math.random() * window.innerWidth + 'px';
                snowflake.style.animationDuration = (Math.random() * 4 + 3) + 's';
                snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
                
                document.body.appendChild(snowflake);
                
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.remove();
                    }
                }, 7000);
            }
        }, 300);
    }
}

// Template messages
const templates = {
    1: `🎄 Giáng Sinh An Lành - Mùa Yêu Thương Đến Rồi! 🎅

Trong không khí se lạnh của mùa đông, xin gửi đến bạn những lời chúc ấm áp nhất. Mong rằng ánh nến lung linh, tiếng chuông ngân vang và hương thơm của cây thông sẽ mang đến cho bạn niềm vui trọn vẹn.

Chúc bạn và gia đình một mùa Giáng Sinh tràn ngập tiếng cười, hạnh phúc bên những người thân yêu. Mọi điều tốt đẹp nhất sẽ đến với bạn trong năm mới 2025! 

Giáng Sinh vui vẻ và năm mới an khang thịnh vượng! 🌟✨🎁`,

    2: `🌟 Chào Đón Năm Mới 2025 - Khởi Đầu Tươi Sáng! 🎊

Khi những giây phút cuối cùng của năm cũ trôi qua, hãy cùng nhau đón chào một năm mới đầy hứa hẹn. Mong rằng 365 ngày sắp tới sẽ mang đến cho bạn vô vàn niềm vui, thành công rực rỡ và những trải nghiệm đáng nhớ.

Chúc bạn luôn tràn đầy năng lượng tích cực, sức khỏe dồi dào, tài lộc hanh thông và tình yêu thương bao trùm. Mọi ước mơ của bạn đều sẽ nở hoa trong năm mới này!

Năm mới vạn sự như ý, phát tài phát lộc! 💫🍀🎆`,

    3: `💖 Tình Bạn Vĩnh Cửu - Món Quà Quý Giá Nhất! 🤗

Gửi đến người bạn đặc biệt của tôi - người đã luôn ở bên trong những lúc vui buồn, thăng trầm. Tình bạn của chúng ta như ánh sao sáng, luôn tỏa sáng dù cho cuộc sống có nhiều thử thách.

Cảm ơn bạn vì đã là chính mình, vì những lời động viên chân thành, những khoảnh khắc cười đùa vô tư và sự thấu hiểu sâu sắc. Bạn là món quà tuyệt vời mà cuộc đời trao tặng cho tôi.

Chúc bạn luôn hạnh phúc, thành công và chúng ta sẽ cùng nhau tạo nên thêm nhiều kỷ niệm đẹp! 🌈✨💕`,

    4: `🏳️‍🌈 Tự Hào Là Chính Mình - Cộng Đồng LGBT+ Đoàn Kết! 🌈

Gửi đến gia đình cầu vồng thân yêu - nơi mọi người đều được yêu thương, tôn trọng và chấp nhận với bản sắc riêng. Chúng ta là những ngôi sao rực rỡ, tỏa sáng bằng chính sự dũng cảm và tình yêu thương.

Trong mùa Giáng Sinh này, chúc cả nhà luôn tự tin, mạnh mẽ và tự hào về con người mình. Hãy tiếp tục lan tỏa thông điệp yêu thương, bình đẳng và hòa nhập đến cộng đồng.

Chúc cộng đồng LGBT+ luôn đoàn kết, phát triển và tỏa sáng! Love is Love! 💕🌟🎉`,

    5: `✨ Ước Mơ Thành Hiện Thực - Tin Vào Phép Màu! 🌟

Mỗi người chúng ta đều có những ước mơ riêng, những khát khao cháy bỏng trong tim. Đừng bao giờ ngừng tin vào bản thân và sức mạnh của những giấc mơ.

Chúc bạn có đủ can đảm để theo đuổi đam mê, đủ kiên trì để vượt qua thử thách và đủ may mắn để gặp được những cơ hội tuyệt vời. Năm mới 2025 sẽ là năm mà những ước mơ của bạn bắt đầu nở hoa.

Hãy luôn tin tưởng - bạn xứng đáng với mọi điều tốt đẹp nhất! Phép màu đang chờ đón bạn! 🎯💫🏆`,

    6: `👨‍👩‍👧‍👦 Gia Đình Hạnh Phúc - Tổ Ấm Yêu Thương! 🏠

Gửi đến gia đình thân yêu - nơi chứa đựng tất cả tình yêu thương, sự ấm áp và những kỷ niệm đẹp nhất. Gia đình là bến đỗ bình yên sau những ngày dài vất vả, là nguồn động lực để chúng ta vượt qua mọi khó khăn.

Chúc gia đình luôn khỏe mạnh, hạnh phúc và đoàn viên. Mong rằng mái ấm nhỏ của chúng ta sẽ luôn tràn ngập tiếng cười, sự hiểu biết và tình yêu thương vô bờ bến.

Chúc mừng Giáng Sinh và chúc gia đình luôn là điểm tựa vững chắc cho nhau! 💕🎄🏡`,

    7: `💝 Lời Cảm Ơn Chân Thành - Biết Ơn Cuộc Đời! 🙏

Trong mùa Giáng Sinh này, tôi muốn gửi đến bạn lời cảm ơn sâu sắc nhất. Cảm ơn bạn vì đã xuất hiện trong cuộc đời tôi, vì những điều tốt đẹp bạn đã mang lại và vì tình cảm chân thành mà bạn dành cho tôi.

Cuộc sống trở nên ý nghĩa hơn khi có những người như bạn - những người biết yêu thương, chia sẻ và luôn sẵn sàng giúp đỡ. Bạn đã làm cho thế giới này trở nên tươi đẹp hơn.

Cảm ơn vì tất cả! Chúc bạn luôn được đón nhận những điều tốt đẹp như những gì bạn đã cho đi! 🌟💖✨`,

    8: `🎅 Ông Già Noel Đến Rồi - Phép Màu Giáng Sinh! 🛷

Ho ho ho! Ông già Noel đã chuẩn bị sẵn những món quà đặc biệt dành cho bạn rồi đấy! Không phải là những món quà vật chất, mà là những điều quý giá nhất: sức khỏe, hạnh phúc, may mắn và tình yêu thương.

Trong đêm Giáng Sinh kỳ diệu này, hãy tin vào phép màu và mở rộng trái tim để đón nhận tất cả những điều tốt đẹp. Ông già Noel sẽ mang đến cho bạn một năm mới tràn đầy niềm vui và thành công.

Chúc bạn có một đêm Giáng Sinh thật kỳ diệu! Ho ho ho! 🎁❄️🌟`,

    9: `🕊️ Hòa Bình Và Yêu Thương - Thế Giới Tươi Đẹp! 🌍

Trong mùa Giáng Sinh thiêng liêng này, hãy cùng nhau lan tỏa thông điệp hòa bình và yêu thương đến khắp nơi. Mỗi người chúng ta đều có thể làm cho thế giới này trở nên tốt đẹp hơn bằng những hành động nhỏ bé nhưng ý nghĩa.

Chúc cho tất cả mọi người trên thế giới đều được sống trong hòa bình, được yêu thương và tôn trọng. Mong rằng tình người sẽ thắng lên tất cả, xóa bỏ mọi chia rẽ và mang lại sự đoàn kết.

Hãy cùng nhau tạo nên một thế giới đầy yêu thương! Peace and Love! 🌈💕🕊️`,

    10: `🎁 Món Quà Đặc Biệt - Tình Yêu Vô Điều Kiện! 💖

Giáng Sinh không chỉ là mùa của những món quà được gói ghém đẹp đẽ, mà còn là mùa của những món quà vô hình quý giá nhất: tình yêu thương, sự quan tâm, lời nói tử tế và những cử chỉ ấm áp.

Tôi muốn tặng bạn món quà đặc biệt nhất - đó là tình cảm chân thành và lời chúc tốt đẹp từ trái tim. Mong rằng bạn sẽ luôn cảm thấy được yêu thương, được trân trọng và có ý nghĩa trong cuộc sống này.

Bạn chính là món quà tuyệt vời nhất mà cuộc đời trao tặng! Chúc bạn Giáng Sinh an lành! 🌟🎄💝`
};

// Global function to use templates
function useTemplate(templateId) {
    const messageTextarea = document.getElementById('message');
    const template = templates[templateId];
    
    if (template) {
        messageTextarea.value = template;
        messageTextarea.focus();
        
        // Update character counter
        if (window.letterSystem) {
            window.letterSystem.updateCharCounter();
        }
        
        // Scroll to textarea
        messageTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show feedback
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: bold;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
            animation: slideInRight 0.5s ease;
        `;
        notification.textContent = '✅ Đã áp dụng mẫu lời chúc!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 2000);
    }
}

// Test function for Christmas Letters
function testChristmasLetter() {
    console.log('🧪 Testing Christmas Letter to Google Docs...');
    
    const testData = {
        timestamp: new Date().toISOString(),
        senderName: 'Test Sender - ' + Date.now(),
        receiverName: 'Test Receiver',
        message: 'Đây là thư test để kiểm tra kết nối Google Docs. Chúc mừng Giáng Sinh!',
        date: new Date().toLocaleDateString('vi-VN'),
        time: new Date().toLocaleTimeString('vi-VN')
    };
    
    const payload = {
        action: 'addChristmasLetter',
        data: testData
    };
    
    console.log('🧪 Sending letter test:', payload);
    
    fetch('https://script.google.com/macros/s/AKfycbys-t8yLgORCrTmvrMeXoGrSrr9sRe-ZnQrYvPMLg09jOSSk9yDv2a0ZWc9cbBSF6C-pA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        console.log('🧪 Letter test request sent!');
        console.log('🧪 Check your Google Drive folder and Sheets for new data');
    })
    .catch(error => {
        console.error('🧪 Letter test failed:', error);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.letterSystem = new ChristmasLetter();
    window.testChristmasLetter = testChristmasLetter;
    console.log('🎄 Christmas Letter System initialized');
    console.log('🎄 Use testChristmasLetter() to test connection');
});