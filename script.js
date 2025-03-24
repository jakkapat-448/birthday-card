let musicStarted = false;
const bgMusic = document.getElementById('bgMusic');
const toggleMusic = document.getElementById('toggleMusic');
const musicControl = document.querySelector('.music-control');

// ตั้งค่าความดังเพลงเริ่มต้น
bgMusic.volume = 0.1;
// ฟังก์ชั่นสำหรับเริ่มเล่นเพลง
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicControl.classList.add('show');
        }).catch(error => {
            console.log("Cannot play audio: ", error);
        });
    }
}
toggleMusic.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        toggleMusic.textContent = '🔊';
    } else {
        bgMusic.pause();
        toggleMusic.textContent = '🔇';
    }
});
document.addEventListener('click', function() {
    if (musicStarted && bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Cannot autoplay: ", e));
    }
}, { once: true });

function createConfetti() {
    const colors = ['#f2d74e', '#95c3de', '#ff9a9a', '#a9cf54', '#9e7eb9'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() < 0.5 ? '50%' : '0';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

        document.body.appendChild(confetti);

        const animationDuration = Math.random() * 3 + 2;

        confetti.animate([
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: 'translateY(' + (window.innerHeight + 10) + 'px) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: 'ease-out',
            delay: Math.random() * 1500
        }).onfinish = function () {
            confetti.remove();
        };
    }
}

const card = document.querySelector('.card');
const flipInstruction = document.querySelectorAll('.flip-instruction');

flipInstruction.forEach(instruction => {
    instruction.addEventListener('click', function () {
        card.classList.toggle('flipped');
        startMusic();
    });
});

card.addEventListener('click', function (event) {
    if (!event.target.classList.contains('flip-instruction')) {
        this.classList.toggle('flipped');
        startMusic();
    }
});

window.addEventListener('load', function () {
    setTimeout(function () {
        document.querySelector('.page-loader').classList.add('fade-out');

        setTimeout(function () {
            document.querySelector('.card-container').classList.add('show');

            setTimeout(createConfetti, 800);
        }, 500);
    }, 1500);
});
