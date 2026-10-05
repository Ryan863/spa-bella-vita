/* ==========================================================================
   Spa Bella Vita — comportamento da página
   1) Status "Aberto/Fechado" em tempo real  2) Menu mobile  3) Animações GSAP
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     1) HORÁRIOS & STATUS EM TEMPO REAL (fuso de Brasília)
     ---------------------------------------------------------------------- */
  const TZ = 'America/Sao_Paulo';
  const DAY_NAMES = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  // 0 = domingo ... 6 = sábado. Turnos em "HH:MM".
  const SCHEDULE = {
    0: [],
    1: [['13:30', '20:00']],
    2: [['08:30', '11:00'], ['13:30', '19:00']],
    3: [['08:30', '11:00'], ['13:30', '19:00']],
    4: [['08:30', '11:00'], ['13:30', '19:00']],
    5: [['08:30', '11:00'], ['13:30', '19:00']],
    6: [['08:00', '12:00']]
  };

  const toMinutes = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

  function nowInSaoPaulo() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: dayMap[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }

  function getStatus() {
    const { day, minutes } = nowInSaoPaulo();

    // Aberto agora?
    for (const [start, end] of SCHEDULE[day]) {
      if (minutes >= toMinutes(start) && minutes < toMinutes(end)) {
        return { open: true, day, detail: `Atendendo agora · fecha às ${end}` };
      }
    }
    // Próxima abertura (hoje mais tarde ou nos próximos dias)
    for (let offset = 0; offset <= 7; offset++) {
      const d = (day + offset) % 7;
      for (const [start] of SCHEDULE[d]) {
        if (offset === 0 && toMinutes(start) <= minutes) continue;
        const when = offset === 0 ? 'hoje' : offset === 1 ? 'amanhã' : DAY_NAMES[d];
        return { open: false, day, detail: `Abrimos ${when} às ${start}` };
      }
    }
    return { open: false, day, detail: 'Consulte nossos horários.' };
  }

  function renderStatus() {
    const status = getStatus();
    document.querySelectorAll('[data-status-label]').forEach((el) => {
      const compact = !el.matches('#status-badge');
      const label = status.open ? '🟢 Aberto Agora' : '🔴 Fechado no Momento';
      el.textContent = label;
      el.dataset.state = status.open ? 'open' : 'closed';
      if (compact) el.classList.add('whitespace-nowrap');
    });
    document.querySelectorAll('[data-status-detail]').forEach((el) => { el.textContent = status.detail; });
    document.querySelectorAll('.hours-row').forEach((row) => {
      const today = Number(row.dataset.day) === status.day;
      row.classList.toggle('is-today', today);
      if (today) row.setAttribute('aria-current', 'date'); else row.removeAttribute('aria-current');
    });
  }

  renderStatus();
  setInterval(renderStatus, 30 * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderStatus(); });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------------
     2) MENU MOBILE
     ---------------------------------------------------------------------- */
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  function setMenu(open) {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    // evita foco em links escondidos
    panel.toggleAttribute('inert', !open);
  }
  if (toggle && panel) {
    setMenu(false);
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ----------------------------------------------------------------------
     3) ANIMAÇÕES GSAP + SCROLLTRIGGER
     ---------------------------------------------------------------------- */
  const root = document.documentElement;
  const reveal = () => root.classList.remove('anim'); // mostra tudo, sem animar

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') { reveal(); return; }
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector('.site-header');

  // Navbar: sombra ao rolar + link ativo (independe de reduced-motion)
  ScrollTrigger.create({
    start: 20, end: 'max',
    onUpdate: (self) => header.classList.toggle('is-scrolled', self.scroll() > 20)
  });
  const navLinks = document.querySelectorAll('.nav-link');
  ['inicio', 'tratamentos', 'horarios', 'endereco', 'contato'].forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section, start: 'top 45%', end: 'bottom 45%',
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((l) => {
          const active = l.getAttribute('href') === '#' + id;
          l.classList.toggle('is-active', active);
          if (active) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
        });
      }
    });
  });

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* --- Hero reveal em cascata --- */
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('[data-hero]',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, clearProps: 'transform' }
      )
      .fromTo('.fab', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', clearProps: 'transform' }, '-=0.4');

    /* --- Seções e cards surgem ao rolar --- */
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.fromTo(batch,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, overwrite: true, clearProps: 'transform' }
      )
    });

    /* --- Micro-animações orgânicas contínuas (borboleta / glow) --- */
    const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' };
    gsap.utils.toArray('[data-float="butterfly"]').forEach((el, i) => {
      gsap.to(el, { y: -18, x: 8, rotation: '+=5', duration: 3.2 + i * 0.4, ...loop });
    });
    gsap.utils.toArray('[data-float="butterfly-small"]').forEach((el, i) => {
      gsap.to(el, { y: -10, x: -6, rotation: '-=4', duration: 2.6 + i * 0.5, delay: i * 0.3, ...loop });
    });
    gsap.utils.toArray('[data-float="blob"]').forEach((el, i) => {
      gsap.to(el, { scale: 1.18, x: i % 2 ? -22 : 22, y: i % 2 ? 16 : -16, duration: 5 + i, ...loop });
    });

    // Parallax sutil da borboleta principal conforme a rolagem
    gsap.to('[data-float="butterfly"]', {
      yPercent: -25, ease: 'none',
      scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: 0.6 }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => { reveal(); });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
