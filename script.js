// Ambil elemen yang dibutuhkan
const slider = document.querySelector(".portfolio-slider");
const slides = document.querySelectorAll(".portfolio-slide");
const prevBtn = document.querySelector(".left-arrow");
const nextBtn = document.querySelector(".right-arrow");

let currentIndex = 0;

// Fungsi untuk tampilkan slide
function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1; // balik ke terakhir
  } else if (index >= slides.length) {
    currentIndex = 0; // balik ke pertama
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

// Event tombol navigasi
prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

// Auto slide tiap 5 detik
setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);
