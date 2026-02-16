/* ============================================
   BIRTHDAY SITE FOR FARAH - Main Script
   ============================================ */

// ==========================================
// CONFIG
// ==========================================
const CONFIG = {
    password: 'farouhaelfa2oush', // lowercase for comparison
    songAnswers: [
        'hessiny', 'hesseeni', 'hessiny', 'hesseeny',
        '7esini', '7essini', '7essiny', '7esiny',
        'hessini', 'hesini', 'heseeni', 'heseeny',
        '7esiny', '7eseeni', '7eseeny', '7eseni',
        'heseny', 'hesini'
    ],
    firstLoveDate: '12/10',
    sunoLink: 'https://suno.com/s/AWDSns9ENfLhouQw'
};

// ==========================================
// STATE
// ==========================================
let currentPage = 'pagePassword';
let teaseStep = 0;
let yesScale = 1;
let noAttempts = 0;

// ==========================================
// DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initPasswordPage();
    initSongQuiz();
    initLoveQuiz();
    initTeasePage();
    initValentinePage();
    initGoodChoicePage();
    initSongReveal();
    initFinalPage();
    initSparkles();
});

// ==========================================
// FLOATING HEARTS BACKGROUND
// ==========================================
function initFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💕', '💖', '💗', '❤️', '💘', '🩷', '♥️', '💝'];
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.2;
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }
    
    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 400);
    }
    
    // Keep creating hearts
    setInterval(createHeart, 1200);
}

// ==========================================
// PAGE NAVIGATION
// ==========================================
function goToPage(pageId) {
    const oldPage = document.getElementById(currentPage);
    const newPage = document.getElementById(pageId);
    
    if (!newPage) return;
    
    // Leave old page
    oldPage.classList.add('leaving');
    
    setTimeout(() => {
        oldPage.classList.remove('active', 'leaving');
        
        // Enter new page
        newPage.classList.add('active', 'entering');
        newPage.scrollTop = 0;
        currentPage = pageId;
        
        setTimeout(() => {
            newPage.classList.remove('entering');
        }, 600);
    }, 400);
}

// ==========================================
// SECTION 0: PASSWORD
// ==========================================
function initPasswordPage() {
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('passwordBtn');
    const error = document.getElementById('passwordError');
    
    function checkPassword() {
        const value = input.value.trim().toLowerCase();
        if (value === CONFIG.password) {
            error.classList.remove('show');
            input.style.borderColor = 'var(--pink)';
            input.style.background = '#fff0f5';
            
            // Success animation
            btn.textContent = '💖';
            btn.style.background = 'linear-gradient(135deg, #FF4DA6, #FF69B4)';
            
            setTimeout(() => {
                goToPage('pageWelcome');
            }, 600);
        } else {
            error.classList.add('show');
            input.classList.add('shake');
            input.style.borderColor = '#e74c3c';
            
            setTimeout(() => {
                input.classList.remove('shake');
                input.style.borderColor = 'var(--pink-light)';
            }, 600);
        }
    }
    
    btn.addEventListener('click', checkPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
    
    // Clear error on typing
    input.addEventListener('input', () => {
        error.classList.remove('show');
    });
}

// ==========================================
// WELCOME PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startQuizBtn');
    startBtn.addEventListener('click', () => {
        goToPage('pageSong');
    });
});

// ==========================================
// SECTION 2: SONG QUIZ
// ==========================================
function initSongQuiz() {
    const input = document.getElementById('songInput');
    const btn = document.getElementById('songBtn');
    const error = document.getElementById('songError');
    const success = document.getElementById('songSuccess');
    
    function checkSong() {
        const value = input.value.trim().toLowerCase().replace(/\s+/g, '');
        
        // Check against all variations
        const isCorrect = CONFIG.songAnswers.some(answer => {
            return value.includes(answer.toLowerCase());
        });
        
        if (isCorrect) {
            error.classList.remove('show');
            success.textContent = 'Aywa bravo ya Farouha! 🎵💕';
            success.classList.add('show');
            input.style.borderColor = 'var(--pink)';
            input.style.background = '#fff0f5';
            launchConfetti();
            
            setTimeout(() => {
                goToPage('pageLove');
            }, 2000);
        } else if (value.length > 0) {
            error.classList.add('show');
            success.classList.remove('show');
            input.classList.add('shake');
            
            setTimeout(() => {
                input.classList.remove('shake');
            }, 600);
        }
    }
    
    btn.addEventListener('click', checkSong);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkSong();
    });
    input.addEventListener('input', () => {
        error.classList.remove('show');
    });
}

// ==========================================
// SECTION 3: FIRST I LOVE YOU QUIZ (date input)
// ==========================================
function initLoveQuiz() {
    const input = document.getElementById('loveInput');
    const btn = document.getElementById('loveBtn');
    const error = document.getElementById('loveError');
    const success = document.getElementById('loveSuccess');
    const emojiReaction = document.getElementById('emojiReaction');
    
    // Auto-format: as user types digits, insert / after 2nd digit
    input.addEventListener('input', (e) => {
        let value = input.value.replace(/[^0-9]/g, '');
        if (value.length > 4) value = value.substring(0, 4);
        if (value.length >= 3) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        input.value = value;
        error.classList.remove('show');
    });
    
    // Prevent non-numeric input
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkLoveDate();
            return;
        }
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
    
    function showEmojiReaction(emoji, onDone) {
        emojiReaction.textContent = emoji;
        emojiReaction.classList.remove('show');
        // Force reflow
        void emojiReaction.offsetWidth;
        emojiReaction.style.opacity = '1';
        emojiReaction.classList.add('show');
        
        setTimeout(() => {
            emojiReaction.classList.remove('show');
            emojiReaction.style.opacity = '0';
            if (onDone) onDone();
        }, 1800);
    }
    
    function checkLoveDate() {
        const value = input.value.trim();
        
        if (value === '12/10') {
            // Correct!
            error.classList.remove('show');
            input.style.borderColor = 'var(--pink)';
            input.style.background = '#fff0f5';
            
            // Show error msg first (just kidding effect) then emoji
            setTimeout(() => {
                showEmojiReaction('🥰', () => {
                    success.textContent = 'Shatoura Farouha habibet albyy ❤️😉';
                    success.classList.add('show');
                    launchConfetti();
                    
                    setTimeout(() => {
                        goToPage('pageTease');
                    }, 2000);
                });
            }, 300);
        } else if (value.length >= 4 || value.length === 5) {
            // Wrong answer
            error.classList.add('show');
            input.classList.add('shake');
            
            setTimeout(() => {
                input.classList.remove('shake');
            }, 600);
            
            // Show angry emoji after 1 second
            setTimeout(() => {
                showEmojiReaction('😡');
            }, 1000);
        }
    }
    
    btn.addEventListener('click', checkLoveDate);
}

// ==========================================
// SECTION 5: TEASE BUILD-UP
// ==========================================
function initTeasePage() {
    const messages = [
        document.getElementById('tease1'),
        document.getElementById('tease2'),
        document.getElementById('tease3'),
        document.getElementById('tease4')
    ];
    const nextBtn = document.getElementById('teaseNextBtn');
    
    // Show first tease, then button after delay
    const observer = new MutationObserver(() => {
        if (document.getElementById('pageTease').classList.contains('active')) {
            teaseStep = 0;
            messages.forEach((m, i) => {
                if (i === 0) m.classList.remove('hidden');
                else m.classList.add('hidden');
            });
            
            setTimeout(() => {
                nextBtn.classList.remove('hidden');
            }, 1500);
        }
    });
    
    observer.observe(document.getElementById('pageTease'), {
        attributes: true,
        attributeFilter: ['class']
    });
    
    nextBtn.addEventListener('click', () => {
        teaseStep++;
        
        if (teaseStep < messages.length) {
            // Hide all, show current
            messages.forEach(m => m.classList.add('hidden'));
            messages[teaseStep].classList.remove('hidden');
            
            // Change button text based on which message is NOW showing
            if (teaseStep === 1) {
                // Now showing "Gahzaaaa ???" → button to proceed
                nextBtn.textContent = 'Geddann!! 🤩';
            } else if (teaseStep === 2) {
                // Now showing "Mota7amessaaaa" → button to proceed
                nextBtn.textContent = 'Awwyyyy! 🤩';
            } else if (teaseStep === 3) {
                // Now showing "Yalla beeeeeena" → final button
                nextBtn.textContent = 'Yalla ya amouurr! 💕';
            }
        } else {
            // Go to valentine page
            goToPage('pageValentine');
        }
    });
}

// ==========================================
// SECTION 6: VALENTINE - NO BUTTON RUNS AWAY
// ==========================================
function initValentinePage() {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const page = document.getElementById('pageValentine');
    
    function moveNoButton() {
        noAttempts++;
        const container = page;
        const rect = container.getBoundingClientRect();
        
        // Get random position within the page bounds
        const maxX = rect.width - btnNo.offsetWidth - 20;
        const maxY = rect.height - btnNo.offsetHeight - 20;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
        btnNo.style.position = 'fixed';
        
        // Make YES button grow with each attempt
        yesScale += 0.08;
        btnYes.style.transform = `scale(${Math.min(yesScale, 1.6)})`;
        
        // Change NO button text based on attempts
        const noTexts = [
            'La2 ya amouuurr 🤪',
            'Hmmmm No 😅',
            'La2 ba2a 😤',
            'NOOO 🏃‍♀️',
            'Enty mesh hatemsekeeny! hehe 🤪',
            '💨💨💨',
            'Still no! 😤',
            'La2aa ya Modyyy! 😝',
            'Shokran ya Mody motshakera geddan 😝',
        ];
        
        btnNo.textContent = noTexts[Math.min(noAttempts, noTexts.length - 1)];
    }
    
    // Mouse hover (desktop)
    btnNo.addEventListener('mouseenter', moveNoButton);
    
    // Touch move (mobile)
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    }, { passive: false });
    
    // YES button click
    btnYes.addEventListener('click', () => {
        launchConfetti();
        launchConfetti(); // Double confetti!
        
        setTimeout(() => {
            goToPage('pageGoodChoice');
        }, 800);
    });
}

// ==========================================
// SECTION 7: GOOD CHOICE
// ==========================================
function initGoodChoicePage() {
    const btnChangeNo = document.getElementById('btnChangeNo');
    const continueBtn = document.getElementById('continueBtn');
    
    // The "change mind" no button also runs away
    btnChangeNo.addEventListener('mouseenter', () => {
        const page = document.getElementById('pageGoodChoice');
        const rect = page.getBoundingClientRect();
        
        const maxX = rect.width - btnChangeNo.offsetWidth - 40;
        const maxY = rect.height - btnChangeNo.offsetHeight - 40;
        
        btnChangeNo.style.left = Math.floor(Math.random() * maxX) + 'px';
        btnChangeNo.style.top = Math.floor(Math.random() * maxY) + 'px';
        btnChangeNo.style.position = 'fixed';
    });
    
    btnChangeNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const page = document.getElementById('pageGoodChoice');
        const rect = page.getBoundingClientRect();
        
        const maxX = rect.width - btnChangeNo.offsetWidth - 40;
        const maxY = rect.height - btnChangeNo.offsetHeight - 40;
        
        btnChangeNo.style.left = Math.floor(Math.random() * maxX) + 'px';
        btnChangeNo.style.top = Math.floor(Math.random() * maxY) + 'px';
        btnChangeNo.style.position = 'fixed';
    }, { passive: false });
    
    // Continue → Surprise transition → Song
    continueBtn.addEventListener('click', () => {
        goToPage('pageSurprise');
        
        // Auto-advance after 2.5 seconds
        setTimeout(() => {
            goToPage('pageSongReveal');
        }, 2500);
    });
}

// ==========================================
// SECTION 8: SONG REVEAL (MP3 + LYRICS)
// ==========================================
function initSongReveal() {
    const toFinalBtn = document.getElementById('toFinalBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audio = document.getElementById('songAudio');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');
    const progressBar = document.getElementById('audioProgress');
    const audioTime = document.getElementById('audioTime');
    const progressContainer = document.querySelector('.audio-progress');
    
    let isPlaying = false;
    
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.textContent = '▶';
            playText.textContent = 'Play';
            playPauseBtn.classList.remove('playing');
        } else {
            audio.play();
            playIcon.textContent = '⏸';
            playText.textContent = 'Pause';
            playPauseBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = pct + '%';
            audioTime.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
        }
    });
    
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.textContent = '▶';
        playText.textContent = 'Tany? 🔁';
        playPauseBtn.classList.remove('playing');
        progressBar.style.width = '0%';
    });
    
    // Click on progress bar to seek
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (audio.duration) {
                audio.currentTime = pct * audio.duration;
            }
        });
    }
    
    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }
    
    toFinalBtn.addEventListener('click', () => {
        // Pause audio if playing
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        }
        goToPage('pageFinal');
        setTimeout(startHeartExplosion, 500);
    });
}

// ==========================================
// SECTION 9: FINAL PAGE - HEART EXPLOSION
// ==========================================
function initFinalPage() {
    // Heart explosion is triggered when page becomes active
}

function startHeartExplosion() {
    const explosion = document.getElementById('heartExplosion');
    const bigHeart = document.getElementById('bigHeart');
    const finalMessage = document.getElementById('finalMessage');
    
    // Wait for heart grow animation to finish
    setTimeout(() => {
        explosion.classList.add('exploded');
        
        // Create mini hearts explosion
        const hearts = ['💕', '💖', '💗', '❤️', '💘', '🩷', '💝', '♥️'];
        for (let i = 0; i < 30; i++) {
            const mini = document.createElement('span');
            mini.className = 'mini-heart';
            mini.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 80 + Math.random() * 150;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            mini.style.left = '50%';
            mini.style.top = '50%';
            mini.style.fontSize = (Math.random() * 15 + 12) + 'px';
            mini.style.animation = `explodeHeart 1.5s ease forwards`;
            mini.style.setProperty('--tx', tx + 'px');
            mini.style.setProperty('--ty', ty + 'px');
            
            // Use custom transform
            mini.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.3)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            explosion.appendChild(mini);
        }
        
        // Show final message after mini hearts
        setTimeout(() => {
            finalMessage.classList.remove('hidden');
            launchConfetti();
        }, 1200);
        
    }, 3500); // Wait for heartGrow animation
}

// ==========================================
// CONFETTI SYSTEM
// ==========================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#FF69B4', '#FF85C0', '#FFC0CB', '#FFB6C1', '#FF4DA6', '#D63384', '#FFD700', '#FF6B6B'];
    const shapes = ['circle', 'rect', 'heart'];
    
    // Create confetti pieces
    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 8 + 4,
            h: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 3 + 2,
            opacity: 1,
            decay: Math.random() * 0.005 + 0.002
        });
    }
    
    function drawHeart(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        // Left curve
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
        // Right curve
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.fill();
    }
    
    let frame = 0;
    const maxFrames = 200;
    
    function animate() {
        if (frame > maxFrames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;
            
            if (p.opacity <= 0) return;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            
            if (p.shape === 'circle') {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'rect') {
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            } else {
                drawHeart(ctx, 0, 0, p.w, p.color);
            }
            
            ctx.restore();
        });
        
        frame++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ==========================================
// SPARKLE CURSOR EFFECT
// ==========================================
function initSparkles() {
    let lastSparkle = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 80) return;
        lastSparkle = now;
        
        createSparkle(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 100) return;
        lastSparkle = now;
        
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    }, { passive: true });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (x + Math.random() * 20 - 10) + 'px';
    sparkle.style.top = (y + Math.random() * 20 - 10) + 'px';
    
    const colors = ['#FF69B4', '#FFB6C1', '#FF85C0', '#FFD700'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.width = (Math.random() * 4 + 3) + 'px';
    sparkle.style.height = sparkle.style.width;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
