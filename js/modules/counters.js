// Chiffres qui comptent jusqu’à leur valeur lorsqu’ils deviennent visibles.
import { $$, srText } from '../lib/dom.js';
import { formatNumber } from '../lib/format.js';
import { prefersReducedMotion } from '../lib/motion.js';

const DURATION = 1400;
const easeOutQuart = (p) => 1 - (1 - p) ** 4;

function render(el, value) {
  const decimals = Number(el.dataset.decimals ?? 0);
  el.textContent = formatNumber(value, decimals);
  if (el.dataset.suffix) {
    const suffix = document.createElement('small');
    suffix.textContent = el.dataset.suffix;
    el.append('\u00a0', suffix); // espace insécable avant « % », selon l’usage français
  }
}

function countUp(el) {
  const target = Number(el.dataset.count);
  if (prefersReducedMotion()) return render(el, target);
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / DURATION);
    render(el, target * easeOutQuart(progress));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initCounters() {
  // Démarre juste avant que le chiffre n’entre à l’écran : on ne le voit jamais figé à 0.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      countUp(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });

  for (const el of $$('[data-count]')) {
    // Les lecteurs d’écran lisent la valeur finale, pas le décompte animé.
    const decimals = Number(el.dataset.decimals ?? 0);
    const finalText = formatNumber(Number(el.dataset.count), decimals) + (el.dataset.suffix ? ` ${el.dataset.suffix}` : '');
    el.setAttribute('aria-hidden', 'true');
    el.after(srText(finalText));
    render(el, 0);
    observer.observe(el);
  }
}
