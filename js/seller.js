import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

doc,
getDoc,
collection,
query,
where,
getDocs,
updateDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const sellerName=document.getElementById("sellerName");
const sellerStatus=document.getElementById("sellerStatus");

const totalProducts=document.getElementById("totalProducts");
const totalOrders=document.getElementById("totalOrders");
const totalMoney=document.getElementById("totalMoney");

const productList=document.getElementById("productList");

onAuthStateChanged(auth,async(user)=>{

if(!user){

location.href="login.html";

return;

}

sellerName.textContent=user.displayName||user.email;

const sellerRef=doc(db,"seller_requests",user.uid);

const sellerSnap=await getDoc(sellerRef);

if(!sellerSnap.exists()){

alert("Bạn chưa đăng ký Seller.");

location.href="seller.html";

return;

}

const seller=sellerSnap.data();

sellerStatus.textContent=seller.status;

if(seller.status!="approved"){

alert("Seller của bạn đang chờ Admin duyệt.");

return;

}

loadProducts(user.uid);

});

async function loadProducts(uid){

const q=query(

collection(db,"products"),

where("sellerUid","==",uid)

);

const snapshot=await getDocs(q);

let count=0;

let money=0;

productList.innerHTML="";

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

count++;

money+=Number(data.price);

productList.innerHTML+=`

<div class="product-card">

<img src="${data.image||'assets/no-image.png'}">

<div class="product-info">

<h3>${data.name}</h3>

<p>${data.category}</p>

<div class="product-price">

${Number(data.price).toLocaleString()}đ

</div>

<div class="product-actions">

<button class="edit-btn"

onclick="editProduct('${docSnap.id}')">

Sửa

</button>

<button class="delete-btn"

onclick="deleteProduct('${docSnap.id}')">

Xóa

</button>

</div>

</div>

</div>

`;

});

totalProducts.textContent=count;

totalMoney.textContent=money.toLocaleString()+"đ";

totalOrders.textContent="0";

}

window.editProduct=function(id){

location.href="product-add.html?id="+id;

}

window.deleteProduct=async function(id){

const ok=confirm("Bạn có chắc muốn xóa sản phẩm?");

if(!ok)return;

await updateDoc(

doc(db,"products",id),

{

deleted:true

}

);

location.reload();

}

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick=()=>{

auth.signOut();

};

}
