import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCghsuyQOhK6EYM5tyMVeMyMORE-yy79UE",
  authDomain: "trungni.firebaseapp.com",
  databaseURL: "https://trungni-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trungni",
  storageBucket: "trungni.firebasestorage.app",
  messagingSenderId: "195760563004",
  appId: "1:195760563004:web:30b4c6a98eee4be1a23439"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
await setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  db,
  storage,
  provider,

  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,

  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,

  collection,
  addDoc,
  getDocs,

  serverTimestamp,
  query,
  where,
  onSnapshot,

  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};
