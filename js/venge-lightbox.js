
// Venge Lightbox core (drop-in)
export function initVengeLightbox(containerSelectors=[
  '.portfolio-grid','.portfolio','.gallery','.projects-grid','.works-grid','.grid','.images'
]){
  let grid=null;
  for(const sel of containerSelectors){ const el=document.querySelector(sel); if(el){grid=el;break;}}
  if(!grid) return;
  const imgs = Array.from(grid.querySelectorAll('img'));
  if(!imgs.length) return;

  const sources = imgs.map(img => img.dataset.full || img.src);
  const backdrop = document.createElement('div');
  backdrop.className='vg-lightbox-backdrop';
  backdrop.innerHTML=`
    <div class="vg-lightbox-wrap">
      <img class="vg-lightbox-img" alt="">
      <button class="vg-lightbox-btn vg-prev" aria-label="Previous">‹</button>
      <button class="vg-lightbox-btn vg-next" aria-label="Next">›</button>
      <button class="vg-lightbox-btn vg-close" aria-label="Close">✕</button>
    </div>`;
  document.body.appendChild(backdrop);

  const imgEl = backdrop.querySelector('.vg-lightbox-img');
  const btnPrev = backdrop.querySelector('.vg-prev');
  const btnNext = backdrop.querySelector('.vg-next');
  const btnClose = backdrop.querySelector('.vg-close');
  let index=0;

  function show(i){
    index=(i + sources.length) % sources.length;
    imgEl.src=sources[index];
    backdrop.classList.add('show');
  }
  function hide(){ backdrop.classList.remove('show'); }

  imgs.forEach((img,i)=>{
    img.style.cursor='zoom-in';
    img.addEventListener('click', e=>{ e.preventDefault(); show(i); }, {passive:true});
  });

  btnPrev.addEventListener('click', ()=>show(index-1));
  btnNext.addEventListener('click', ()=>show(index+1));
  btnClose.addEventListener('click', hide);
  backdrop.addEventListener('click', e=>{ if(e.target===backdrop) hide(); });

  window.addEventListener('keydown', e=>{
    if(!backdrop.classList.contains('show')) return;
    if(e.key==='Escape') hide();
    if(e.key==='ArrowLeft') show(index-1);
    if(e.key==='ArrowRight') show(index+1);
  });

  // Touch swipe
  let sx=0;
  imgEl.addEventListener('touchstart', e=> sx=e.changedTouches[0].screenX, {passive:true});
  imgEl.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].screenX - sx;
    if(Math.abs(dx) > 40){ dx>0 ? show(index-1) : show(index+1); }
  }, {passive:true});
}
