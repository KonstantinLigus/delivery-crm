import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { firebaseConfig } from 'dataStore/firebaseConfig';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(app);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export const getProviderForProviderId = method => {
  switch (method) {
    case 'google.com':
      return googleProvider;

    case 'facebook.com':
      return googleProvider;

    case 'emailLink':
      return;

    default:
      break;
  }
};

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};

export const ui = new firebaseui.auth.AuthUI(firebase.auth());
