// Get activity ID from URL
const urlParams = new URLSearchParams(window.location.search);
const activityId = parseInt(urlParams.get('id'));

// Load activity
function loadActivity() {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activity = activities.find(a => a.id === activityId);
    
    if (!activity) {
        document.getElementById('activityInfo').innerHTML = `
            <div class="error-message">
                <h3>❌ Không tìm thấy hoạt động</h3>
                <p>Hoạt động này không tồn tại hoặc đã bị xóa.</p>
                <a href="gallery.html" class="cta-button">← Về Trang Hoạt Động</a>
            </div>
        `;
        return;
    }
    
    if (!activity.active) {
        document.getElementById('activityInfo').innerHTML = `
            <div class="error-message">
                <h3>🔒 Hoạt động đã đóng</h3>
                <p>Hoạt động "${activity.title}" hiện không nhận bài tham gia.</p>
                <a href="gallery.html" class="cta-button">← Về Trang Hoạt Động</a>
            </div>
        `;
        return;
    }
    
    // Display activity info
    const typeText = activity.type === 'photo' ? '📸 Gửi Ảnh' : activity.type === 'text' ? '✍️ Viết Bài' : '🖼️ Gửi Ảnh và Bài Viết';
    
    document.getElementById('activityInfo').innerHTML = `
        <h2>${activity.title}</h2>
        <p class="activity-type">${typeText}</p>
        <p class="activity-description">${activity.description}</p>
        ${activity.deadline ? `<p class="activity-deadline">⏰ Hạn chót: ${formatDate(activity.deadline)}</p>` : ''}
    `;
    
    // Create form based on activity type
    createForm(activity);
}

// Create participation form
function createForm(activity) {
    let formHTML = '<h3>📝 Gửi Bài Tham Gia</h3><form id="submitForm">';
    
    formHTML += `
        <div class="form-group">
            <label for="participantName">Tên Zalo của bạn *</label>
            <input type="text" id="participantName" required placeholder="Tên hiển thị trên Zalo">
        </div>
    `;
    
    // Photo upload
    if (activity.type === 'photo' || activity.type === 'both') {
        formHTML += `
            <div class="form-group">
                <label for="photoLinks">Link Hình Ảnh * (mỗi link một dòng)</label>
                <textarea id="photoLinks" rows="4" required placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"></textarea>
                <small>📌 Upload ảnh lên Google Drive/Imgur rồi paste link vào đây</small>
            </div>
        `;
    }
    
    // Text submission
    if (activity.type === 'text' || activity.type === 'both') {
        formHTML += `
            <div class="form-group">
                <label for="textContent">Nội dung bài viết *</label>
                <textarea id="textContent" rows="8" required placeholder="Viết bài của bạn ở đây..."></textarea>
            </div>
        `;
    }
    
    formHTML += `
        <button type="submit" class="submit-button">Gửi Bài Tham Gia</button>
    </form>
    <div id="successMessage" class="success-message" style="display: none;">
        <p>✅ Đã gửi bài tham gia thành công!</p>
        <p>Cảm ơn bạn đã tham gia hoạt động.</p>
    </div>`;
    
    document.getElementById('participateForm').innerHTML = formHTML;
    
    // Handle form submission
    document.getElementById('submitForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitParticipation(activity);
    });
}

// Submit participation
function submitParticipation(activity) {
    const submission = {
        id: Date.now(),
        activityId: activity.id,
        activityTitle: activity.title,
        participantName: document.getElementById('participantName').value,
        submittedAt: new Date().toISOString()
    };
    
    if (activity.type === 'photo' || activity.type === 'both') {
        const photoLinks = document.getElementById('photoLinks').value;
        submission.photos = photoLinks.split('\n').map(link => link.trim()).filter(link => link);
    }
    
    if (activity.type === 'text' || activity.type === 'both') {
        submission.text = document.getElementById('textContent').value;
    }
    
    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));
    
    // Show success message
    document.getElementById('submitForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Load activity on page load
loadActivity();
