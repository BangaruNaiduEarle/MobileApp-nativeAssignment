import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore"; // Import Firestore

// const firebaseConfig = {
//   apiKey: "AIzaSyDriygOyNJ5iCRGcdNDU1oZgLUsZBcIbw8",
//   authDomain: "react-native-1-a785d.firebaseapp.com",
//   projectId: "react-native-1-a785d",
//   storageBucket: "react-native-1-a785d.appspot.com",
//   messagingSenderId: "380385084887",
//   appId: "1:380385084887:web:7705c74130cc07c2d87792",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1BXPmWboSdj9P8zJj3_mClUd4Wc8y2fY",
  authDomain: "weddingprojectpavan.firebaseapp.com",
  projectId: "weddingprojectpavan",
  storageBucket: "weddingprojectpavan.appspot.com",
  messagingSenderId: "645327858798",
  appId: "1:645327858798:web:cfd2dde0a650fcfbac4a7f",
  measurementId: "G-WQQKXEFKKE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { firebase, db };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)
// const store = getStorage(app)
