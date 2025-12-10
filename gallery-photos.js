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
// Member Activity Info Handler for Gallery Page
document.addEventListener('DOMContentLoaded', function() {
    const memberInfoBtnGallery = document.getElementById('memberInfoBtnGallery');
    
    if (memberInfoBtnGallery) {
        memberInfoBtnGallery.addEventListener('click', function() {
            showMemberActivityInfoGallery();
        });
    }
});

function showMemberActivityInfoGallery() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'member-info-overlay';
    overlay.innerHTML = `
        <div class="member-info-modal">
            <button class="modal-close" onclick="closeMemberInfoGallery()">&times;</button>
            <div class="modal-content">
                <div class="modal-icon">🎯</div>
                <h3>Thử Thách Bí Mật Tháng 12</h3>
                <div class="modal-subtitle">Hoạt động độc quyền cho thành viên Group</div>
                
                <div class="info-section">
                    <h4>🎮 Chi tiết hoạt động:</h4>
                    <ul>
                        <li><strong>Tuần 1 (15-21/12):</strong> Thử thách trí tuệ LGBT+ knowledge</li>
                        <li><strong>Tuần 2 (22-28/12):</strong> Chia sẻ câu chuyện cá nhân</li>
                        <li><strong>Tuần 3 (29-31/12):</strong> Mini-game tương tác và voting</li>
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>🏆 Phần thưởng chi tiết:</h4>
                    <ul>
                        <li><strong>Giải Nhất:</strong> Voucher 500K + Danh hiệu "Champion"</li>
                        <li><strong>Giải Nhì:</strong> Voucher 300K + Danh hiệu "Runner-up"</li>
                        <li><strong>Giải Ba:</strong> Voucher 200K + Danh hiệu "Top 3"</li>
                        <li><strong>Tham gia:</strong> Badge đặc biệt + Quyền ưu tiên sự kiện</li>
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>📋 Quy trình tham gia:</h4>
                    <ol>
                        <li>Tham gia Group Zalo chính thức</li>
                        <li>Tương tác tích cực trong Group ít nhất 3 ngày</li>
                        <li>Admin sẽ gửi link riêng vào ngày 15/12</li>
                        <li>Đăng ký tham gia qua link đó</li>
                        <li>Nhận hướng dẫn chi tiết qua tin nhắn riêng</li>
                    </ol>
                </div>
                
                <div class="warning-note">
                    <div class="warning-icon">🔒</div>
                    <p><strong>Bảo mật:</strong> Link hoạt động chỉ được chia sẻ riêng cho thành viên đủ điều kiện. Không chia sẻ link ra ngoài để đảm bảo tính độc quyền.</p>
                </div>
                
                <div class="modal-actions">
                    <a href="https://zalo.me/g/jvgoxt973" target="_blank" class="modal-btn primary">
                        💬 Tham Gia Group Ngay
                    </a>
                    <button class="modal-btn secondary" onclick="closeMemberInfoGallery()">
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

function closeMemberInfoGallery() {
    const overlay = document.querySelector('.member-info-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }, 300);
    }
}