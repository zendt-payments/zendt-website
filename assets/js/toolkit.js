(() => {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const closeMenu = () => {
    if (!nav || !navToggle || !navMobile) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('is-open');
    navMobile.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (!nav || !navToggle || !navMobile) return;
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navMobile.classList.add('is-open');
    navMobile.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    navMobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.pushState(null, '', hash);
  });

  const spyLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')].filter(
    (a) => a.getAttribute('href').length > 1
  );
  if (spyLinks.length) {
    const sections = spyLinks
      .map((a) => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        return el ? { id, el, link: a } : null;
      })
      .filter(Boolean);

    const setActive = () => {
      const offset = 80;
      let current = sections[0]?.id;
      sections.forEach(({ id, el }) => {
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      });
      spyLinks.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
      });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }
})();
