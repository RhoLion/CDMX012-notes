import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB46z01W-8cnWy5Uk5-7Zbqdu_yFW4ccps",
  authDomain: "mis-notas-favoritas-14c15.firebaseapp.com",
  projectId: "mis-notas-favoritas-14c15",
  storageBucket: "mis-notas-favoritas-14c15.appspot.com",
  messagingSenderId: "203967912501",
  appId: "1:203967912501:web:9f8d6fa3f12b4c75466f7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, app, db }


