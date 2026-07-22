import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

import {
  doc,
  setDoc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ===== ĐĂNG KÝ =====
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role: 'user',
        balance: 0,
        createdAt: new Date()
      });

      alert('Đăng ký thành công!');
      window.location.href = 'login.html';

    } catch (error) {
      alert(error.message);
    }
  });
}

// ===== ĐĂNG NHẬP =====
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert('Đăng nhập thành công!');
      window.location.href = 'profile.html';

    } catch (error) {
      alert('Sai email hoặc mật khẩu!');
    }
  });
}

// ===== KIỂM TRA ĐĂNG NHẬP =====
onAuthStateChanged(auth, async (user) => {
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');

  if (user && profileName && profileEmail) {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      profileName.textContent = data.name;
      profileEmail.textContent = data.email;
    }
  }
});

// ===== ĐĂNG XUẤT =====
window.logout = async function () {
  await signOut(auth);
  window.location.href = 'index.html';
};
