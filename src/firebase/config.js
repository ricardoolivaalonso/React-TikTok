import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCqgBwXd98YbSt5J080YKOtkXkzQEwokac",
    authDomain: "roa-03.firebaseapp.com",
    projectId: "roa-03",
    storageBucket: "roa-03.appspot.com",
    messagingSenderId: "729605325185",
    appId: "1:729605325185:web:0b276d1b6b337b081de880"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }


