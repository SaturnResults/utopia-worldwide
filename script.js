// Intro
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('intro')?.classList.add('is-done'), 1400);
});

// Nav scroll state
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('is-scrolled', window.scrollY > 30);
}, { passive: true });

// Custom cursor
const cursor = document.querySelector('.cursor');
let mx = -100, my = -100, cx = -100, cy = -100;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function loop(){
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  requestAnimationFrame(loop);
}
loop();

// cursor grow on interactive
document.querySelectorAll('a, button, .release, .artist, .party').forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('is-big'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('is-big'));
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }});
}, { threshold: 0.12 });

document.querySelectorAll('.section__head, .release, .party, .artist, .about, .contact__card, .vinyl').forEach(el => {
  el.classList.add('reveal-up');
  io.observe(el);
});

// Subtle parallax on hero blobs
const blobs = document.querySelectorAll('.blob');
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  blobs.forEach((b, i) => {
    const f = (i + 1) * 0.6;
    b.style.translate = `${x * f}px ${y * f}px`;
  });
});

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const menuClose = document.getElementById('menuClose');
let backdrop = document.createElement('div');
backdrop.className = 'menu__backdrop';
document.body.appendChild(backdrop);

function openMenu(){
  menu.classList.add('is-open');
  backdrop.classList.add('is-open');
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded','true');
  menu.setAttribute('aria-hidden','false');
  document.body.classList.add('menu-open');
}
function closeMenu(){
  menu.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-hidden','true');
  document.body.classList.remove('menu-open');
}
burger?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);
menu?.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', closeMenu));

// View more (mobile only)
const releasesGrid = document.querySelector('.releases');
const viewMoreBtn = document.getElementById('viewMore');
function applyCollapse(){
  if (window.innerWidth <= 780) releasesGrid?.classList.add('is-collapsed');
  else releasesGrid?.classList.remove('is-collapsed');
}
applyCollapse();
window.addEventListener('resize', applyCollapse);
viewMoreBtn?.addEventListener('click', () => {
  const collapsed = releasesGrid.classList.toggle('is-collapsed');
  viewMoreBtn.textContent = collapsed ? 'View more releases ↓' : 'Show fewer ↑';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el){ e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
    }
  });
});
