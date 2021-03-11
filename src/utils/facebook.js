// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store';

const facebookProvider = new firebase.auth.FacebookAuthProvider();

function facebookSignInPopup(provider) {
  // [START auth_facebook_signin_popup]
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const { credential } = result;

      // The signed-in user info.
      const { user } = result;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const { accessToken } = credential;

      // ...
      console.log('Logged in', credential, user, accessToken);
      return true;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error;
      // The firebase.auth.AuthCredential type that was used.
      const { credential } = error;

      console.log('ERROR!', credential, email, errorMessage, errorCode);
      // ...
    });
  // [END auth_facebook_signin_popup]
}

function signOut() {
  // [START auth_sign_out]
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      store.dispatch('setUserAction', null);
      console.log('Signed out!');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  // [END auth_sign_out]
}

export { facebookProvider, facebookSignInPopup, signOut };
