// Chaque chiffre de « En chiffres » mène au thème qui le détaille :
// on affiche le bon volet, on amène la tuile à l’écran, puis on l’ouvre.
import { $, $$ } from '../lib/dom.js';
import { prefersReducedMotion } from '../lib/motion.js';

const ARROW = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const findTile = (theme) =>
  $$('.tile').find((tile) => tile.querySelector('.tile-title')?.textContent.trim() === theme);

// Attendre la fin du défilement (scrollend), avec un délai de secours pour les navigateurs qui ne l’émettent pas.
const afterScroll = () => new Promise((resolve) => {
  const done = () => { removeEventListener('scrollend', done); clearTimeout(timer); resolve(); };
  const timer = setTimeout(done, 900);
  addEventListener('scrollend', done, { once: true });
});

export function initStatLinks() {
  for (const stat of $$('.stat[data-theme]')) {
    const theme = stat.dataset.theme;
    const tile = findTile(theme);
    if (!tile) continue;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'stat-link';
    button.setAttribute('aria-haspopup', 'dialog');
    button.innerHTML = `<span>Voir le détail</span>${ARROW}`;
    button.setAttribute('aria-label', `Voir le détail : ${theme}`);

    button.addEventListener('click', async () => {
      const panel = tile.closest('.panel');
      const tab = $(`[aria-controls="${panel.id}"]`);
      if (tab.getAttribute('aria-selected') !== 'true') tab.click();
      const rect = tile.getBoundingClientRect();
      const visible = rect.top >= 80 && rect.bottom <= innerHeight - 100;
      if (!visible) {
        tile.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        await afterScroll();
      }
      tile.click();
    });

    stat.append(button);
  }
}
