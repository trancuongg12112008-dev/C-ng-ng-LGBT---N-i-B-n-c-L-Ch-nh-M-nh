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

// Google Sheets API URL for activities (you need to create this)
const ACTIVITIES_API_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

// Load activities
function loadActivities() {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    displayActivities(activities);
}

// Display activities
function displayActivities(activities) {
    const list = document.getElementById('activitiesList');
    
    if (activities.length === 0) {
        list.innerHTML = '<p class="no-activities">Chưa có hoạt động nào. Hãy tạo hoạt động đầu tiên!</p>';
        return;
    }
    
    list.innerHTML = '';
    activities.forEach((activity, index) => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        
        const typeIcon = activity.type === 'photo' ? '📸' : activity.type === 'text' ? '✍️' : '🖼️';
        const typeText = activity.type === 'photo' ? 'Gửi Ảnh' : activity.type === 'text' ? 'Viết Bài' : 'Ảnh & Bài Viết';
        const statusBadge = activity.active ? '<span class="badge badge-active">Đang mở</span>' : '<span class="badge badge-inactive">Đã đóng</span>';
        
        card.innerHTML = `
            <div class="activity-header">
                <div>
                    <h4>${activity.title}</h4>
                    <p class="activity-meta">${typeIcon} ${typeText} ${statusBadge}</p>
                </div>
                <div class="activity-actions">
                    <button class="btn-toggle" onclick="toggleActivity(${index})">${activity.active ? '🔒 Đóng' : '🔓 Mở'}</button>
                    <button class="btn-view" onclick="viewSubmissions(${index})">👁️ Xem Bài Gửi</button>
                    <button class="btn-delete" onclick="deleteActivity(${index})">🗑️ Xóa</button>
                </div>
            </div>
            <p class="activity-desc">${activity.description}</p>
            ${activity.deadline ? `<p class="activity-deadline">⏰ Hạn chót: ${formatDate(activity.deadline)}</p>` : ''}
            <p class="activity-link">🔗 Link tham gia: <a href="participate.html?id=${activity.id}" target="_blank">participate.html?id=${activity.id}</a></p>
        `;
        
        list.appendChild(card);
    });
}

// Create new activity
document.getElementById('createActivityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const activity = {
        id: Date.now(),
        title: document.getElementById('activityTitle').value,
        type: document.getElementById('activityType').value,
        description: document.getElementById('activityDescription').value,
        deadline: document.getElementById('activityDeadline').value,
        active: document.getElementById('activityActive').checked,
        createdAt: new Date().toISOString()
    };
    
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.unshift(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    
    this.reset();
    loadActivities();
    alert('✅ Đã tạo hoạt động thành công!');
});

// Toggle activity status
function toggleActivity(index) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities[index].active = !activities[index].active;
    localStorage.setItem('activities', JSON.stringify(activities));
    loadActivities();
}

// View submissions
function viewSubmissions(index) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activity = activities[index];
    window.location.href = `admin-submissions.html?id=${activity.id}`;
}

// Delete activity
function deleteActivity(index) {
    if (!confirm('Bạn có chắc muốn xóa hoạt động này? Tất cả bài gửi sẽ bị xóa!')) {
        return;
    }
    
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activityId = activities[index].id;
    
    // Delete activity
    activities.splice(index, 1);
    localStorage.setItem('activities', JSON.stringify(activities));
    
    // Delete submissions
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const filtered = submissions.filter(s => s.activityId !== activityId);
    localStorage.setItem('submissions', JSON.stringify(filtered));
    
    loadActivities();
    alert('✅ Đã xóa hoạt động!');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Load on page load
loadActivities();
