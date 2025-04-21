// Get all necessary elements
const slides = document.querySelectorAll('.portfolio-slide');
const totalSlides = slides.length;
let currentIndex = 0;

// Get the slider container to change the slide position
const slider = document.querySelector('.portfolio-slider');

// Function to update the slider position
function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Next slide
function nextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSliderPosition();
}

// Previous slide
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }
    updateSliderPosition();
}

// Add event listeners to the navigation arrows
document.querySelector('.left-arrow').addEventListener('click', prevSlide);
document.querySelector('.right-arrow').addEventListener('click', nextSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);