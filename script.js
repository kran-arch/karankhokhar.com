// ---------- Highlight active nav link on scroll ----------
const sections = document.querySelectorAll('.sheet, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ---------- Fill skill gauges once when scrolled into view ----------
const gauges = document.querySelectorAll('.gauge');

if (gauges.length) {
  const gaugeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.gauge-fill');
        if (fill && fill.dataset.width) {
          fill.style.width = fill.dataset.width;
        }
        gaugeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  gauges.forEach(gauge => gaugeObserver.observe(gauge));
}
