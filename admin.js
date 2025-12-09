// Admin Login Configuration
const ADMIN_CREDENTIALS = {
    'admin': 'admin123',  // Thay đổi mật khẩu này!
    'khanhnekk': 'khanh2024',
    'trcuong': 'cuong2024'
};

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'admin-dashboard.html';
}

// Admin Login Form Handler
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('loginError');
        
        // Check credentials
        if (ADMIN_CREDENTIALS[username] && ADMIN_CREDENTIALS[username] === password) {
            // Login successful
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            window.location.href = 'admin-dashboard.html';
        } else {
            // Login failed
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
}
