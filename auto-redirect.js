// Auto redirect when event starts
function checkEventDate() {
    const now = new Date();
    const eventStartDate = new Date('2025-12-12T00:00:00'); // 12/12/2025
    const eventEndDate = new Date('2025-12-30T23:59:59');   // 30/12/2025
    
    // If current date is within event period
    if (now >= eventStartDate && now <= eventEndDate) {
        // Redirect to Google Form
        window.location.href = 'https://forms.gle/P9V1kfp4hQKZKSpb6';
    }
}

// Check immediately when page loads
checkEventDate();

// Check every hour (3600000 milliseconds)
setInterval(checkEventDate, 3600000);