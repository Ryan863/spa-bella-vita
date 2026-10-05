/* ==========================================================================
   Spa Bella Vita — Avaliações do Google
   Somente os comentários dos clientes (as respostas da loja foram removidas).
   Avaliações sem texto não são exibidas.
   ========================================================================== */
(function () {
  'use strict';

  const REVIEWS = [
    { name: 'Josaine Ramos', text: 'O lugar é muito acolhedor, desde a recepção até os profissionais, que são muito competente e atenciosos. Me sinto muito bem em fazer os procedimentos aqui. Parabéns e sucesso sempre.' },
    { name: 'Camila Biscaro', text: 'Sempre muito gentis e atenciosos!! Fazem um ótimo trabalho!!' },
    { name: 'Braço Forte', text: 'Ótimo serviço e atendimento excelente. Recomendo a todos.' },
    { name: 'Elisa Ribeiro', text: 'Excelente atendimento, os profissionais muitos incríveis e profissionais super recomendo' },
    { name: 'Cleusa Brandt', text: 'Excelente atendimento! Tudo impecável! Profissional diferenciada!' },
    { name: 'Samuel Silva', text: 'Muito boa minha experiência no SPA BELLA VITA, profissionais muito bons!' },
    { name: 'Ana Karolina', text: 'Melhor clínica de Fraiburgo, as meninas super atenciosas ótimas profissionais 💙' },
    { name: 'Loreni Alves', text: 'Gostei bastante da experiência, fiz depilação e foi sensacional ❤️' },
    { name: 'Samara Lopes', text: 'Lugar acolhedor, ótimos profissionais' },
    { name: 'Eloiza Matias', text: 'Lugar muito aconchegante, atendimento excelente!!' },
    { name: 'Juan Kluge', text: 'Excelente espaço e atendimento' },
    { name: 'Jéssica Lanzarini', text: 'Ambiente maravilhoso, ótimo atendimento e profissionais altamente capacitados e comprometidos!!' },
    { name: 'Elizangela Rocha', text: 'Foi ótimo adorei!!!' },
    { name: 'Lucimari Ribeiro', text: 'Ambiente muito bom' },
    { name: 'Alysson Pommerening', guide: true, text: 'Gosto muito do lugar, bom atendimento e profissionalismo.' },
    { name: 'Neiva Pereira Gansalla', guide: true, text: 'Fiz a primeira visita a este local tive uma boa impressão de chegada fui muito bem atendida.' },
    { name: 'Jaque Soares', text: 'Ambiente maravilhoso, assim que entrei fui muito bem recebida, e atendida pelos profissionais.' },
    { name: 'Victor Moraes', text: 'Foi maravilhoso' },
    { name: 'Douglas Lucchesi', text: 'Ótimo atendimento!' },
    { name: 'Taiane Triquez', guide: true, text: 'Super índico o espaço, utilizo o serviço com a massoterapeuta Eliane e eu amo.' },
    { name: 'Paty Fragoso', text: 'Ótimo atendimento... recomendo' },
    { name: 'Elis Menger', text: 'Foi ótima, ótimos profissionais atendimento excelente' },
    { name: 'Maria Cordeiro', guide: true, text: 'Gostei atendimento nota 10' },
    { name: 'Maria Cleane da Silva Andrade', text: 'Maravilhosa' },
    { name: 'Neide Dias', guide: true, text: 'Excelente atendimento' },
    { name: 'Só Grave e Games', guide: true, text: 'Sempre ótima' },
    { name: 'Israel Fraiburgo', guide: true, text: 'Muito bom' },
    { name: 'Eleia Locatelli', guide: true, text: 'Ótimo atendimento' },
    { name: 'Marcos Maia', guide: true, text: 'Top, recomendo' },
    { name: 'Helen Laura', text: 'Muito bom' },
    { name: 'Deisi Mattos', text: 'Otima' },
    { name: 'Edna Ueno', guide: true, text: 'Maravilha' },
    { name: 'Jefferson Fantinel', guide: true, text: 'Bom' },
    { name: 'Denise da Silva', text: 'Ótima' },
    { name: 'Vera Lucia Santos Cerqueira', text: 'Aspectos positivos: Comunicação, Qualidade, Profissionalismo' }
  ];

  const list = document.getElementById('reviews-list');
  const moreBtn = document.getElementById('reviews-more');
  const countEl = document.getElementById('reviews-count');
  if (!list) return;

  const INITIAL = 6;
  const STEP = 9;
  const GRADIENTS = [
    'linear-gradient(145deg,#0f3d33,#1c6b57)',
    'linear-gradient(145deg,#059669,#2dd4bf)',
    'linear-gradient(145deg,#65a30d,#a3e635)'
  ];

  // Mais completas primeiro: os comentários mais ricos ficam em destaque.
  const sorted = REVIEWS.slice().sort((a, b) => b.text.length - a.text.length);

  const initials = (name) => {
    const p = name.trim().split(/\s+/);
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  };
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  sorted.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'review-item mb-5 break-inside-avoid';
    if (i < INITIAL) li.setAttribute('data-reveal', '');
    else li.hidden = true;
    li.innerHTML = `
      <article class="card flex h-full flex-col rounded-3xl p-6">
        <svg class="ico h-7 w-7 text-lime" aria-hidden="true"><use href="#i-quote"/></svg>
        <blockquote class="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">${esc(r.text)}</blockquote>
        <footer class="mt-5 flex items-center gap-3 border-t border-[#eef3f0] pt-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style="background:${GRADIENTS[i % 3]}" aria-hidden="true">${esc(initials(r.name))}</span>
          <span class="min-w-0">
            <span class="block truncate text-sm font-semibold">${esc(r.name)}</span>
            <span class="block text-xs text-slate">${r.guide ? 'Local Guide · ' : ''}Avaliação no Google</span>
          </span>
        </footer>
      </article>`;
    list.appendChild(li);
  });

  if (countEl) countEl.textContent = String(sorted.length);

  function updateButton() {
    const hidden = list.querySelectorAll('li[hidden]').length;
    if (!hidden) { moreBtn.hidden = true; return; }
    moreBtn.querySelector('[data-remaining]').textContent = String(hidden);
  }

  if (moreBtn) {
    updateButton();
    moreBtn.addEventListener('click', () => {
      const batch = Array.from(list.querySelectorAll('li[hidden]')).slice(0, STEP);
      batch.forEach((li) => { li.hidden = false; });
      if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(batch, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' });
      }
      updateButton();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }
})();
