import {
getFirestore,
collection,
getDocs,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db=getFirestore();

async function loadSeller(){

const list=document.getElementById("sellerList");

const snapshot=await getDocs(collection(db,"seller_requests"));

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

list.innerHTML+=`

<div class="seller-card">

<h3>${data.shopName}</h3>

<p>${data.name}</p>

<p>${data.email}</p>

<p>${data.status}</p>

<button onclick="approveSeller('${docSnap.id}')">

✅ Duyệt

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

loadSeller();
