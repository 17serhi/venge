
// Venge Init: lightbox + deduplicate last image + optional hero replace
import { initVengeLightbox } from './venge-lightbox.js';

(function(){
  // Auto init lightbox on portfolio/gallery-like containers
  try { initVengeLightbox(); } catch(e){ console.warn('Lightbox init skipped:', e); }

  // Remove last duplicate image in portfolio, if it equals previous by src
  const grid = document.querySelector('.portfolio-grid, .portfolio, .gallery, .projects-grid');
  if(grid){
    const imgs = grid.querySelectorAll('img');
    if(imgs.length >= 2){
      const last = imgs[imgs.length-1];
      const prev = imgs[imgs.length-2];
      if(last.src && prev.src && last.src.split('?')[0] === prev.src.split('?')[0]){
        last.closest('figure, .item, li, div')?.remove() || last.remove();
      }
    }
  }

  // Optional: replace hero image if found
  const heroCandidates = [
    '#hero-img', '.hero img', 'main img', '.header img', 'img[alt*="hero"]'
  ];
  const heroPath = '/assets/img/hero-venge-2025.jpg';
  for(const sel of heroCandidates){
    const el = document.querySelector(sel);
    if(el){ el.src = heroPath; break; }
  }
})();
