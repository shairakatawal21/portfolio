/* ─────────────────────────────────────────────
   Shaira Katuwal — Portfolio JS
───────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

/* ── Nav: scrolled state ── */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -60',
  onEnter:     () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled'),
});

/* ── Mobile menu ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = force !== undefined ? force : !menuOpen;
  burger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  mobileMenu.setAttribute('aria-hidden', !menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

burger.addEventListener('click', () => toggleMenu());

mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

/* ── Hero entrance (immediate, staggered) ── */
const heroEls = document.querySelectorAll('.hero .reveal-up');
gsap.to(heroEls, {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out',
  stagger: 0.12,
  delay: 0.2,
});

/* ── Hero stats counter animation ── */
document.querySelectorAll('.hero__stat-num').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  gsap.to({ val: 0 }, {
    val: target,
    duration: 1.8,
    ease: 'power2.out',
    delay: 0.9,
    onUpdate: function() {
      el.textContent = isDecimal
        ? this.targets()[0].val.toFixed(2)
        : Math.round(this.targets()[0].val);
    }
  });
});

/* ── Project cards: staggered within grid ── */
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  ScrollTrigger.create({
    trigger: '.projects__grid',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(projectCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
  });
}

/* ── Timeline items stagger ── */
const timelineItems = document.querySelectorAll('.timeline__item');
if (timelineItems.length) {
  ScrollTrigger.create({
    trigger: '.timeline',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(timelineItems, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
      });
    },
  });
}

/* ── Scroll-triggered fade-ups (excludes stagger-managed elements) ── */
const staggerManaged = new Set([...projectCards, ...timelineItems]);
document.querySelectorAll('.fade-up').forEach(el => {
  if (staggerManaged.has(el)) return;
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power3.out',
  });
});

/* ── Active nav link highlight ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function setActiveLink(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.style.color = active ? 'var(--navy)' : '';
  });
}

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter:      () => setActiveLink(section.id),
    onEnterBack:  () => setActiveLink(section.id),
  });
});

/* ── Smooth scroll offset for fixed nav ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10);
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    });
  });
});
