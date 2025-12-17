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
