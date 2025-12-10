// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CẤU HÌNH GOOGLE SHEETS =====
// URL Google Apps Script để lưu dữ liệu vào Google Sheets (Version 5 - No Phone)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxA2sutfcH9HYKS3ItTHdS8pljpgMHVQgno2wTQ7zmnCpPGlQdfx7Y8DeJ8WOoV4ljg-w/exec';

// Form submission handler - Only run if form exists
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button to prevent double submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Đang gửi...';
        
        // Get form data
        const formData = {
            fullname: document.getElementById('fullname').value,
            age: document.getElementById('age').value,
            position: document.getElementById('position').value || 'Không chia sẻ',
            message: document.getElementById('message').value || 'Không có'
        };
        
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE') {
            console.log('Form data (Google Sheets chưa được cấu hình):', formData);
            alert('⚠️ Vui lòng cấu hình Google Sheets URL trong file script.js\nXem file HUONG_DAN_GOOGLE_SHEETS.md để biết chi tiết.');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }
        
        // Send data to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            document.getElementById('registrationForm').reset();
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('❌ Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


// Mobile Menu Toggle - Ensure it runs after DOM is loaded
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        // Toggle menu when clicking hamburger button
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked'); // Debug
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on ANY link (including page navigation)
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default for navigation links
                // Close menu immediately
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('nav');
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Prevent menu from closing when clicking inside nav (except on links)
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                e.stopPropagation();
            }
        });
        
        console.log('Mobile menu initialized'); // Debug
    } else {
        console.log('Menu elements not found'); // Debug
    }
}

// Initialize mobile menu
initMobileMenu();
// Member Activity Info Handler
document.addEventListener('DOMContentLoaded', function() {
    const memberInfoBtn = document.getElementById('memberInfoBtn');
    
    if (memberInfoBtn) {
        memberInfoBtn.addEventListener('click', function() {
            // Create and show info modal
            showMemberActivityInfo();
        });
    }
});

function showMemberActivityInfo() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'member-info-overlay';
    overlay.innerHTML = `
        <div class="member-info-modal">
            <button class="modal-close" onclick="closeMemberInfo()">&times;</button>
            <div class="modal-content">
                <div class="modal-icon">🎯</div>
                <h3>Thử Thách Bí Mật Tháng 12</h3>
                <div class="modal-subtitle">Hoạt động độc quyền cho thành viên Group</div>
                
                <div class="info-section">
                    <h4>🎮 Nội dung hoạt động:</h4>
                    <ul>
                        <li>Thử thách trí tuệ và sáng tạo hàng tuần</li>
                        <li>Mini-game tương tác trong Group</li>
                        <li>Chia sẻ câu chuyện cá nhân (tự nguyện)</li>
                        <li>Voting cho hoạt động tháng sau</li>
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>🏆 Phần thưởng:</h4>
                    <ul>
                        <li>Danh hiệu "Thành viên tích cực" trong Group</li>
                        <li>Voucher quà tặng từ các đối tác</li>
                        <li>Quyền ưu tiên tham gia sự kiện offline</li>
                        <li>Badge đặc biệt trên profile Group</li>
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>📋 Cách tham gia:</h4>
                    <ol>
                        <li>Tham gia Group Zalo chính thức</li>
                        <li>Giới thiệu bản thân trong Group</li>
                        <li>Chờ admin gửi link hoạt động riêng</li>
                        <li>Hoàn thành thử thách đầu tiên</li>
                    </ol>
                </div>
                
                <div class="warning-note">
                    <div class="warning-icon">⚠️</div>
                    <p><strong>Lưu ý:</strong> Hoạt động này chỉ dành cho thành viên đã tham gia Group ít nhất 3 ngày và có tương tác tích cực.</p>
                </div>
                
                <div class="modal-actions">
                    <a href="https://zalo.me/g/jvgoxt973" target="_blank" class="modal-btn primary">
                        💬 Tham Gia Group Ngay
                    </a>
                    <button class="modal-btn secondary" onclick="closeMemberInfo()">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Show modal with animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeMemberInfo() {
    const overlay = document.querySelector('.member-info-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }, 300);
    }
}