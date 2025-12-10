// Activity Popup Management
class ActivityPopup {
    constructor() {
        this.popup = document.getElementById('activityPopup');
        this.closeBtn = document.getElementById('closePopup');
        this.closePopupBtn = document.getElementById('closePopupBtn');
        this.storageKey = 'activityPopupClosed';
        this.init();
    }

    init() {
        // Check if popup should be shown
        if (this.shouldShowPopup()) {
            this.showPopup();
        }

        // Add event listeners
        this.closeBtn.addEventListener('click', () => this.hidePopup());
        this.closePopupBtn.addEventListener('click', () => this.hidePopup());
        
        // Close on overlay click/touch
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });
        
        // Add touch support for mobile
        this.popup.addEventListener('touchstart', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.hidePopup();
            }
        });
    }

    shouldShowPopup() {
        // Always show popup every time user visits the page
        return true;
    }

    showPopup() {
        // Show popup after a short delay for better UX
        setTimeout(() => {
            this.popup.classList.add('show');
            // Prevent background scrolling on mobile
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }, 1500);
    }

    hidePopup() {
        this.popup.classList.remove('show');
        // Restore scrolling on mobile
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        // No need to remember popup state - it will show again on next visit
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ActivityPopup();
});