import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBl_pL-N0lYm0luVkxbv0js3YO2pzP50gU",
  authDomain: "fir-form-81458.firebaseapp.com",
  projectId: "fir-form-81458",
  storageBucket: "fir-form-81458.appspot.com",
  messagingSenderId: "322553891923",
  appId: "1:322553891923:web:be00fdf7f3dc98216e0aa6"
};


const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);