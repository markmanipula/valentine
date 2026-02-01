document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const bgMusic = document.getElementById('bg-music');

    // Start button - begin the journey
    startBtn.addEventListener('click', () => {
        document.getElementById('start-page').classList.add('hidden');
        document.getElementById('story-2020').classList.remove('hidden');

        // Start playing music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
    });

    // Handle all next buttons
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextPageId = btn.getAttribute('data-next');
            const currentPage = btn.closest('.page');

            currentPage.classList.add('hidden');
            document.getElementById(nextPageId).classList.remove('hidden');
        });
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        document.getElementById('question-page').classList.add('hidden');
        document.getElementById('success-page').classList.remove('hidden');
    });

    // Make the No button run away
    const moveNoButton = () => {
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '9999';
    };

    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    noBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        moveNoButton();
    });
});
