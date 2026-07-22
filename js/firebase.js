// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCghsuyQOhK6EYM5tyMVeMyMORE-yy79UE",
  authDomain: "trungni.firebaseapp.com",
  projectId: "trungni",
  storageBucket: "trungni.firebasestorage.app",
  messagingSenderId: "195760563004",
  appId: "1:195760563004:web:30b4c6a98eee4be1a23439"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication
const auth = getAuth(app);

// Khởi tạo Firestore
const db = getFirestore(app);

// Export để các file khác sử dụng
export { auth, db };
