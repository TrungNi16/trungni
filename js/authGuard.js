import {
    auth,
    db,
    onAuthStateChanged,
    doc,
    getDoc
} from "./firebase.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {

        alert("Không tìm thấy thông tin người dùng.");
        window.location.href = "login.html";
        return;

    }

    const data = snap.data();

    const page = window.location.pathname;

    if (page.includes("admin") && data.role !== "admin") {

        alert("Bạn không có quyền truy cập.");

        window.location.href = "index.html";

    }

    if (page.includes("seller") && data.role !== "seller" && data.role !== "admin") {

        alert("Bạn không có quyền truy cập.");

        window.location.href = "index.html";

    }

});
