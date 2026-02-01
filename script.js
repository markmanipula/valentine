document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const bgMusic = document.getElementById('bg-music');

    // Initialize all slideshows
    initSlideshows();

    // Start button - begin the journey
    startBtn.addEventListener('click', () => {
        document.getElementById('start-page').classList.add('hidden');
        document.getElementById('story-2020').classList.remove('hidden');

        // Start playing music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
    });

    // Handle all next buttons (page navigation)
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nextPageId = btn.getAttribute('data-next');
            const currentPage = btn.closest('.page');

            if (nextPageId && currentPage) {
                currentPage.classList.add('hidden');
                document.getElementById(nextPageId).classList.remove('hidden');
            }
        });
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        document.getElementById('question-page').classList.add('hidden');
        document.getElementById('success-page').classList.remove('hidden');
    });

    // Make the No button run away
    let noMoveCount = 0;
    let isOnLeft = false;
    const buttonsContainer = document.querySelector('.buttons');

    const moveNoButton = () => {
        noMoveCount++;

        // After 5 attempts, hide No button and show Yes button
        if (noMoveCount >= 5) {
            noBtn.style.display = 'none';
            yesBtn.classList.remove('hidden');
            yesBtn.style.animation = 'bounceIn 0.5s ease-out';
            return;
        }

        // Set up absolute positioning on first move
        noBtn.style.position = 'absolute';

        // Move to the other side
        if (isOnLeft) {
            noBtn.style.left = 'auto';
            noBtn.style.right = '20px';
        } else {
            noBtn.style.left = '20px';
            noBtn.style.right = 'auto';
        }

        isOnLeft = !isOnLeft;
    };

    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
});

function initSlideshows() {
    document.querySelectorAll('.slideshow').forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = slideshow.querySelector('.slide-dots');
        const prevBtn = slideshow.querySelector('.prev-slide');
        const nextBtn = slideshow.querySelector('.next-slide');
        let currentSlide = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slideshow.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        }
    });
}
