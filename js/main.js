// Point d’entrée : chaque module s’occupe d’une seule responsabilité.
import { announceNewTabLinks, initMotionToggle } from './modules/a11y.js';
import { initReveal } from './modules/reveal.js';
import { loadData } from './modules/data.js';
import { initCounters } from './modules/counters.js';
import { initTabs } from './modules/tabs.js';
import { initScrollEffects } from './modules/scroll.js';
import { buildTiles } from './modules/volets.js';
import { initQuotes } from './modules/quotes.js';
import { createSheet } from './modules/sheet.js';
import { initStatLinks } from './modules/stat-links.js';

announceNewTabLinks();
initMotionToggle();
initReveal();
initTabs();
initQuotes();
initScrollEffects();

// Les chiffres doivent être chargés avant les compteurs et avant la copie dans les tuiles.
await loadData();
initCounters();

const sheet = createSheet();
buildTiles({ onOpen: sheet.open });
initStatLinks();
