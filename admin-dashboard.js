// Check if user is logged in
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin.html';
}

// Display admin username
const adminUsername = localStorage.getItem('adminUsername');
if (adminUsername) {
    document.getElementById('adminName').textContent = adminUsername;
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'admin.html';
    }
});
