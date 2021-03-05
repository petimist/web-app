import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../store/index';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Use dot env later
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('setUserAction', user);
  } else {
    store.dispatch('setUserAction', null);
  }
});
