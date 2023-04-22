import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { ui } from 'dataStore/firebaseInit';
import { adminEmail } from 'dataStore/firebaseConfig';
import { setUserToStore } from 'dataStore/firestoreActions';

export const LoginAndRegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if (user.email === adminEmail) {
          navigate('admin');
        }
        if (user.email !== adminEmail) {
          navigate('user');
        }
      }
    });
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
          if (authResult.user) {
            await setUserToStore(
              {
                name: authResult.user.displayName,
                email: authResult.user.email,
              },
              authResult.user.uid
            );

            if (authResult.user.email === adminEmail) {
              navigate('admin');
            } else {
              navigate('user');
            }
          }
          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        },
      },
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: ['public_profile', 'email'],
        },
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [navigate]);

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </>
  );
};
