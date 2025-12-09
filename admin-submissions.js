// Check if user is logged in
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin.html';
}

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUsername');
            window.location.href = 'admin.html';
        }
    });
}

// Get activity ID from URL
const urlParams = new URLSearchParams(window.location.search);
const activityId = parseInt(urlParams.get('id'));

// Load submissions
function loadSubmissions() {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activity = activities.find(a => a.id === activityId);
    
    if (!activity) {
        document.getElementById('activityTitle').innerHTML = '<h2>❌ Không tìm thấy hoạt động</h2>';
        document.getElementById('submissionsList').innerHTML = '';
        return;
    }
    
    document.getElementById('activityTitle').innerHTML = `<h2>📬 Bài Gửi: ${activity.title}</h2>`;
    
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const activitySubmissions = submissions.filter(s => s.activityId === activityId);
    
    if (activitySubmissions.length === 0) {
        document.getElementById('submissionsList').innerHTML = '<p class="no-submissions">Chưa có bài gửi nào.</p>';
        return;
    }
    
    const list = document.getElementById('submissionsList');
    list.innerHTML = '';
    
    activitySubmissions.forEach((submission, index) => {
        const card = document.createElement('div');
        card.className = 'submission-card';
        
        let content = `
            <div class="submission-header">
                <h4>👤 ${submission.participantName}</h4>
                <div>
                    <span class="submission-date">📅 ${formatDateTime(submission.submittedAt)}</span>
                    <button class="btn-delete-small" onclick="deleteSubmission(${submission.id})">🗑️</button>
                </div>
            </div>
        `;
        
        if (submission.text) {
            content += `<div class="submission-text"><p>${submission.text}</p></div>`;
        }
        
        if (submission.photos && submission.photos.length > 0) {
            content += '<div class="submission-photos">';
            submission.photos.forEach(photo => {
                content += `<img src="${photo}" alt="Photo" loading="lazy">`;
            });
            content += '</div>';
        }
        
        card.innerHTML = content;
        list.appendChild(card);
    });
}

// Delete submission
function deleteSubmission(submissionId) {
    if (!confirm('Bạn có chắc muốn xóa bài gửi này?')) {
        return;
    }
    
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const filtered = submissions.filter(s => s.id !== submissionId);
    localStorage.setItem('submissions', JSON.stringify(filtered));
    
    loadSubmissions();
    alert('✅ Đã xóa bài gửi!');
}

// Format date time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
}

// Load on page load
loadSubmissions();
