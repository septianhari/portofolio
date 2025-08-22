const slider = document.querySelector(".portfolio-slider");
const slides = document.querySelectorAll(".portfolio-slide");
const prevBtn = document.querySelector(".left-arrow");
const nextBtn = document.querySelector(".right-arrow");

let currentIndex = 0;

// Fungsi tampilkan slide
function showSlide(index) {
  if (!slider || slides.length === 0) return;

  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

// Event tombol navigasi
prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

// Auto slide
setInterval(() => {
  showSlide(currentIndex + 1);
}, 4000);
