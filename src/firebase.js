import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRH6hQsCkrwA8oj24jKYO--SYnd-QG_po",
  authDomain: "unichat-914cd.firebaseapp.com",
  projectId: "unichat-914cd",
  storageBucket: "unichat-914cd.appspot.com",
  messagingSenderId: "695897116695",
  appId: "1:695897116695:web:1c980b1448320f968fcc52",
};
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
