import {
    auth,
    provider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "./firebase.js";

// =======================
// Hiện / Ẩn mật khẩu
// =======================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {
    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {
            password.type = "text";
            togglePassword.className = "fa-solid fa-eye-slash";
        } else {
            password.type = "password";
            togglePassword.className = "fa-solid fa-eye";
        }

    });
}

// =======================
// Đăng nhập Email
// =======================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("🎉 Đăng nhập thành công!");

            window.location.href = "index.html";

        } catch (error) {

            let message = "Đăng nhập thất bại.";

            switch (error.code) {

                case "auth/invalid-email":
                    message = "Email không hợp lệ.";
                    break;

                case "auth/user-not-found":
                    message = "Không tìm thấy tài khoản.";
                    break;

                case "auth/wrong-password":
                    message = "Sai mật khẩu.";
                    break;

                case "auth/invalid-credential":
                    message = "Email hoặc mật khẩu không đúng.";
                    break;

                case "auth/too-many-requests":
                    message = "Bạn đăng nhập quá nhiều lần. Hãy thử lại sau.";
                    break;

            }

            alert(message);

        }

    });

}

// =======================
// Đăng nhập Google
// =======================

const googleLogin = document.getElementById("googleLogin");

if (googleLogin) {

    googleLogin.addEventListener("click", async () => {

        try {

            await signInWithPopup(auth, provider);

            alert("🎉 Đăng nhập Google thành công!");

            window.location.href = "index.html";

        } catch (error) {

            alert("❌ " + error.message);

        }

    });

}
