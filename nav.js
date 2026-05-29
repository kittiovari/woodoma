(function () {
  'use strict';
  const burger  = document.getElementById('navBurger');
  const overlay = document.getElementById('mobileNav');
  if (!burger || !overlay) return;

  function setOpen(open) {
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => setOpen(!overlay.classList.contains('open')));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();
