import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { firebaseConfig } from 'dataStore/firebaseConfig';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';

export const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const facebookProvider = new FacebookAuthProvider();

export const ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(firebase.auth());
