// Ambil elemen yang dibutuhkan
const slider = document.querySelector(".portfolio-slider");
const slides = document.querySelectorAll(".portfolio-slide");
const prevBtn = document.querySelector(".left-arrow");
const nextBtn = document.querySelector(".right-arrow");

let currentIndex = 0;

// Fungsi untuk tampilkan slide
function showSlide(index) {
  if (!slider || slides.length === 0) return;

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
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });
}

// Auto slide tiap 5 detik
if (slider && slides.length > 0) {
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000);
}
