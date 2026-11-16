/* ===== JNS Villa — effets simples (transition de page, apparition au défilement, onde au clic) =====
   Ce fichier ne change rien au routeur du site : il se branche dessus. Si « réduire les animations »
   est activé sur l'appareil, rien n'est ajouté et le site fonctionne exactement comme avant. */
(()=>{
 const PAGES=['accueil','villa','services','localisation','a-propos','contact'],
  rm=matchMedia('(prefers-reduced-motion: reduce)'),
  secs=PAGES.map(id=>document.getElementById(id)).filter(Boolean),
  current=()=>secs.find(s=>!s.hidden);

 /* ---------- 1. Transition de page ---------- */
 const enter=()=>{
  secs.forEach(s=>s.classList.remove('pg-out'));
  const s=current();if(!s||rm.matches)return;
  s.classList.remove('pg-in');void s.offsetWidth;s.classList.add('pg-in');
  setTimeout(()=>s.classList.remove('pg-in'),1300);
 };
 addEventListener('hashchange',enter);   /* s'exécute après go() du site : la nouvelle page est déjà affichée */
 enter();                                /* entrée en douceur au premier chargement */

 /* Sortie : la page actuelle s'estompe (0,23 s), puis on change de page */
 let busy=false;
 document.addEventListener('click',e=>{
  if(e.defaultPrevented||busy||rm.matches||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const a=e.target.closest&&e.target.closest('a[href^="#"]');
  if(!a||a.target)return;
  const id=a.getAttribute('href').slice(1),s=current();
  if(!PAGES.includes(id)||!s||s.id===id)return;
  e.preventDefault();busy=true;s.classList.add('pg-out');
  setTimeout(()=>{location.hash=id;setTimeout(()=>{s.classList.remove('pg-out');busy=false},80)},230);
 });

 /* ---------- 2. Apparition douce des blocs au défilement ---------- */
 if(!rm.matches&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-in');io.unobserve(e.target)}}),{threshold:0,rootMargin:'0px 0px -8% 0px'});
  const T='section>.bv,section>.c,section>.col,section>.hist,section>.ct,section>.band,section>.map-w,section>.tms,#g1,#g3,#spaces>.c,#spaces .rm';
  document.querySelectorAll(T).forEach(el=>{
   if(el.closest('#cuisine'))return;                              /* la partie cuisine a déjà ses propres apparitions */
   if(el.parentElement&&el.parentElement.closest('.fx-r'))return; /* pas d'effet en double sur des blocs imbriqués */
   el.classList.add('fx-r');io.observe(el);
  });
 }

 /* ---------- 3. Onde au clic / au toucher sur les boutons ---------- */
 if(!rm.matches)document.addEventListener('pointerdown',e=>{
  const b=e.target.closest&&e.target.closest('section .bt,#cuisine .cu-btn');if(!b)return;
  b.classList.add('fx-has-rp');
  const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,x=document.createElement('span');
  x.className='fx-rp';x.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
  b.appendChild(x);const rem=()=>x.remove();x.addEventListener('animationend',rem);x.addEventListener('animationcancel',rem);setTimeout(rem,900);
 },{passive:true});

 /* ---------- 4. Animations sans fin : en pause quand la section n'est pas à l'écran (batterie / fluidité) ---------- */
 if('IntersectionObserver' in window){const pa=new IntersectionObserver(es=>es.forEach(x=>x.target.classList.toggle('fx-off',!x.isIntersecting)));document.querySelectorAll('.rv,#cuisine .cu-final,#cuisine .cu-cue').forEach(el=>pa.observe(el))}
 /* ---------- 5. Bouton « haut de page » : apparaît après 500 px de défilement ---------- */
 const up=document.getElementById('up');
 if(up){let t=0;const upd=()=>{t=0;up.classList.toggle('on',(window.scrollY||document.documentElement.scrollTop)>500)};
  addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(upd)},{passive:true});
  up.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));
  addEventListener('hashchange',upd);upd()}
})();
