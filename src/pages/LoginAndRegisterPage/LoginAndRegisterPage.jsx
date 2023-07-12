import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  facebookProvider,
  getProviderForProviderId,
  ui,
  uiConfig,
} from 'dataStore/firebaseInit';
import { adminEmail } from 'dataStore/firebaseConfig';
import { setUserToStore } from 'dataStore/firestoreActions';
import { BDiv, Button } from 'bootstrap-4-react';

export const LoginAndRegisterPage = () => {
  const navigate = useNavigate();
  const [isMatchMobile, setIsMatchMobile] = useState(false);

  useEffect(() => {
    const onMediaChangeHandler = e => setIsMatchMobile(e.matches);
    const media = window.matchMedia('(max-width: 268px)');
    media.addEventListener('change', onMediaChangeHandler);
    return () => media.removeEventListener('change', onMediaChangeHandler);
  }, []);

  useEffect(() => {
    ui.start('#firebaseui-auth-container', uiConfig);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const userForDB = {
          name: user.displayName,
          email: user.email,
        };
        setUserToStore(userForDB);
        if (user.email === adminEmail) {
          navigate('admin');
        }
        if (user.email !== adminEmail) {
          navigate('user');
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const facebookSignInHandler = async () => {
    facebookProvider.addScope('public_profile');
    facebookProvider.addScope('email');
    facebookProvider.setCustomParameters({
      prompt: 'select_account',
      display: 'popup',
    });
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      accountExistCondition(error);
    }
  };

  const accountExistCondition = async error => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData.email;
      const methods = await auth.fetchSignInMethodsForEmail(email);
      const provider = getProviderForProviderId(methods[0]);
      await signInWithRedirect(auth, provider);
    }
  };

  return (
    <>
      <BDiv style={{ padding: '0 24px' }}>
        <Button
          type="button"
          block
          mx="auto"
          primary
          style={{
            maxWidth: '220px',
            height: '40px',
            display: 'flex',
            padding: '0 16px',
            borderRadius: '2px',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#3b5998',
            fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
            lineHeight: 'normal',
            fontWeight: '500',
            color: '#fff',
            fontSize: '14px',
            textTransform: 'none',
            boxShadow:
              '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
          }}
          onClick={facebookSignInHandler}
        >
          <img
            alt=""
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
            style={{
              width: '18px',
              height: '18px',
              marginRight: '16px',
              border: 'none',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          />
          {!isMatchMobile && 'Sign in with Facebook'}
          {isMatchMobile && 'Facebook'}
        </Button>
      </BDiv>
      <div id="firebaseui-auth-container"></div>
    </>
  );
};
