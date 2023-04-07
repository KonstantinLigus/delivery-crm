import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';

export const firebaseConfig = {
  apiKey: 'AIzaSyBVClOKPEUth1HcHcd-qRVAv_l97ywtPrs',
  authDomain: 'authenticateforapps.firebaseapp.com',
  projectId: 'authenticateforapps',
  storageBucket: 'authenticateforapps.appspot.com',
  messagingSenderId: '57680612991',
  appId: '1:57680612991:web:cfc648150c2a0fa65c794a',
  measurementId: 'G-2LQFL7WCPQ',
};
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const LoginAndRegisterPage = () => {
  useEffect(() => {
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
    });
  }, []);

  return (
    <>
      <div>LoginAndRegisterPage</div>
      <div id="firebaseui-auth-container"></div>
    </>
  );
};
