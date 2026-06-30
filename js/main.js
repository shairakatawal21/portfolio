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

/* Stats: displayed as static values (no count-up animation) */

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

/* ── Scroll-triggered fade-ups (excludes stagger-managed elements) ── */
const staggerManaged = new Set([...projectCards]);
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

/* ── Accordion: project category buckets ── */
document.querySelectorAll('button.proj-category__label').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;
    const isOpen  = trigger.classList.contains('open');
    trigger.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);
  });
});

/* ── Accordion: section-level (Case Studies, Certifications) ── */
document.querySelectorAll('.acc-section-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panelId = btn.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;
    const isOpen  = btn.classList.contains('open');
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);
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
