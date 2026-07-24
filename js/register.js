import {
    auth,
    db,
    provider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    doc,
    setDoc,
    serverTimestamp
} from "./firebase.js";

// =======================
// Hiện / Ẩn mật khẩu
// =======================

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if (togglePassword) {

    togglePassword.onclick = () => {

        if (password.type === "password") {

            password.type = "text";
            togglePassword.className = "fa-solid fa-eye-slash";

        } else {

            password.type = "password";
            togglePassword.className = "fa-solid fa-eye";

        }

    };

}

if (toggleConfirmPassword) {

    toggleConfirmPassword.onclick = () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";
            toggleConfirmPassword.className = "fa-solid fa-eye-slash";

        } else {

            confirmPassword.type = "password";
            toggleConfirmPassword.className = "fa-solid fa-eye";

        }

    };

}

// =======================
// Đăng ký Email
// =======================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const pass = password.value;
        const confirm = confirmPassword.value;

        if (pass !== confirm) {

            alert("❌ Mật khẩu nhập lại không khớp!");

            return;

        }

        try {

            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );

            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {

                uid: user.uid,

                fullname: fullname,

                email: email,

                balance: 0,

                role: "user",

                seller: false,

                avatar: "",

                createdAt: serverTimestamp()

            });

            alert("🎉 Đăng ký thành công!");

            window.location.href = "index.html";

        } catch (error) {

            let message = "Đăng ký thất bại.";

            switch (error.code) {

                case "auth/email-already-in-use":
                    message = "Email đã tồn tại.";
                    break;

                case "auth/weak-password":
                    message = "Mật khẩu phải có ít nhất 6 ký tự.";
                    break;

                case "auth/invalid-email":
                    message = "Email không hợp lệ.";
                    break;

            }

            alert(message);

        }

    });

}

// =======================
// Đăng ký Google
// =======================

const googleRegister = document.getElementById("googleRegister");

if (googleRegister) {

    googleRegister.onclick = async () => {

        try {

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {

                uid: user.uid,

                fullname: user.displayName || "Người dùng",

                email: user.email,

                avatar: user.photoURL || "",

                balance: 0,

                role: "user",

                seller: false,

                createdAt: serverTimestamp()

            }, { merge: true });

            alert("🎉 Đăng ký bằng Google thành công!");

            window.location.href = "index.html";

        } catch (error) {

            alert("❌ " + error.message);

        }

    };

}
