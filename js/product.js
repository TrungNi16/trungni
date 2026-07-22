import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
serverTimestamp,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form=document.getElementById("productForm");

let currentUser=null;

onAuthStateChanged(auth,async(user)=>{

if(!user){

location.href="login.html";

return;

}

currentUser=user;

const sellerDoc=await getDoc(doc(db,"seller_requests",user.uid));

if(!sellerDoc.exists()){

alert("Bạn chưa đăng ký Seller.");

location.href="seller.html";

return;

}

const seller=sellerDoc.data();

if(seller.status!="approved"){

alert("Seller của bạn chưa được Admin duyệt.");

location.href="seller-dashboard.html";

return;

}

});

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const name=document.getElementById("name").value;

const category=document.getElementById("category").value;

const price=document.getElementById("price").value;

const description=document.getElementById("description").value;

const image=document.getElementById("image");

let imageUrl="";

if(image.files.length>0){

/*
Sau này sẽ upload lên Firebase Storage.
Hiện tại dùng ảnh mặc định.
*/

imageUrl="assets/no-image.png";

}

await addDoc(collection(db,"products"),{

sellerUid:currentUser.uid,

sellerEmail:currentUser.email,

name:name,

category:category,

price:Number(price),

description:description,

image:imageUrl,

status:"pending",

views:0,

sold:0,

createdAt:serverTimestamp()

});

alert("Đăng sản phẩm thành công.\nĐang chờ Admin duyệt.");

form.reset();

location.href="seller-dashboard.html";

});
