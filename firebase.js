import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAj4lcA7eWg1RFehOYYEydRUQ-WvZhgvyU",
  authDomain: "blog-cristi.firebaseapp.com",
  projectId: "blog-cristi",
  storageBucket: "blog-cristi.appspot.com",
  messagingSenderId: "460477220538",
  appId: "1:460477220538:web:022eb3ef90c1580c4fa483",
  measurementId: "G-90GZ7JH0JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Export the app object
export { app , db };