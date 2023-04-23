import {
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { auth, facebookProvider, ui } from 'dataStore/firebaseInit';
import { adminEmail } from 'dataStore/firebaseConfig';
import { setUserToStore } from 'dataStore/firestoreActions';
import { Button } from 'bootstrap-4-react';

export const LoginAndRegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [navigate]);

  const facebookSignInHandler = () => {
    // facebookProvider.addScope('public_profile');
    // facebookProvider.addScope('email');
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate('user');

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
      <Button
        block
        mx="auto"
        primary
        style={{ width: '220px' }}
        onClick={facebookSignInHandler}
      >
        Sign in with Facebook
      </Button>
    </>
  );
};

// {
// provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   scopes: ['public_profile', 'email'],
// },
