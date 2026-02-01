document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionPage = document.getElementById('question-page');
    const successPage = document.getElementById('success-page');

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        questionPage.classList.add('hidden');
        successPage.classList.remove('hidden');
    });

    // Make the No button run away
    const moveNoButton = () => {
        const container = document.querySelector('.buttons');
        const containerRect = container.getBoundingClientRect();

        // Get viewport dimensions with some padding
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;

        // Generate random position
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Make sure it doesn't go off screen
        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));

        // Move button to fixed position on the viewport
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '9999';
    };

    // Trigger on hover and touch
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Also move if somehow they get close to clicking
    noBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        moveNoButton();
    });
});
