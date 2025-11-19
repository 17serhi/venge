
// Venge Lightbox - bundle (no modules)
(function(){
  function initVengeLightbox(selectors){
    selectors = selectors || ['.projects','.projects-grid','.gallery','.grid','.images','.portfolio','.portfolio-grid'];
    var grid=null;
    for(var i=0;i<selectors.length;i++){ var el=document.querySelector(selectors[i]); if(el){grid=el;break;} }
    if(!grid) return;
    var nodes=[].slice.call(grid.querySelectorAll('a img, img'));
    if(!nodes.length) return;
    function getFull(img){
      var a=img.closest&&img.closest('a[href]'); if(a){ var h=a.getAttribute('href')||''; if(/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(h)) return h; }
      if(img.dataset&&img.dataset.full) return img.dataset.full;
      if(img.srcset){ var parts=img.srcset.split(',').map(s=>s.trim().split(' ')[0]); if(parts.length) return parts[parts.length-1]; }
      return img.currentSrc||img.src;
    }
    var sources = nodes.map(function(n){ var img=n.tagName.toLowerCase()==='img'?n:n.querySelector('img'); return img?getFull(img):''; });
    var backdrop=document.createElement('div'); backdrop.className='vg-lightbox-backdrop';
    backdrop.innerHTML='<div class="vg-lightbox-wrap"><img class="vg-lightbox-img" alt=""><button class="vg-lightbox-btn vg-prev">‹</button><button class="vg-lightbox-btn vg-next">›</button><button class="vg-lightbox-btn vg-close">✕</button></div>';
    document.body.appendChild(backdrop);
    var imgEl=backdrop.querySelector('.vg-lightbox-img'), prev=backdrop.querySelector('.vg-prev'), next=backdrop.querySelector('.vg-next'), close=backdrop.querySelector('.vg-close'); var i=0;
    function lock(v){ document.documentElement.style.overflow=v?'hidden':''; document.body.style.overflow=v?'hidden':''; }
    function show(n){ i=(n+sources.length)%sources.length; var src=sources[i]; imgEl.src=''; var tmp=new Image(); tmp.onload=()=>{imgEl.src=src; backdrop.classList.add('show'); lock(true);}; tmp.onerror=()=>{imgEl.src=src; backdrop.classList.add('show'); lock(true);}; tmp.src=src; }
    function hide(){ backdrop.classList.remove('show'); lock(false); }
    nodes.forEach(function(n,k){ var t=n.tagName.toLowerCase()==='img'?n:n.querySelector('img'); if(!t) return; t.style.cursor='zoom-in'; (n.tagName.toLowerCase()==='a'?n:t).addEventListener('click', function(e){e.preventDefault(); show(k);}, {passive:false}); });
    prev.addEventListener('click', ()=>show(i-1)); next.addEventListener('click', ()=>show(i+1)); close.addEventListener('click', hide); backdrop.addEventListener('click', e=>{ if(e.target===backdrop) hide(); });
    window.addEventListener('keydown', e=>{ if(!backdrop.classList.contains('show')) return; if(e.key==='Escape') hide(); if(e.key==='ArrowLeft') show(i-1); if(e.key==='ArrowRight') show(i+1); });
    var sx=0; imgEl.addEventListener('touchstart', e=>sx=e.changedTouches[0].screenX, {passive:true}); imgEl.addEventListener('touchend', e=>{ var dx=e.changedTouches[0].screenX-sx; if(Math.abs(dx)>40){ dx>0?show(i-1):show(i+1);} }, {passive:true});
  }
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  ready(function(){ try{ initVengeLightbox(); }catch(e){ console.warn('lightbox skipped', e);} });
})();
