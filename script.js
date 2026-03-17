/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ============ NAVBAR ============ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============ TYPING ANIMATION ============ */
const phrases = [
  'AI Models with Python.',
  'Generative AI Solutions.',
  'ML Defect Detection Systems.',
  'AI for Manufacturing.',
  'Your Ideas Into Reality.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 90);
  }
}
typeEffect();

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars when visible
      const bars = entry.target.querySelectorAll('.skill-fill');
      bars.forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      // Trigger stat counters when visible
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(num => animateCounter(num));
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============ SKILL BARS ============ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.skill-fill');
      bars.forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ============ COUNTER ANIMATION ============ */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = true;
  const target = parseInt(el.dataset.target);
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

/* ============ FILTER BUTTONS (Skills & Projects) ============ */
function setupFilter(filterSelector, itemSelector, categoryAttr) {
  const btns = document.querySelectorAll(filterSelector);
  const items = document.querySelectorAll(itemSelector);
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hide', !show);
      });
    });
  });
}
setupFilter('.skills-filter .filter-btn', '.skill-card', 'category');
setupFilter('.projects-filter .filter-btn', '.project-card', 'category');

/* ============ TIMELINE TABS ============ */
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.timeline').forEach(t => t.classList.add('hidden'));
    document.getElementById(`${tab}-timeline`).classList.remove('hidden');
  });
});

/* ============ TESTIMONIAL CAROUSEL ============ */
let currentSlide = 0;
const track = document.getElementById('testimTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.testimonial-card').length;
let autoSlide = setInterval(() => changeSlide(1), 5000);

function goToSlide(n) {
  currentSlide = n;
  updateCarousel();
  clearInterval(autoSlide);
  autoSlide = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
}

function updateCarousel() {
  track.style.transform = `translateX(${-currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

/* ============ CONTACT FORM ============ */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.innerHTML = '<span>Sending... ⏳</span>';
  submitBtn.disabled = true;

  // Simulate submission (replace with real API call)
  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = '<span>Send Message 🚀</span>';
    submitBtn.disabled = false;
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 4000);
  }, 1500);
});

/* ============ BACK TO TOP ============ */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ ACTIVE NAV LINK ON SCROLL ============ */
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchorLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${entry.target.id}`) {
          a.style.color = 'var(--accent-3)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ============ SMOOTH CURSOR GLOW (optional) ============ */
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 20px; height: 20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%);
  transform: translate(-50%, -50%); transition: opacity 0.2s;
  width: 300px; height: 300px; filter: blur(40px); opacity: 0.4;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
