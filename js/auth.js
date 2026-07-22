import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Đăng ký
window.registerUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    alert("Đăng ký thành công!");

    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
};

// Đăng nhập
window.loginUser = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Đăng nhập thành công!");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};

// Đăng xuất
window.logoutUser = async function () {

  await signOut(auth);

  location.reload();

};

// Kiểm tra trạng thái
onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Đã đăng nhập:", user.email);

  } else {

    console.log("Chưa đăng nhập");

  }

});
