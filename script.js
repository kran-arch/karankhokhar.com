// ---------- Highlight active nav link on scroll ----------
const sections = document.querySelectorAll('.sheet, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

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
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ---------- Fill skill gauges once when scrolled into view ----------
const gaugeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.gauge-fill');
      fill.style.width = fill.dataset.width;
      gaugeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.gauge').forEach(gauge => gaugeObserver.observe(gauge));

// ---------- Blueprint / Print mode toggle ----------
const modeToggle = document.querySelector('.mode-toggle');
const body = document.body;

function applyMode(mode) {
  if (mode === 'print') {
    body.classList.add('print-mode');
    modeToggle.textContent = 'Switch to blueprint mode';
  } else {
    body.classList.remove('print-mode');
    modeToggle.textContent = 'Switch to print mode';
  }
}

applyMode(localStorage.getItem('mode') || 'blueprint');

modeToggle.addEventListener('click', () => {
  const next = body.classList.contains('print-mode') ? 'blueprint' : 'print';
  applyMode(next);
  localStorage.setItem('mode', next);
});