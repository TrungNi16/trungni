import {
    auth,
    db,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc
} from "./firebase.js";

// Đăng nhập Google
window.loginGoogle = async function () {
    try {
        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                balance: 50000,
                role: "member",
                seller: false,
                createdAt: new Date()
            });
        }

        window.location.href = "index.html";

    } catch (e) {
        alert(e.message);
    }
};

// Đăng xuất
window.logout = async function () {
    await signOut(auth);
    window.location.href = "login.html";
};

// Kiểm tra đăng nhập
onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) return;

    const data = snap.data();

    const name = document.getElementById("userName");
    const money = document.getElementById("userMoney");
    const avatar = document.getElementById("userAvatar");

    if (name) name.innerText = data.name;
    if (money) money.innerText = data.balance.toLocaleString() + "đ";

    if (avatar && data.avatar) {
        avatar.src = data.avatar;
    }

});
