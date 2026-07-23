import {
db,
doc,
getDoc,
updateDoc
} from "./firebase.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadProduct(){

    const ref = doc(db,"products",id);

    const snap = await getDoc(ref);

    if(!snap.exists()){

        alert("Không tìm thấy sản phẩm");

        location.href="admin-list.html";

        return;

    }

    const p = snap.data();

    document.getElementById("name").value = p.name || "";

    document.getElementById("price").value = p.price || "";

    document.getElementById("image").value = p.image || "";

    document.getElementById("description").value = p.description || "";

}

document.getElementById("saveBtn").onclick = async()=>{

    await updateDoc(doc(db,"products",id),{

        name:document.getElementById("name").value,

        price:Number(document.getElementById("price").value),

        image:document.getElementById("image").value,

        description:document.getElementById("description").value

    });

    alert("✅ Đã cập nhật sản phẩm");

    location.href="admin-list.html";

}

loadProduct();
