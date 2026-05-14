
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // Smooth active nav highlight
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : ''; });
  });

  // ── Testimonials Slider ──
(function () {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let autoplay;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAutoplay() {
    autoplay = setInterval(() => goTo(current + 1), 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
  });

  // Arrow clicks
  document.querySelector('.slider-prev')
    .addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  document.querySelector('.slider-next')
    .addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

  // Touch swipe support
  let touchStartX = 0;
  const slider = document.querySelector('.testimonials-slider');

  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAutoplay();
    }
  }, { passive: true });

  // Init
  goTo(0);
  startAutoplay();
})();