import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCghsuyQOhK6EYM5tyMVeMyMORE-yy79UE",
    authDomain: "trungni.firebaseapp.com",
    projectId: "trungni",
    storageBucket: "trungni.firebasestorage.app",
    messagingSenderId: "195760563004",
    appId: "1:195760563004:web:30b4c6a98eee4be1a23439"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

await setPersistence(auth, browserLocalPersistence);

// ================= ĐĂNG KÝ =================
window.register = async function () {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,
            name: name,
            email: email,
            balance: 50000,
            role: "member",
            seller: false,
            avatar: "",
            createdAt: Date.now()

        });

        alert("Đăng ký thành công!");

        location.href = "index.html";

    } catch (e) {

        alert(e.message);

    }

};

// ================= ĐĂNG NHẬP EMAIL =================
window.loginEmail = async function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        location.href = "index.html";

    } catch (e) {

        alert("Sai email hoặc mật khẩu.");

    }

};

// ================= ĐĂNG NHẬP GOOGLE =================
window.loginGoogle = async function () {

    try {

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        const ref = doc(db, "users", user.uid);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            await setDoc(ref, {

                uid: user.uid,
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                balance: 50000,
                role: "member",
                seller: false,
                createdAt: Date.now()

            });

        }

        location.href = "index.html";

    } catch (e) {

        alert(e.message);

    }

};

// ================= KIỂM TRA ĐĂNG NHẬP =================
onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) return;

    const data = snap.data();

    const name = document.getElementById("userName");
    const money = document.getElementById("userMoney");

    if (name) name.innerHTML = data.name;

    if (money) money.innerHTML = Number(data.balance).toLocaleString() + "đ";

});

// ================= ĐĂNG XUẤT =================
window.logout = async function () {

    await signOut(auth);

    location.href = "login.html";

};
