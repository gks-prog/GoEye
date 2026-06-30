document.addEventListener("DOMContentLoaded",()=>{


/* ==========================
   AUDIO ENGINE
========================== */


const audioCtx =
new (window.AudioContext ||
window.webkitAudioContext)();



function sound(type){


if(audioCtx.state==="suspended")
return;



const osc =
audioCtx.createOscillator();


const gain =
audioCtx.createGain();



if(type==="hover"){


osc.type="sine";

osc.frequency.setValueAtTime(
220,
audioCtx.currentTime
);


osc.frequency.exponentialRampToValueAtTime(
80,
audioCtx.currentTime+.12
);


gain.gain.setValueAtTime(
0.08,
audioCtx.currentTime
);


}



else{


osc.type="triangle";


osc.frequency.setValueAtTime(
700,
audioCtx.currentTime
);


osc.frequency.exponentialRampToValueAtTime(
180,
audioCtx.currentTime+.15
);


gain.gain.setValueAtTime(
0.15,
audioCtx.currentTime
);


}



gain.gain.exponentialRampToValueAtTime(

0.01,

audioCtx.currentTime+.15

);



osc.connect(gain);

gain.connect(audioCtx.destination);



osc.start();

osc.stop(
audioCtx.currentTime+.15
);


}





/* ==========================
 PRELOADER
========================== */


const loader =
document.getElementById(
"preloader"
);


const enter =
document.getElementById(
"enter-btn"
);



enter.addEventListener(
"click",
()=>{


audioCtx.resume();


sound("click");



loader.style.opacity="0";



setTimeout(()=>{


loader.style.display="none";


document
.querySelector(".hero-content")
.classList.add("active");



},1000);



}

);







/* ==========================
 HOVER EFFECTS
========================== */



const hoverElements =
document.querySelectorAll(
".glass-card,a,#enter-btn"
);



hoverElements.forEach(el=>{


el.addEventListener(
"mouseenter",
()=>sound("hover")
);


});







/* ==========================
 SCROLL REVEAL
========================== */


const reveals =
document.querySelectorAll(
".reveal"
);



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target
.classList.add("active");



observer.unobserve(
entry.target
);



}



});


},

{

threshold:.15

}



);



reveals.forEach(el=>{


observer.observe(el);


});







/* ==========================
 SMOOTH NAVIGATION
========================== */


document
.querySelectorAll(
"nav a"
)

.forEach(link=>{


link.addEventListener(
"click",
e=>{


e.preventDefault();



const target =
document.querySelector(
link.getAttribute("href")
);



target.scrollIntoView({

behavior:"smooth"

});



}

);



});








/* ==========================
 PARALLAX HERO
========================== */


const hero =
document.querySelector(".hero");



window.addEventListener(
"scroll",
()=>{


let offset =
window.scrollY;



hero.style.backgroundPosition =

`center ${offset*.25}px`;



});







/* ==========================
 CARD TILT EFFECT
========================== */



const cards =
document.querySelectorAll(
".glass-card"
);



cards.forEach(card=>{


card.addEventListener(
"mousemove",
e=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX -
rect.left;



const y =
e.clientY -
rect.top;



const rotateX =
(y-rect.height/2)/25;



const rotateY =
(rect.width/2-x)/25;



card.style.transform =

`

perspective(800px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-8px)

`;



}

);



card.addEventListener(
"mouseleave",
()=>{


card.style.transform="";


}

);



});








/* ==========================
 GOLD CURSOR TRAIL
========================== */


const glow =
document.createElement(
"div"
);



glow.className=
"cursor-glow";


document.body.appendChild(
glow
);



window.addEventListener(
"mousemove",
e=>{


glow.style.left =
e.clientX+"px";


glow.style.top =
e.clientY+"px";



});






});
