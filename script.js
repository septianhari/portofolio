(() => {
  const slider = document.querySelector(".portfolio-slider");
  const slides = document.querySelectorAll(".portfolio-slide");
  const prevBtn = document.querySelector(".left-arrow");
  const nextBtn = document.querySelector(".right-arrow");

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  let autoId = null;
  let isPaused = false;

  // Init
  function applyTransform() {
    const offset = -currentIndex * 100; // karena tiap slide min-width:100%
    slider.style.transform = `translateX(${offset}%)`;
  }

  function showSlide(index) {
    const last = slides.length - 1;
    if (index < 0) currentIndex = last;
    else if (index > last) currentIndex = 0;
    else currentIndex = index;
    applyTransform();
  }

  function next() { showSlide(currentIndex + 1); }
  function prev() { showSlide(currentIndex - 1); }

  // Auto slide
  function startAuto() {
    if (autoId || isPaused) return;
    autoId = setInterval(next, 4000);
  }
  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }

  // Pause on hover & focus-within
  const container = document.querySelector(".portfolio-slider-container") || slider.parentElement;
  ["mouseenter","focusin","touchstart"].forEach(evt => {
    container?.addEventListener(evt, () => { isPaused = true; stopAuto(); }, { passive: true });
  });
  ["mouseleave","focusout","touchend","touchcancel"].forEach(evt => {
    container?.addEventListener(evt, () => { isPaused = false; startAuto(); }, { passive: true });
  });

  // Buttons (null-safe)
  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  // Keyboard access on arrows
  [prevBtn, nextBtn].forEach((btn, i) => {
    if (!btn) return;
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("aria-label", i === 0 ? "Previous slide" : "Next slide");
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        i === 0 ? prev() : next();
      }
    });
  });

  // Swipe support
  let startX = 0, deltaX = 0, isSwiping = false;
  container?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    deltaX = 0;
    isSwiping = true;
  }, { passive: true });

  container?.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });

  container?.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;
    const threshold = 40; // px
    if (deltaX > threshold) prev();
    else if (deltaX < -threshold) next();
    deltaX = 0;
  });

  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  // Respect reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) startAuto();

  // First render
  applyTransform();
})();


const btn = document.getElementById("backToTop");

// Tampilkan tombol kalau scroll > 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.classList.add("show");
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
    btn.classList.remove("show");
  }
});

// Klik tombol untuk scroll halus ke atas
btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});