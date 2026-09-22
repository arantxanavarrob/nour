const cursor=document.querySelector('.cursor');
if(matchMedia('(pointer:fine)').matches){
 addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
 document.querySelectorAll('a,button,.card').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.style.transform='translate(-50%,-50%) scale(1)');
  el.addEventListener('mouseleave',()=>cursor.style.transform='translate(-50%,-50%) scale(0)');
 });
}
const stage=document.querySelector('.lab-stage');
if(stage&&matchMedia('(pointer:fine)').matches){
 stage.addEventListener('mousemove',e=>{
  const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  stage.querySelectorAll('.pack').forEach((p,i)=>{const d=(i+1)*7;p.style.translate=`${x*d}px ${y*d}px`;});
 });
}
const wrap=document.querySelector('.horizontal-wrap'),track=document.querySelector('.track');
function horizontal(){
 if(innerWidth<=800){track.style.transform='';return}
 const r=wrap.getBoundingClientRect(),distance=wrap.offsetHeight-innerHeight;
 const p=Math.max(0,Math.min(1,-r.top/distance));
 track.style.transform=`translate3d(${-p*(track.scrollWidth-innerWidth)}px,0,0)`;
}
addEventListener('scroll',horizontal,{passive:true});addEventListener('resize',horizontal);horizontal();
document.querySelectorAll('.choices button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.choices button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 document.querySelector('.result').textContent='START HERE → '+btn.dataset.answer;
}));

// Product object: floats and rotates as the reader moves through the formula.
const detailScroll=document.querySelector('.detail-scroll');
const floating=document.querySelector('.sticky-pack .floating-pack');
if(detailScroll&&floating){
 const spin=()=>{
  if(innerWidth<=800){floating.style.transform='rotate(-5deg)';return}
  const r=detailScroll.getBoundingClientRect();
  const total=detailScroll.offsetHeight-innerHeight;
  const p=Math.max(0,Math.min(1,-r.top/total));
  const rot=-18+p*390;
  const y=Math.sin(p*Math.PI*4)*28;
  const scale=.92+Math.sin(p*Math.PI)*.12;
  floating.style.transform=`translateY(${y}px) rotateY(${rot}deg) rotateZ(${Math.sin(p*Math.PI*2)*5}deg) scale(${scale})`;
 }
 addEventListener('scroll',spin,{passive:true});addEventListener('resize',spin);spin();
}
