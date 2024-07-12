import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCvR3YOoxl9MMYqi92KRnxehHe3nySF2-w",
  authDomain: "chat-sphere-2024.firebaseapp.com",
  projectId: "chat-sphere-2024",
  storageBucket: "chat-sphere-2024.appspot.com",
  messagingSenderId: "956341834152",
  appId: "1:956341834152:web:cba1e1a3544e542d7e8d9d",
  measurementId: "G-E48BBKR58V"
};


const app = initializeApp(firebaseConfig);
//auth service
export const auth = getAuth(app);
//firestore service
export const db = getFirestore(app);
//storage service
export const storage = getStorage(app)

