document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    function goToSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        let index = (currentIndex + 1) % totalSlides;
        goToSlide(index);
    }

    function prevSlide() {
        let index = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(index);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 6000); // 6 seconds per slide
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event Listeners for Controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Event Listeners for Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });

    // Start autoplay initially
    startAutoplay();
});
