import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "crown-db-e9b8d.firebaseapp.com",
  databaseURL: "https://crown-db-e9b8d.firebaseio.com",
  projectId: "crown-db-e9b8d",
  storageBucket: "crown-db-e9b8d.appspot.com",
  messagingSenderId: "771858135462",
  appId: "1:771858135462:web:1400e21f67a377c58f7767"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;

  // const userRef = firestore.doc('users/1234fdwfewf');
  const userRef = firestore.doc(`users/${userAuth.uid }`);
  const snapShot = await userRef.get()
  // console.log('user uid', userAuth.uid)
  // console.log(firestore.doc('users/1234fdwfewf'));
  console.log('snapShot',snapShot);
  if (!snapShot.exits) {
    // console.log('userAuth: ',userAuth.displayName, userAuth.email);
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      console.log('userRef: ',userRef);
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
