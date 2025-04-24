// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGyr4iB3xR1f9dqm2896axRgkl8opWJSY",
  authDomain: "velvety-outcome-455613-r7.firebaseapp.com",
  projectId: "velvety-outcome-455613-r7",
  storageBucket: "velvety-outcome-455613-r7.firebasestorage.app",
  messagingSenderId: "955445221299",
  appId: "1:955445221299:web:77e9163f36f74cae329dc6",
  measurementId: "G-92V88EH1Q5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
