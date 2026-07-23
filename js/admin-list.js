import {
db,
collection,
getDocs,
deleteDoc,
doc
} from "./firebase.js";

const tbody=document.querySelector("tbody");

async function loadProducts(){

tbody.innerHTML="";

const snapshot=await getDocs(collection(db,"products"));

snapshot.forEach(item=>{

const p=item.data();

tbody.innerHTML+=`

<tr>

<td>

<img src="${p.image}" width="80">

</td>

<td>

${p.name}

</td>

<td>

${Number(p.price).toLocaleString()}đ

</td>

<td>

<button onclick="deleteProduct('${item.id}')">

🗑 Xóa

</button>

</td>

</tr>

`;

});

}

window.deleteProduct=async(id)=>{

if(!confirm("Bạn muốn xóa?")) return;

await deleteDoc(doc(db,"products",id));

loadProducts();

}

loadProducts();
