// Contest Status Management
class ContestStatus {
    constructor() {
        this.contestEndDate = new Date('2025-12-30T23:59:59');
        this.init();
    }

    init() {
        // Check contest status when page loads
        this.checkContestStatus();
        
        // Add event listeners to participate buttons
        this.addEventListeners();
    }

    checkContestStatus() {
        const now = new Date();
        const isContestEnded = now > this.contestEndDate;
        
        if (isContestEnded) {
            this.updateButtonsForEndedContest();
        }
    }

    addEventListeners() {
        // Gallery page participate button
        const galleryParticipateBtn = document.querySelector('.activity-actions .cta-button');
        if (galleryParticipateBtn) {
            galleryParticipateBtn.addEventListener('click', (e) => {
                if (this.isContestEnded()) {
                    e.preventDefault();
                    this.showContestEndedModal();
                }
            });
        }

        // Popup participate button
        const popupParticipateBtn = document.querySelector('.popup-btn.primary');
        if (popupParticipateBtn) {
            popupParticipateBtn.addEventListener('click', (e) => {
                if (this.isContestEnded()) {
                    e.preventDefault();
                    this.showContestEndedModal();
                }
            });
        }
    }

    isContestEnded() {
        const now = new Date();
        return now > this.contestEndDate;
    }

    updateButtonsForEndedContest() {
        // Update gallery button
        const galleryBtn = document.querySelector('.activity-actions .cta-button');
        if (galleryBtn) {
            galleryBtn.innerHTML = '🔒 Cuộc Thi Đã Kết Thúc';
            galleryBtn.style.background = '#6c757d';
            galleryBtn.style.cursor = 'not-allowed';
        }

        // Update popup button
        const popupBtn = document.querySelector('.popup-btn.primary');
        if (popupBtn) {
            popupBtn.innerHTML = '🔒 Cuộc Thi Đã Kết Thúc';
            popupBtn.style.background = '#6c757d';
            popupBtn.style.cursor = 'not-allowed';
        }

        // Update activity badge
        const activityBadge = document.querySelector('.activity-badge');
        if (activityBadge) {
            activityBadge.innerHTML = '🔒 Đã Kết Thúc';
            activityBadge.style.background = '#6c757d';
        }
    }

    showContestEndedModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'contest-ended-overlay';
        overlay.innerHTML = `
            <div class="contest-ended-modal">
                <button class="modal-close" onclick="closeContestEndedModal()">&times;</button>
                <div class="modal-content">
                    <div class="modal-icon">🔒</div>
                    <h3>Cuộc Thi Đã Kết Thúc</h3>
                    <div class="modal-subtitle">Cảm ơn bạn đã quan tâm!</div>
                    
                    <div class="ended-info">
                        <p>Cuộc thi <strong>"Trò Chơi Tháng 12"</strong> đã chính thức kết thúc vào ngày <strong>30/12/2025</strong>.</p>
                        <p>Chúng tôi không còn nhận thêm bài dự thi nào.</p>
                    </div>
                    
                    <div class="next-contest-info">
                        <h4>🎉 Cuộc Thi Tiếp Theo</h4>
                        <p>Vui lòng chờ đợi cuộc thi lần sau với nhiều phần thưởng hấp dẫn hơn!</p>
                        <p>Thông tin sẽ được cập nhật trong Group Zalo.</p>
                    </div>
                    
                    <div class="result-reminder">
                        <h4>🏆 Kết Quả & Trao Giải</h4>
                        <p><strong>1/1/2026:</strong> Công bố kết quả trong Group Zalo</p>
                        <p><strong>2/1/2026:</strong> Trao giải và đăng lên trang hoạt động</p>
                        <p>Theo dõi Group Zalo để không bỏ lỡ thông báo!</p>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="https://zalo.me/g/jvgoxt973" target="_blank" class="modal-btn primary">
                            💬 Tham Gia Group Zalo
                        </a>
                        <button class="modal-btn secondary" onclick="closeContestEndedModal()">
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
}

// Global function to close modal
function closeContestEndedModal() {
    const overlay = document.querySelector('.contest-ended-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContestStatus();
});