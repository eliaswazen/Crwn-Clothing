import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBPEnZpwhAt9GL0rKG184O-jcPmrBEeecs",
    authDomain: "crwn-db-4faa7.firebaseapp.com",
    databaseURL: "https://crwn-db-4faa7.firebaseio.com",
    projectId: "crwn-db-4faa7",
    storageBucket: "crwn-db-4faa7.appspot.com",
    messagingSenderId: "454955652355",
    appId: "1:454955652355:web:9f8f6cc0d6b8eaa9dd4536",
    measurementId: "G-94C399M31V"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const{displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;

  }

  

  firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore =firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
