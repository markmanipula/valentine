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
