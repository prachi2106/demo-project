import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdzr2eI5Nl_sLqvEOe2bWqpa_TV4E2Uws",
  authDomain: "canteenmanagement-12c53.firebaseapp.com",
  projectId: "canteenmanagement-12c53",
  storageBucket: "canteenmanagement-12c53.appspot.com",
  messagingSenderId: "71169078697",
  appId: "1:71169078697:web:d59ecbe3685e597fd580b8",
  measurementId: "G-C3M525T5B7"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
