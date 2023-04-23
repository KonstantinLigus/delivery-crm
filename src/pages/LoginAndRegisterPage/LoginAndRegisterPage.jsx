import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { auth, ui } from 'dataStore/firebaseInit';
import { adminEmail } from 'dataStore/firebaseConfig';
import { setUserToStore } from 'dataStore/firestoreActions';

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

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </>
  );
};

// {
// provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   scopes: ['public_profile', 'email'],
// },

/* catch for exist user */
// catch(err => {
//         // User's email already exists.
//         if (err.code === 'auth/account-exists-with-different-credential') {
//           // The pending Facebook credential.
//           var pendingCred = err.credential;
//           // The provider account's email address.
//           var email = err.email;
//           // Get the sign-in methods for this email.
//           auth.fetchSignInMethodsForEmail(email).then(methods => {
//             // If the user has several sign-in methods, the first method
//             // in the list will be the "recommended" method to use.
//             if (methods[0] === 'password') {
//               // TODO: Ask the user for their password.
//               // In real scenario, you should handle this asynchronously.
//               var password = promptUserForPassword();
//               auth
//                 .signInWithEmailAndPassword(email, password)
//                 .then(result => {
//                   return result.user.linkWithCredential(pendingCred);
//                 })
//                 .then(() => {
//                   // Facebook account successfully linked to the existing user.
//                   goToApp();
//                 });
//               return;
//             }
//             // All other cases are external providers.
//             // Construct provider object for that provider.
//             // TODO: Implement getProviderForProviderId.
//             var provider = getProviderForProviderId(methods[0]);
//             // At this point, you should let the user know that they already have an
//             // account with a different provider, and validate they want to sign in
//             // with the new provider.
//             // Note: Browsers usually block popups triggered asynchronously, so in
//             // real app, you should ask the user to click on a "Continue" button
//             // that will trigger signInWithPopup().
//             auth.signInWithPopup(provider).then(result => {
//               // Note: Identity Platform doesn't control the provider's sign-in
//               // flow, so it's possible for the user to sign in with an account
//               // with a different email from the first one.

//               // Link the Facebook credential. We have access to the pending
//               // credential, so we can directly call the link method.
//               result.user.linkWithCredential(pendingCred).then(usercred => {
//                 // Success.
//                 goToApp();
//               });
//             });
//           });
//         }
//       });

// function facebookSignOut() {
//   firebase
//     .auth()
//     .signOut()

//     .then(
//       function () {
//         console.log('Signout successful!');
//       },
//       function (error) {
//         console.log('Signout failed');
//       }
//     );
// }

// const facebookSignInHandler = async () => {
//   facebookProvider.addScope('public_profile');
//   facebookProvider.addScope('email');
//   facebookProvider.setCustomParameters({
//     prompt: 'select_account',
//   });
//   try {
//     const result = await signInWithPopup(auth, facebookProvider);
//     // The signed-in user info.
//     const user = result.user;
//     navigate('user');

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   } catch (error) {
//     // Handle Errors here.
//     if (error.code === 'auth/account-exists-with-different-credential') {
//       setUserToStore(
//         {
//           name: error.customData._tokenResponse.displayName,
//           email: error.customData._tokenResponse.email,
//         },
//         error.customData._tokenResponse.localId
//       );

//       if (error.customData._tokenResponse.email === adminEmail) {
//         navigate('admin');
//       } else {
//         navigate('user');
//       }
//     }
//   }
// };

// <Button
//   type="button"
//   block
//   mx="auto"
//   primary
//   style={{ width: '220px' }}
//   onClick={facebookSignInHandler}
// >
//   Sign in with Facebook
// </Button>
// <Button
//   block
//   mx="auto"
//   primary
//   style={{ width: '220px' }}
//   onClick={facebookSignOut}
// >
//   Sign out with Facebook
// </Button>
