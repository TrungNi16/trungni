import {
    auth,
    db,
    signOut,
    onAuthStateChanged,
    doc,
    getDoc
} from "./firebase.js";

const guestMenu = document.getElementById("guestMenu");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const balance = document.getElementById("user-balance");

onAuthStateChanged(auth, async (user) => {

    if (user) {

        guestMenu.style.display = "none";
        userMenu.style.display = "flex";

        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {

            const data = snap.data();

            userName.textContent = "👋 " + data.fullname;

            balance.textContent =
                Number(data.balance || 0).toLocaleString() + " VNĐ";

        }

    } else {

        guestMenu.style.display = "flex";
        userMenu.style.display = "none";

        balance.textContent = "0 VNĐ";

    }

});

logoutBtn?.addEventListener("click", async () => {

    await signOut(auth);

    location.href = "index.html";

});
