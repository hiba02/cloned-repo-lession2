import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAPTOtciEXDRAftZmZrK5J2tHcpq5QQQdI",
  authDomain: "crown-db-e9b8d.firebaseapp.com",
  databaseURL: "https://crown-db-e9b8d.firebaseio.com",
  projectId: "crown-db-e9b8d",
  storageBucket: "crown-db-e9b8d.appspot.com",
  messagingSenderId: "771858135462",
  appId: "1:771858135462:web:1400e21f67a377c58f7767"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
