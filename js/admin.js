import {
    db,
    storage,
    collection,
    addDoc,
    serverTimestamp,
    ref,
    uploadBytes,
    getDownloadURL
} from "./firebase.js";

const form = document.getElementById("productForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        try {

            const name = document.getElementById("name").value.trim();
            const description = document.getElementById("description").value.trim();
            const category = document.getElementById("category").value;
            const price = Number(document.getElementById("price").value);

            const file = document.getElementById("image").files[0];

            if (!file) {
                alert("Vui lòng chọn ảnh.");
                return;
            }

            // Upload ảnh

            const fileName = Date.now() + "_" + file.name;

            const storageRef = ref(storage, "products/" + fileName);

            await uploadBytes(storageRef, file);

            const imageUrl = await getDownloadURL(storageRef);

            // Lưu Firestore

            await addDoc(collection(db, "products"), {

                name,

                description,

                category,

                price,

                image: imageUrl,

                createdAt: serverTimestamp()

            });

            alert("🎉 Thêm sản phẩm thành công!");

            form.reset();

        } catch (err) {

            console.error(err);

            alert("Có lỗi xảy ra.");

        }

    });

}
