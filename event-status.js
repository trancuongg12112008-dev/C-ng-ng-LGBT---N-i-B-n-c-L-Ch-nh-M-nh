// Update event status and link based on current date
function updateEventStatus() {
    const now = new Date();
    const eventStartDate = new Date('2025-12-12T00:00:00'); // 12/12/2025
    const eventEndDate = new Date('2025-12-30T23:59:59');   // 30/12/2025
    
    const badge = document.querySelector('.activity-badge');
    const actionLink = document.querySelector('.activity-actions .cta-button');
    
    if (!badge || !actionLink) return;
    
    if (now >= eventStartDate && now <= eventEndDate) {
        // Event is active
        badge.innerHTML = '🎯 Đang Diễn Ra';
        badge.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        badge.style.animation = 'none';
        actionLink.href = 'https://forms.gle/P9V1kfp4hQKZKSpb6';
        actionLink.target = '_blank';
        actionLink.innerHTML = '🚀 Tham Gia Ngay';
    } else if (now > eventEndDate) {
        // Event has ended
        badge.innerHTML = '⏰ Đã Kết Thúc';
        badge.style.background = 'linear-gradient(45deg, #95a5a6, #7f8c8d)';
        badge.style.animation = 'none';
        actionLink.href = '#';
        actionLink.innerHTML = '📋 Sự Kiện Đã Kết Thúc';
        actionLink.onclick = function(e) {
            e.preventDefault();
            alert('Sự kiện đã kết thúc. Cảm ơn bạn đã quan tâm!');
        };
    } else {
        // Event hasn't started yet (default state)
        badge.innerHTML = '🔥 Sắp Diễn Ra';
        badge.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        badge.style.animation = 'pulse-badge 2s ease-in-out infinite';
        actionLink.href = 'coming-soon.html';
        actionLink.innerHTML = '🚀 Tham Gia Ngay';
    }
}

// Update status when page loads
document.addEventListener('DOMContentLoaded', updateEventStatus);

// Check every hour
setInterval(updateEventStatus, 3600000);