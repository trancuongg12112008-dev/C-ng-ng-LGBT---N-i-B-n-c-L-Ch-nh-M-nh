// Christmas Card Game Logic
class ChristmasCardGame {
    constructor() {
        this.cards = [
            '🎄', '🎅', '🤶', '🎁', '⭐', '🔔', '❄️', '🦌',
            '🎄', '🎅', '🤶', '🎁', '⭐', '🔔', '❄️', '🦌'
        ];
        this.gameBoard = document.getElementById('gameBoard');
        this.movesElement = document.getElementById('moves');
        this.matchesElement = document.getElementById('matches');
        this.timerElement = document.getElementById('timer');
        
        this.flippedCards = [];
        this.matchedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.gameStarted = false;
        this.gameTimer = null;
        this.startTime = null;
        
        // Daily play system
        this.eventEndDate = new Date('2025-12-25T23:59:59');
        this.hasPlayedToday = false;
        this.canPlay = true;
        
        this.checkDailyStatus();
        this.init();
    }
    
    init() {
        this.updateDailyInfo();
        
        if (!this.canPlay || this.hasPlayedToday) {
            this.showDailyStatus();
        } else {
            this.showStartButton();
        }
        
        this.createSnowfall();
    }

    showStartButton() {
        this.gameBoard.innerHTML = `
            <div class="start-game-container">
                <div class="start-message">
                    <h3>🎄 Sẵn Sàng Chơi? 🎄</h3>
                    <p>Nhấn nút bên dưới để bắt đầu trò chơi lật thẻ!</p>
                    <button class="start-game-btn" onclick="game.startGame()">🎮 Bắt Đầu Chơi</button>
                </div>
            </div>
        `;
    }

    checkDailyStatus() {
        const now = new Date();
        
        // Check if event has ended
        if (now > this.eventEndDate) {
            this.canPlay = false;
            return;
        }
        
        // Remove daily limit - can play anytime
        this.hasPlayedToday = false;
        this.canPlay = true;
    }

    updateDailyInfo() {
        const now = new Date();
        const daysLeft = Math.ceil((this.eventEndDate - now) / (1000 * 60 * 60 * 24));
        const totalScore = parseInt(localStorage.getItem('christmasGame_totalScore') || '0');
        const todayScore = parseInt(localStorage.getItem('christmasGame_todayScore') || '0');
        
        // Set initial timer display
        if (this.timerElement) {
            this.timerElement.textContent = '00:50';
        }
        
        // Check if daily info already exists
        const container = document.querySelector('.game-container');
        const existingDailyInfo = container.querySelector('.daily-info');
        
        if (!existingDailyInfo) {
            // Add daily info section
            const dailyInfo = document.createElement('div');
            dailyInfo.className = 'daily-info';
            dailyInfo.innerHTML = `
                <div class="daily-stats">
                    <div class="daily-stat">
                        <span class="stat-value">${totalScore}</span>
                        <span>Tổng Điểm</span>
                    </div>
                    <div class="daily-stat">
                        <span class="stat-value">${todayScore}</span>
                        <span>Điểm Hôm Nay</span>
                    </div>
                    <div class="daily-stat">
                        <span class="stat-value">${Math.max(0, daysLeft)}</span>
                        <span>Ngày Còn Lại</span>
                    </div>
                </div>
                <div class="event-progress">
                    <div class="progress-text">🎄 Sự Kiện Giáng Sinh 2025 🎄</div>
                    <div class="countdown-text">Kết thúc: 25/12/2025</div>
                    <div style="margin-top: 10px; font-size: 0.85rem; opacity: 0.9;">
                        ⏰ Thử thách 50 giây: Ghép 8 cặp thẻ | 15-30 điểm
                    </div>
                </div>
            `;
            
            const gameStats = container.querySelector('.game-stats');
            gameStats.before(dailyInfo);
        } else {
            // Update existing daily info
            const totalScoreElement = existingDailyInfo.querySelector('.daily-stat .stat-value');
            const todayScoreElement = existingDailyInfo.querySelectorAll('.daily-stat .stat-value')[1];
            const daysLeftElement = existingDailyInfo.querySelectorAll('.daily-stat .stat-value')[2];
            
            if (totalScoreElement) totalScoreElement.textContent = totalScore;
            if (todayScoreElement) todayScoreElement.textContent = todayScore;
            if (daysLeftElement) daysLeftElement.textContent = Math.max(0, daysLeft);
        }
    }

    showDailyStatus() {
        const now = new Date();
        
        if (now > this.eventEndDate) {
            // Event ended
            this.gameBoard.innerHTML = `
                <div class="event-ended">
                    <h3>🎄 Sự Kiện Đã Kết Thúc 🎄</h3>
                    <p>Cảm ơn bạn đã tham gia sự kiện Giáng Sinh!</p>
                    <p>Tổng điểm của bạn: <strong>${localStorage.getItem('christmasGame_totalScore') || '0'}</strong></p>
                    <div class="final-message">
                        <p>🎅 Chúc bạn có một mùa Giáng Sinh an lành và hạnh phúc! 🎅</p>
                    </div>
                </div>
            `;
        } else if (this.hasPlayedToday) {
            // Already played today
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            this.gameBoard.innerHTML = `
                <div class="daily-limit">
                    <div class="daily-stats">
                        <div class="daily-stat">
                            <span class="stat-value">${parseInt(localStorage.getItem('christmasGame_totalScore') || '0')}</span>
                            <span>Tổng Điểm</span>
                        </div>
                        <div class="daily-stat">
                            <span class="stat-value">${localStorage.getItem('christmasGame_todayScore') || '0'}</span>
                            <span>Điểm Hôm Nay</span>
                        </div>
                        <div class="daily-stat">
                            <span class="stat-value">✅</span>
                            <span>Đã Chơi</span>
                        </div>
                    </div>
                    <div class="event-progress">
                        <div class="progress-text">🎄 Hoàn Thành Lượt Chơi Hôm Nay 🎄</div>
                        <div class="countdown-text">Lượt chơi tiếp theo: <strong>00:00:00</strong></div>
                        <div style="margin-top: 10px; font-size: 0.85rem; opacity: 0.9;">
                            🌟 Hãy quay lại vào ngày mai để tiếp tục tích lũy điểm! 🌟
                        </div>
                    </div>
                </div>
            `;
            
            // Start countdown to next day
            this.startDailyCountdown(tomorrow);
        }
    }

    startDailyCountdown(nextPlayTime) {
        const updateCountdown = () => {
            const now = new Date();
            const timeLeft = nextPlayTime - now;
            
            if (timeLeft <= 0) {
                // New day, reload page
                window.location.reload();
                return;
            }
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const countdownElement = document.querySelector('.countdown-text strong');
            if (countdownElement) {
                countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    createBoard() {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.dataset.symbol = symbol;
            
            // Card back (Christmas tree pattern)
            card.innerHTML = '<div class="card-back">🎄</div>';
            
            // Add click event
            card.addEventListener('click', () => this.flipCard(card));
            
            this.gameBoard.appendChild(card);
        });
    }
    
    flipCard(card) {
        // Check if can play
        if (!this.canPlay || this.hasPlayedToday || !this.gameStarted) {
            return;
        }
        
        if (card.classList.contains('flipped') || 
            card.classList.contains('matched') || 
            this.flippedCards.length >= 2) {
            return;
        }
        
        // Add flip sound effect (visual feedback)
        this.createFlipEffect(card);
        
        card.classList.add('flipped');
        card.innerHTML = card.dataset.symbol;
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesElement.textContent = this.moves;
            this.animateStatUpdate(this.movesElement);
            this.checkMatch();
        }
    }

    createFlipEffect(card) {
        // Create sparkle effect on card flip
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = '1rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '10';
                sparkle.style.animation = 'magicFloat 1s ease-out forwards';
                
                card.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                    }
                }, 1000);
            }, i * 100);
        }
    }

    animateStatUpdate(element) {
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                
                this.matchedCards.push(card1, card2);
                this.matches++;
                this.matchesElement.textContent = this.matches;
                this.animateStatUpdate(this.matchesElement);
                
                // Create match celebration effect
                this.createMatchEffect(card1, card2);
                
                this.flippedCards = [];
                
                // Check if game is complete
                if (this.matchedCards.length === this.cards.length) {
                    this.gameComplete();
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.add('wrong');
                card2.classList.add('wrong');
                
                setTimeout(() => {
                    card1.classList.remove('flipped', 'wrong');
                    card2.classList.remove('flipped', 'wrong');
                    card1.innerHTML = '<div class="card-back">🎄</div>';
                    card2.innerHTML = '<div class="card-back">🎄</div>';
                    this.flippedCards = [];
                }, 500);
            }, 1000);
        }
    }
    
    startGame() {
        // If game hasn't been created yet, create it
        if (!this.gameStarted && this.gameBoard.querySelector('.start-game-container')) {
            this.shuffle();
            this.createBoard();
        }
        
        // Show instructions
        const instructions = document.getElementById('gameInstructions');
        if (instructions) {
            instructions.style.display = 'block';
            setTimeout(() => {
                instructions.style.display = 'none';
            }, 5000); // Hide after 5 seconds
        }
        
        this.gameStarted = true;
        this.startTime = Date.now();
        this.timeLimit = 50; // 50 seconds limit
        
        this.gameTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const timeLeft = Math.max(0, this.timeLimit - elapsed);
            
            // Update timer display (countdown)
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when time is running out
            if (timeLeft <= 15) {
                this.timerElement.className = 'timer-danger';
            } else if (timeLeft <= 30) {
                this.timerElement.className = 'timer-warning';
            } else {
                this.timerElement.className = '';
                this.timerElement.style.color = '#2c3e50';
            }
            
            // Auto end game when time runs out
            if (timeLeft <= 0 && this.gameStarted) {
                this.timeUp();
            }
        }, 1000);
    }

    timeUp() {
        clearInterval(this.gameTimer);
        this.gameStarted = false;
        
        // Show time up message
        setTimeout(() => {
            const todayScore = 0;
            const currentTotal = parseInt(localStorage.getItem('christmasGame_totalScore') || '0');
            const newTotal = currentTotal + todayScore;
            
            // Save progress
            localStorage.setItem('christmasGame_todayScore', todayScore.toString());
            localStorage.setItem('christmasGame_totalScore', newTotal.toString());
            this.hasPlayedToday = false;
            
            document.getElementById('finalStats').innerHTML = `
                <strong>⏰ Hết Thời Gian! ⏰</strong><br>
                ⏱️ Thời gian: 00:50 (Hết giờ)<br>
                🎯 Số lượt chơi: ${this.moves}<br>
                🎮 Cặp đã ghép: ${this.matches}/8<br>
                <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.3);">
                <strong>📊 Kết Quả:</strong><br>
                ⏰ Quá Thời Gian<br>
                <strong style="color: #e74c3c; font-size: 1.2rem;">❌ 0 điểm</strong><br>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Cần hoàn thành trong 50 giây để ghi điểm
                </div><br>
                <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.3);">
                <strong style="color: #3498db;">🌟 Tổng điểm tích lũy: ${newTotal}</strong><br>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    💪 Đừng bỏ cuộc! Thử lại vào ngày mai!<br>
                    🏆 Mẹo: Ghi nhớ vị trí các thẻ để chơi nhanh hơn
                </div>
            `;
            
            document.getElementById('victoryMessage').querySelector('h3').textContent = '⏰ Hết Thời Gian!';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('victoryMessage').style.display = 'block';
        }, 500);
    }
    
    gameComplete() {
        clearInterval(this.gameTimer);
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        // Calculate score based on 50 second time limit
        const totalSeconds = Math.floor(elapsed / 1000);
        let todayScore;
        let timeRating;
        
        if (totalSeconds <= 50) {
            // Score for completing within 50 seconds (15-30 points)
            const timeBonus = Math.floor((50 - totalSeconds) / 3.33); // 0-15 bonus
            todayScore = 15 + Math.min(15, timeBonus); // 15-30 points
            timeRating = "🏆 Hoàn Hảo";
        } else {
            // No points for taking longer than 50 seconds
            todayScore = 0;
            timeRating = "⏰ Quá Thời Gian";
        }
        
        // Save score (no daily limit)
        localStorage.setItem('christmasGame_todayScore', todayScore.toString());
        
        // Update total score
        const currentTotal = parseInt(localStorage.getItem('christmasGame_totalScore') || '0');
        const newTotal = currentTotal + todayScore;
        localStorage.setItem('christmasGame_totalScore', newTotal.toString());
        
        // No daily limit - can play again
        this.hasPlayedToday = false;
        
        // Show victory message
        setTimeout(() => {
            document.getElementById('finalStats').innerHTML = `
                <strong>🎉 Chúc Mừng! 🎉</strong><br>
                ⏱️ Thời gian: ${minutes}:${seconds.toString().padStart(2, '0')}<br>
                🎯 Số lượt chơi: ${this.moves}<br>
                <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.3);">
                <strong>📊 Kết Quả:</strong><br>
                ${timeRating}<br>
                ${todayScore > 0 ? 
                    `<strong style="color: #27ae60; font-size: 1.5rem;">✨ +${todayScore} điểm</strong><br>
                     <div style="font-size: 0.9rem; margin-top: 5px;">
                         Thời gian còn lại: ${Math.max(0, 50 - totalSeconds)} giây
                     </div>` : 
                    `<strong style="color: #e74c3c; font-size: 1.2rem;">❌ 0 điểm</strong><br>
                     <div style="font-size: 0.9rem; margin-top: 5px;">
                         Vượt quá ${totalSeconds - 50} giây
                     </div>`
                }<br>
                <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.3);">
                <strong style="color: #3498db;">🌟 Tổng điểm tích lũy: ${newTotal}</strong><br>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    ⏰ Thử thách: Ghép 8 cặp thẻ trong 50 giây!<br>
                    🏆 Càng nhanh càng nhiều điểm (15-30 điểm)
                </div>
            `;
            document.getElementById('victoryMessage').querySelector('h3').textContent = '🎄 Hoàn Thành Lượt Chơi Hôm Nay! 🎄';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('victoryMessage').style.display = 'block';
            
            // Create celebration effect
            this.createCelebration();
        }, 1000);
    }
    
    createCelebration() {
        const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💖', '🏳️‍🌈', '🎄', '🎅', '🤶', '🎁'];
        
        // Create fireworks effect
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                emoji.style.position = 'fixed';
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-50px';
                emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
                emoji.style.zIndex = '1001';
                emoji.style.pointerEvents = 'none';
                emoji.style.animation = `snowfall ${Math.random() * 2 + 3}s linear forwards`;
                emoji.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.remove();
                    }
                }, 5000);
            }, i * 80);
        }

        // Create rainbow confetti burst
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = '50%';
                confetti.style.top = '50%';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
                confetti.style.zIndex = '1001';
                confetti.style.pointerEvents = 'none';
                confetti.style.borderRadius = '50%';
                
                const angle = (Math.PI * 2 * i) / 15;
                const velocity = Math.random() * 300 + 200;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                confetti.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(1)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(${vx - 50}px, ${vy - 50}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    createSnowfall() {
        const snowflakes = ['❄️', '❅', '❆', '🌟', '✨'];
        
        // Create continuous snowfall
        setInterval(() => {
            if (Math.random() < 0.4) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                snowflake.style.left = Math.random() * window.innerWidth + 'px';
                snowflake.style.animationDuration = (Math.random() * 4 + 3) + 's';
                snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
                
                document.body.appendChild(snowflake);
                
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.remove();
                    }
                }, 7000);
            }
        }, 200);

        // Create magic particles
        setInterval(() => {
            if (Math.random() < 0.2) {
                const particle = document.createElement('div');
                particle.className = 'magic-particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 4000);
            }
        }, 1000);
    }
    
    reset() {
        // Clear timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // Reset game state
        this.flippedCards = [];
        this.matchedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.gameStarted = false;
        this.startTime = null;
        
        // Update UI
        if (this.movesElement) this.movesElement.textContent = '0';
        if (this.matchesElement) this.matchesElement.textContent = '0';
        if (this.timerElement) {
            this.timerElement.textContent = '00:50';
            this.timerElement.className = '';
            this.timerElement.style.color = '#2c3e50';
            this.timerElement.style.fontWeight = 'normal';
        }
        
        // Recreate board
        this.shuffle();
        this.createBoard();
    }

    createMatchEffect(card1, card2) {
        // Create hearts floating up from matched cards
        [card1, card2].forEach(card => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = '💖';
                    heart.style.position = 'absolute';
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    heart.style.transform = 'translate(-50%, -50%)';
                    heart.style.fontSize = '1.5rem';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '10';
                    
                    heart.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(1)',
                            opacity: 1
                        },
                        { 
                            transform: `translate(-50%, -150px) scale(0.5)`,
                            opacity: 0
                        }
                    ], {
                        duration: 1500,
                        easing: 'ease-out'
                    });
                    
                    card.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }, 1500);
                }, i * 200);
            }
        });
    }
}

// Global functions
let game;

function startNewGame() {
    // Check if can start new game
    const now = new Date();
    const eventEndDate = new Date('2025-12-25T23:59:59');
    
    if (now > eventEndDate) {
        alert('🎄 Sự kiện Giáng Sinh đã kết thúc! Cảm ơn bạn đã tham gia! 🎄');
        return;
    }
    
    // Reset game and show start button
    if (game) {
        game.gameStarted = false;
        game.showStartButton();
    } else {
        game = new ChristmasCardGame();
    }
}

function closeVictory() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('victoryMessage').style.display = 'none';
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Ensure header is visible
        const gameHeader = document.querySelector('.game-header');
        if (gameHeader) {
            gameHeader.style.display = 'block';
            gameHeader.style.visibility = 'visible';
        }
        
        game = new ChristmasCardGame();
    } catch (error) {
        console.error('Error initializing game:', error);
        // Fallback: create a simple board
        const gameBoard = document.getElementById('gameBoard');
        if (gameBoard) {
            gameBoard.innerHTML = '<p style="text-align: center; padding: 2rem;">Đang tải trò chơi...</p>';
        }
    }
});

// Christmas Music Control
class ChristmasMusicPlayer {
    constructor() {
        this.music1 = document.getElementById('christmasMusic1');
        this.music2 = document.getElementById('christmasMusic2');
        this.musicControl = document.getElementById('musicControl');
        this.currentTrack = 1;
        this.isPlaying = false;
        this.volume = 0.3; // Set volume to 30%
        
        // Debug: Check if audio elements exist
        console.log('Music1 element:', this.music1);
        console.log('Music2 element:', this.music2);
        
        if (!this.music1 || !this.music2) {
            console.error('Audio elements not found!');
            return;
        }
        
        this.init();
    }
    
    init() {
        if (this.music1) this.music1.volume = this.volume;
        if (this.music2) this.music2.volume = this.volume;
        

        
        // Handle track ending (switch to next track)
        if (this.music1) {
            this.music1.addEventListener('ended', () => this.switchTrack());
        }
        if (this.music2) {
            this.music2.addEventListener('ended', () => this.switchTrack());
        }
        
        // Always show music button on game page
        this.showMusicButton();
        
        // Check if autoplay is requested from gallery page
        const urlParams = new URLSearchParams(window.location.search);
        const shouldAutoplay = urlParams.get('autoplay') === 'true';
        
        if (shouldAutoplay) {
            // Try to auto-start music when coming from gallery
            setTimeout(() => {
                this.startMusic();
                const enableBtn = document.getElementById('enableMusicBtn');
                if (enableBtn && this.isPlaying) {
                    enableBtn.style.display = 'none';
                }
                console.log('Auto-starting music from gallery navigation');
            }, 500);
        }
        
        // Also allow manual start with any click
        document.addEventListener('click', () => {
            if (!this.isPlaying) {
                this.startMusic();
                const enableBtn = document.getElementById('enableMusicBtn');
                if (enableBtn && this.isPlaying) {
                    enableBtn.style.display = 'none';
                }
            }
        }, { once: true });
    }
    
    toggleMusic() {
        if (this.isPlaying) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
    }
    
    startMusic() {
        try {
            const currentMusic = this.currentTrack === 1 ? this.music1 : this.music2;
            console.log('Attempting to start music, current track:', this.currentTrack);
            console.log('Current music element:', currentMusic);
            
            if (currentMusic) {
                // Reset and prepare audio
                currentMusic.currentTime = 0;
                currentMusic.muted = false;
                currentMusic.volume = this.volume;
                
                // Try to play
                const playPromise = currentMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.isPlaying = true;
                        console.log('Christmas music started successfully');
                    }).catch(error => {
                        console.log('Music autoplay prevented, trying alternative method:', error);
                        this.forceAutoplay();
                    });
                } else {
                    // Older browsers
                    this.isPlaying = true;
                    console.log('Music started (older browser)');
                }
            } else {
                console.error('No music element available');
            }
        } catch (error) {
            console.error('Error playing music:', error);
            this.forceAutoplay();
        }
    }
    
    forceAutoplay() {
        // Alternative method to force autoplay
        const currentMusic = this.currentTrack === 1 ? this.music1 : this.music2;
        if (currentMusic) {
            currentMusic.muted = true;
            currentMusic.play().then(() => {
                setTimeout(() => {
                    currentMusic.muted = false;
                    this.isPlaying = true;
                    console.log('Christmas music started with alternative method');
                }, 100);
            }).catch(error => {
                console.log('All autoplay methods failed:', error);
            });
        }
    }
    
    stopMusic() {
        if (this.music1) this.music1.pause();
        if (this.music2) this.music2.pause();
        this.isPlaying = false;
    }
    
    switchTrack() {
        this.stopMusic();
        this.currentTrack = this.currentTrack === 1 ? 2 : 1;
        if (this.isPlaying) {
            setTimeout(() => this.startMusic(), 1000); // 1 second gap between tracks
        }
    }
    

    
    showMusicButton() {
        const enableBtn = document.getElementById('enableMusicBtn');
        const notification = document.getElementById('musicNotification');
        
        console.log('Showing music button, element found:', !!enableBtn);
        
        if (enableBtn) {
            enableBtn.style.display = 'block';
            enableBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Music button clicked');
                
                // Change button text to show it's working
                enableBtn.innerHTML = '⏳ Đang Bật...';
                
                this.startMusic();
                
                // Check after a short delay if music started
                setTimeout(() => {
                    if (this.isPlaying) {
                        enableBtn.style.display = 'none';
                        
                        // Show notification
                        if (notification) {
                            notification.style.display = 'block';
                            setTimeout(() => {
                                notification.style.display = 'none';
                            }, 3000);
                        }
                        console.log('Music started successfully, hiding button');
                    } else {
                        // If music didn't start, change button text
                        enableBtn.innerHTML = '🔄 Thử Lại';
                        setTimeout(() => {
                            enableBtn.innerHTML = '🎵 Bật Nhạc Giáng Sinh';
                        }, 2000);
                        console.log('Music failed to start, showing retry option');
                    }
                }, 1000);
            });
        } else {
            console.error('Music button element not found!');
        }
    }
}

// Initialize music player
let musicPlayer;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for all elements to be loaded
    setTimeout(() => {
        try {
            musicPlayer = new ChristmasMusicPlayer();
            console.log('Music player initialized successfully');
        } catch (error) {
            console.error('Error initializing music player:', error);
        }
    }, 2000); // Increased delay to ensure audio elements are loaded
});