
const onVisible=(entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}})};
const io=new IntersectionObserver(onVisible,{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
