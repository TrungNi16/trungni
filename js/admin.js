import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs,
doc,
updateDoc,
deleteDoc,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const sellerList=document.getElementById("sellerList");
const productList=document.getElementById("productList");

onAuthStateChanged(auth,async(user)=>{

if(!user){

location.href="login.html";

return;

}

// Kiểm tra quyền Admin
const adminEmail="trungni168@gmail.com";

if(user.email!=adminEmail){

alert("Bạn không có quyền truy cập.");

location.href="index.html";

return;

}

loadSeller();

loadProducts();

});

async function loadSeller(){

if(!sellerList)return;

sellerList.innerHTML="";

const snapshot=await getDocs(collection(db,"seller_requests"));

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

sellerList.innerHTML+=`

<div class="seller-card">

<h3>${data.shopName||"Chưa đặt tên shop"}</h3>

<p>👤 ${data.name}</p>

<p>📧 ${data.email}</p>

<p>📌 ${data.status}</p>

<button
class="btn-success"
onclick="approveSeller('${docSnap.id}')">

✅ Duyệt

</button>

<button
class="btn-warning"
onclick="rejectSeller('${docSnap.id}')">

❌ Từ chối

</button>

<button
class="btn-danger"
onclick="deleteSeller('${docSnap.id}')">

🗑️ Xóa

</button>

</div>

`;

});

}

window.approveSeller=async(id)=>{

await updateDoc(doc(db,"seller_requests",id),{

status:"approved"

});

alert("Đã duyệt Seller");

location.reload();

}

window.rejectSeller=async(id)=>{

await updateDoc(doc(db,"seller_requests",id),{

status:"rejected"

});

alert("Đã từ chối Seller");

location.reload();

}

window.deleteSeller=async(id)=>{

if(!confirm("Xóa Seller này?")) return;

await deleteDoc(doc(db,"seller_requests",id));

location.reload();

}

async function loadProducts(){

if(!productList)return;

productList.innerHTML="";

const q=query(

collection(db,"products"),

where("status","==","pending")

);

const snapshot=await getDocs(q);

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

productList.innerHTML+=`

<div class="seller-card">

<h3>${data.name}</h3>

<p>📂 ${data.category}</p>

<p>💰 ${Number(data.price).toLocaleString()}đ</p>

<p>👤 ${data.sellerEmail}</p>

<button
class="btn-success"
onclick="approveProduct('${docSnap.id}')">

✅ Duyệt

</button>

<button
class="btn-danger"
onclick="deleteProduct('${docSnap.id}')">

🗑️ Xóa

</button>

</div>

`;

});

}

window.approveProduct=async(id)=>{

await updateDoc(doc(db,"products",id),{

status:"approved"

});

alert("Đã duyệt sản phẩm");

location.reload();

}

window.deleteProduct=async(id)=>{

if(!confirm("Xóa sản phẩm?")) return;

await deleteDoc(doc(db,"products",id));

location.reload();

}
