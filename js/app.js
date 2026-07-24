/*=========================================
        APP.JS
=========================================*/

// ==========================
// AOS
// ==========================

AOS.init({

    duration:800,

    once:true,

    offset:80

});

// ==========================
// Mobile Menu
// ==========================

const mobileBtn=document.getElementById("mobileMenuBtn");

const mobileMenu=document.getElementById("mobileMenu");

if(mobileBtn){

mobileBtn.onclick=()=>{

mobileMenu.classList.toggle("show");

}

}

// ==========================
// Sticky Header Shadow
// ==========================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>20){

header.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

}else{

header.style.boxShadow="none";

}

});

// ==========================
// Back To Top
// ==========================

const topBtn=document.createElement("div");

topBtn.className="back-top";

topBtn.innerHTML="⬆";

document.body.appendChild(topBtn);

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

// ==========================
// Favorite
// ==========================

document.querySelectorAll(".favorite").forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle("liked");

if(btn.classList.contains("liked")){

btn.innerHTML="❤️";

}else{

btn.innerHTML="🤍";

}

}

});

// ==========================
// Buy Button
// ==========================

document.querySelectorAll(".buy-btn").forEach(btn=>{

btn.onclick=()=>{

showToast("🛒 Đã thêm vào giỏ hàng");

}

});

// ==========================
// Toast
// ==========================

function showToast(text){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=text;

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},3000);

}

// ==========================
// Counter Animation
// ==========================

document.querySelectorAll(".stat h2").forEach(counter=>{

const target=parseInt(counter.innerText.replace(/\D/g,""));

let current=0;

const timer=setInterval(()=>{

current+=Math.ceil(target/80);

if(current>=target){

counter.innerText=target+"+";

clearInterval(timer);

}else{

counter.innerText=current+"+";

}

},20);

});

// ==========================
// Product Hover
// ==========================

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.setProperty("--x",x+"px");

card.style.setProperty("--y",y+"px");

});

});

// ==========================
// Loading
// ==========================

window.onload=()=>{

document.body.classList.add("loaded");

};
