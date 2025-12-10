// Update event status on home page
function updateHomeEventStatus() {
    const now = new Date();
    const eventStartDate = new Date('2025-12-12T00:00:00'); // 12/12/2025
    const eventEndDate = new Date('2025-12-30T23:59:59');   // 30/12/2025
    
    const badge = document.getElementById('homeBadge');
    
    if (!badge) return;
    
    if (now >= eventStartDate && now <= eventEndDate) {
        // Event is active
        badge.innerHTML = '🎯 Đang Diễn Ra';
        badge.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        badge.style.animation = 'none';
    } else if (now > eventEndDate) {
        // Event has ended
        badge.innerHTML = '⏰ Đã Kết Thúc';
        badge.style.background = 'linear-gradient(45deg, #95a5a6, #7f8c8d)';
        badge.style.animation = 'none';
    } else {
        // Event hasn't started yet (default state)
        badge.innerHTML = '🔥 Sắp Diễn Ra';
        badge.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        badge.style.animation = 'pulse-badge 2s ease-in-out infinite';
    }
}

// Update status when page loads
document.addEventListener('DOMContentLoaded', updateHomeEventStatus);

// Check every hour
setInterval(updateHomeEventStatus, 3600000);