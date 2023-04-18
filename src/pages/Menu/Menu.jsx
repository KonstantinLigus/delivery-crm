import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import css from './Menu.module.css';
import { getUserFromStore } from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';
import { adminEmail } from 'dataStore/firebaseConfig';

export const Menu = () => {
  const [userState, setUserState] = useState({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUserState(await getUserFromStore(user.uid));
        if (user.email === adminEmail) {
          setIsAdminLoggedIn(true);
        }
      } else {
        // User is signed out
        setUserState({});
        setIsAdminLoggedIn(false);
      }
    });
  }, []);

  const SignOutHandler = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUserState({});
      setIsAdminLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.log('signOut failed', error);
    }
  };
  return (
    <>
      <ul className={css.navContainer}>
        <li className={css.linkItem}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.menuLink)}
          >
            Autorization
          </NavLink>
        </li>
        <li className={css.linkItem}>
          {Object.keys(userState).length !== 0 && (
            <NavLink
              to="user"
              className={({ isActive }) =>
                isActive ? css.active : css.menuLink
              }
            >
              User
            </NavLink>
          )}
        </li>
        {isAdminLoggedIn && (
          <li className={css.linkItem}>
            <NavLink
              to="admin"
              className={({ isActive }) =>
                isActive ? css.active : css.menuLink
              }
            >
              Edit users
            </NavLink>
          </li>
        )}
      </ul>
      <div className={css.outlet}>
        {Object.keys(userState).length !== 0 && (
          <div>
            <b>{userState.name}</b>
            <div>{userState.email}</div>
            <button onClick={SignOutHandler}>SignOut</button>
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
};
