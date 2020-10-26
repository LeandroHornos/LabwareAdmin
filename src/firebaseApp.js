import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIZXXk4aleKYBU9YoFdsSRyelwRbBneRw",
    authDomain: "labwareadmin.firebaseapp.com",
    databaseURL: "https://labwareadmin.firebaseio.com",
    projectId: "labwareadmin",
    storageBucket: "labwareadmin.appspot.com",
    messagingSenderId: "647044734629",
    appId: "1:647044734629:web:84eabe570ab7486ff5374c"
  };
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
// export const db = fb.firestore();
