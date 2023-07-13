import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BDiv, Button, Col, Row, Container, List } from 'bootstrap-4-react';
import { getUsersByFieldInStore } from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';
import { adminEmail } from 'dataStore/firebaseConfig';
import { auth } from 'dataStore/firebaseInit';
import { ReactComponent as MenuLogo } from '../../icons/menu.svg';
import { ReactComponent as CloseLogo } from '../../icons/close.svg';
import { Navbar } from 'bootstrap-4-react/lib/components';

const linkStyles = ({ isActive }) => ({
  color: isActive ? '#ffc107' : '#fff',
  textDecoration: 'none',
});

export const Menu = () => {
  const [userState, setUserState] = useState({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState('none');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setIsUserLoggedIn(true);
        setUserState(
          ...(await getUsersByFieldInStore({
            searchedField: 'email',
            value: user.email,
          }))
        );
        if (user.email === adminEmail) {
          setIsAdminLoggedIn(true);
        }
      } else {
        // User is signed out
        setUserState({});
        setIsAdminLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const SignOutHandler = async () => {
    try {
      await signOut(auth);
      setUserState({});
      setIsAdminLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.log('signOut failed', error);
    }
  };

  const menuClickHandler = () =>
    setIsMenuShown(prevState => {
      if (prevState === 'none') {
        return 'block';
      }
      return 'none';
    });

  return (
    <>
      <Navbar
        display={`${isMenuShown} sm-block`}
        style={{
          height: '100vh',
          width: '130px',
          position: 'fixed',
          padding: '20px',
          backgroundColor: '#423d3d',
          zIndex: 3,
        }}
      >
        <Button
          display="block sm-none"
          onClick={menuClickHandler}
          p="0"
          style={{
            marginLeft: 'auto',
            backgroundColor: 'transparent',
            color: '#fff',
          }}
        >
          <CloseLogo />
        </Button>
        <List>
          {location.pathname === '/' && (
            <List.Item mb="3">
              <NavLink to="/" style={linkStyles}>
                Autorization
              </NavLink>
            </List.Item>
          )}
          {location.pathname !== '/' && isUserLoggedIn && (
            <List.Item mb="3">
              <NavLink to="user" style={linkStyles}>
                User
              </NavLink>
            </List.Item>
          )}
          {location.pathname !== '/' && isAdminLoggedIn && (
            <List.Item>
              <NavLink to="admin" style={linkStyles}>
                Edit users
              </NavLink>
            </List.Item>
          )}
        </List>
      </Navbar>
      <BDiv display="block sm-flex">
        <BDiv style={{ minWidth: '130px' }} display="none sm-block" />
        <BDiv w="100">
          {location.pathname !== '/' && isUserLoggedIn && (
            <Container
              fluid
              sticky="top"
              style={{ zIndex: 2, backgroundColor: '#fff' }}
            >
              <Row alignItems="center" border="bottom" shadow="sm" p="3">
                <Col display="sm-none">
                  <Button onClick={menuClickHandler}>
                    <MenuLogo />
                  </Button>
                </Col>
                <Col md="auto">{userState.email}</Col>
                <Col md="auto">{userState.name}</Col>
                <Col md="auto">
                  <Button onClick={SignOutHandler} warning>
                    Sign out
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
          <BDiv p="3">
            <Outlet />
          </BDiv>
        </BDiv>
      </BDiv>
    </>
  );
};

/* -----Bootstrap 4 nav-----  */

// <Nav
//   flex="column"
//   bg="dark"
//   style={{ position: 'fixed', height: '100%', width: '130px' }}
// >
//   {location.pathname === '/' && (
//     <Nav.ItemLink href="delivery-crm/" text="warning">
//       Autorization
//     </Nav.ItemLink>
//   )}
//   {Object.keys(userState).length !== 0 && (
//     <Nav.ItemLink href="user" text="warning">
//       User
//     </Nav.ItemLink>
//   )}
//   {isAdminLoggedIn && (
//     <Nav.ItemLink href="admin" text="warning">
//       Edit users
//     </Nav.ItemLink>
//   )}
// </Nav>;
// <div className={css.outlet}>
//   {location.pathname !== '/' && Object.keys(userState).length !== 0 && (
//     <div>
//       <b>{userState.name}</b>
//       <div>{userState.email}</div>
//       <button onClick={SignOutHandler}>SignOut</button>
//     </div>
//   )}
//   <Outlet />
// </div>
/* ---------------------------- */
