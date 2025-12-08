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
// URL Google Apps Script để lưu dữ liệu vào Google Sheets (Version 4 - CORS Fixed)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby62wIKjlR7OpUR8R1Uk1Lwq9taJKTtHyY_sEDQ2bmkIrGGHH_DTUiZ3r3sHnWlnu-IxQ/exec';

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi...';
    
    // Get form data
    const formData = {
        fullname: document.getElementById('fullname').value,
        zaloPhone: document.getElementById('zaloPhone').value,
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
