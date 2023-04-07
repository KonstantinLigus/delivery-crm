import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { firebaseConfig } from '../../secret';

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const LoginAndRegisterPage = () => {
  useEffect(() => {
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: 'http://localhost:3000',
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
