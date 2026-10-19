// Shared motion primitives: scroll reveals, split headlines, count-ups,
// pointer-tracked glows, and a scroll progress custom property.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitWords(el: HTMLElement) {
  if (el.dataset.split === 'done') return;
  let i = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of (child.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(' '); continue; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.setProperty('--i', String(i++));
          w.append(inner);
          frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== 'BR') {
        walk(child);
      }
    }
  };
  walk(el);
  el.dataset.split = 'done';
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (reduced) { el.textContent = fmt(target); return; }
  const start = performance.now();
  const dur = 1600;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt(target * e);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initMotion() {
  document.documentElement.classList.add('js');

  document.querySelectorAll<HTMLElement>('.split').forEach(splitWords);

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        if (el.dataset.count) countUp(el);
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  document.querySelectorAll('[data-reveal], .split, [data-count], [data-draw]').forEach((el) => io.observe(el));

  // Stagger children of [data-stagger] by assigning --i.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });

  // Pointer glow for cards: sets --mx/--my relative to each card.
  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((card) => {
    card.addEventListener('pointermove', (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
      card.style.setProperty('--my', `${ev.clientY - r.top}px`);
    });
  });

  // Scroll-linked progress for elements with [data-scroll]: --p goes 0→1
  // as the element travels from entering the viewport to its centre.
  const scrollEls = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll]'));
  const nav = document.querySelector<HTMLElement>('.site-nav');
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    for (const el of scrollEls) {
      const r = el.getBoundingClientRect();
      const mode = el.dataset.scroll;
      let p: number;
      if (mode === 'through') p = (vh * 0.6 - r.top) / r.height;
      else p = 1 - (r.top + r.height * 0.5 - vh * 0.5) / (vh * 0.5 + r.height * 0.5);
      el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
    }
    nav?.classList.toggle('scrolled', scrollY > 12);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();
}
