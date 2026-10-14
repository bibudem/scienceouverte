// Accessibilité : liens externes annoncés, pause des animations décoratives (WCAG 2.2.2).
import { $, $$, root, srText } from '../lib/dom.js';

export function announceNewTabLinks(scope = document) {
  for (const link of $$('a[target="_blank"]', scope)) {
    if (!link.querySelector('.sr-only')) link.append(srText(' (nouvel onglet)'));
  }
}

export function initMotionToggle() {
  const button = $('.motion-toggle');
  if (!button) return;
  const label = button.querySelector('.sr-only');
  button.addEventListener('click', () => {
    const paused = root.classList.toggle('motion-paused');
    button.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Relancer l’animation du fond' : 'Mettre en pause l’animation du fond';
  });
}
