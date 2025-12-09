// URL Google Apps Script để lấy danh sách ảnh (Version 2)
const PHOTOS_API_URL = 'https://script.google.com/macros/s/AKfycbxFTpCg8uY8Jp1ACPwiD0LdFfsERSFrNKrzXGQcgWVqymWjJdOMmkdL2WZ4hPJXkGHezw/exec';

// Hàm load ảnh từ Google Sheets
async function loadPhotos() {
    try {
        const response = await fetch(PHOTOS_API_URL);
        const photos = await response.json();
        
        if (photos && photos.length > 0) {
            displayPhotos(photos);
        } else {
            console.log('Chưa có ảnh nào được upload');
        }
    } catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
    }
}

// Hàm hiển thị ảnh lên gallery
function displayPhotos(photos) {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Xóa placeholder cũ
    galleryGrid.innerHTML = '';
    
    // Thêm từng ảnh vào gallery
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'gallery-item';
        
        photoItem.innerHTML = `
            <img src="${photo.imageUrl}" alt="${photo.description}" loading="lazy">
            <div class="photo-info">
                <p class="photo-description">${photo.description}</p>
            </div>
        `;
        
        galleryGrid.appendChild(photoItem);
    });
}

// Load ảnh khi trang được tải
if (document.querySelector('.gallery-grid')) {
    loadPhotos();
}

// Load activities for gallery page
function loadGalleryActivities() {
    const container = document.getElementById('activitiesContainer');
    if (!container) return;
    
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activeActivities = activities.filter(a => a.active);
    
    if (activeActivities.length === 0) {
        container.innerHTML = '<div class="gallery-notice"><p>📢 Chưa có hoạt động nào được cập nhật</p></div>';
        return;
    }
    
    container.innerHTML = '<h2 class="gallery-title">🎯 Hoạt Động Đang Diễn Ra</h2>';
    
    activeActivities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'gallery-activity-card';
        
        const typeIcon = activity.type === 'photo' ? '📸' : activity.type === 'text' ? '✍️' : '🖼️';
        const typeText = activity.type === 'photo' ? 'Gửi Ảnh' : activity.type === 'text' ? 'Viết Bài' : 'Ảnh & Bài Viết';
        
        activityCard.innerHTML = `
            <h3>${activity.title}</h3>
            <p class="activity-type">${typeIcon} ${typeText}</p>
            <p class="activity-desc">${activity.description}</p>
            ${activity.deadline ? `<p class="activity-deadline">⏰ Hạn chót: ${formatActivityDate(activity.deadline)}</p>` : ''}
            <a href="participate.html?id=${activity.id}" class="cta-button primary">Tham Gia Ngay</a>
        `;
        
        container.appendChild(activityCard);
    });
}

function formatActivityDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Load activities on page load
if (document.getElementById('activitiesContainer')) {
    loadGalleryActivities();
}
