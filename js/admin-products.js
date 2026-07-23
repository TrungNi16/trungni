import {
db,
collection,
addDoc
} from "./firebase.js";

const btn = document.getElementById("saveBtn");

btn.onclick = async () => {

const name = document.getElementById("name").value;

const price = Number(document.getElementById("price").value);

const image = document.getElementById("image").value;

const description = document.getElementById("description").value;

if(name=="" || price<=0){

alert("Nhập đầy đủ thông tin");

return;

}

await addDoc(collection(db,"products"),{

name,

price,

image,

description,

createdAt:Date.now()

});

alert("Đã thêm sản phẩm");

location.reload();

}
