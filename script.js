/* Basic interactive behaviors:
   - Mobile nav toggle
   - Testimonial slider (auto & nav)
   - Small hero image float effect
*/

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close nav when a link is clicked (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple testimonial slider
  const slider = document.getElementById('testimonial-slider');
  const testimonials = Array.from(slider.querySelectorAll('.testimonial'));
  const prevBtn = document.getElementById('t-prev');
  const nextBtn = document.getElementById('t-next');

  let idx = 0;
  const visibleWidth = slider.clientWidth;

  // Wrap testimonials inside a moving container: we'll clone and use translateX
  // For simplicity create a container and position items horizontally.
  const inner = document.createElement('div');
  inner.style.display = 'flex';
  inner.style.transition = 'transform 400ms ease';
  inner.style.width = (testimonials.length * 100) + '%';
  inner.style.flex = '0 0 auto';
  testimonials.forEach(item => {
    item.style.minWidth = (100 / testimonials.length) + '%';
    inner.appendChild(item);
  });
  // Clear and append
  slider.innerHTML = '';
  slider.appendChild(inner);

  function showIndex(i) {
    idx = (i + testimonials.length) % testimonials.length;
    inner.style.transform = `translateX(${-(idx * (100 / testimonials.length))}%)`;
  }

  prevBtn.addEventListener('click', () => showIndex(idx - 1));
  nextBtn.addEventListener('click', () => showIndex(idx + 1));

  // Auto-play
  let autoT = setInterval(() => showIndex(idx + 1), 5000);
  // pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoT));
  slider.addEventListener('mouseleave', () => autoT = setInterval(() => showIndex(idx + 1), 5000));

  // Small hero image float animation on mouse move
  const heroPhone = document.querySelector('.hero-phone');
  const heroSection = document.querySelector('.hero');
  if (heroPhone && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroPhone.style.transform = `translate(${px * 8}px, ${py * 6}px) rotate(${px * 2}deg)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      heroPhone.style.transform = 'translateY(0) rotate(0)';
    });
  }

  // Slight accessibility improvement: close nav on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });

});
