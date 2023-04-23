import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { firebaseConfig } from 'dataStore/firebaseConfig';

export const app = firebase.initializeApp(firebaseConfig);

export const ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(firebase.auth());
