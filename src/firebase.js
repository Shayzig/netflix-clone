import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAC8YI9MU_HcdGA6mAX93PJykLxMtaCD1U",
    authDomain: "netflix-clone-307b4.firebaseapp.com",
    projectId: "netflix-clone-307b4",
    storageBucket: "netflix-clone-307b4.appspot.com",
    messagingSenderId: "443721028538",
    appId: "1:443721028538:web:d5a0a754b834b269e04383"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, db };
export default firebaseApp;
