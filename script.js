// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the current section in the rail nav while scrolling
const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('.rail-nav a');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--ink)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

// Design & video carousel
(function () {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const items = track.querySelectorAll('.showcase-item');
  const current = document.getElementById('carousel-current');
  const total = document.getElementById('carousel-total');
  total.textContent = items.length;

  const go = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  document.getElementById('carousel-prev').addEventListener('click', () => go(-1));
  document.getElementById('carousel-next').addEventListener('click', () => go(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  let lastIndex = 0;
  track.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index === lastIndex) return;
    lastIndex = index;
    current.textContent = index + 1;
    // Pause any video that has been swiped away
    track.querySelectorAll('video').forEach((v) => v.pause());
  }, { passive: true });
})();
