import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { BDiv, Button, Col, Row, Container, List } from 'bootstrap-4-react';
import { getUserFromStore } from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';
import { adminEmail } from 'dataStore/firebaseConfig';
import { auth } from 'dataStore/firebaseInit';

export const Menu = () => {
  const [userState, setUserState] = useState({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // const auth = getAuth();
    // (async () => {
    // const user = auth.currentUser;
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setIsUserLoggedIn(true);
        setUserState(await getUserFromStore(user.uid));
        if (user.email === adminEmail) {
          setIsAdminLoggedIn(true);
        }
      } else {
        // User is signed out
        setUserState({});
        setIsAdminLoggedIn(false);
      }
      // })();
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
      <List
        style={{
          height: '100%',
          width: '130px',
          position: 'fixed',
          borderWidth: '20px',
          borderStyle: 'solid',
          borderColor: '#423d3d',
          backgroundColor: '#423d3d',
        }}
      >
        {location.pathname === '/' && (
          <List.Item mb="3">
            <NavLink to="/">Autorization</NavLink>
          </List.Item>
        )}
        {location.pathname !== '/' && isUserLoggedIn && (
          <List.Item mb="3">
            <NavLink to="user">User</NavLink>
          </List.Item>
        )}
        {location.pathname !== '/' && isAdminLoggedIn && (
          <List.Item>
            <NavLink to="admin">Edit users</NavLink>
          </List.Item>
        )}
      </List>
      <BDiv style={{ marginLeft: '130px' }}>
        {location.pathname !== '/' && isUserLoggedIn && (
          <Container fluid>
            <Row alignItems="center" border="bottom" shadow="sm" p="3">
              <Col md>{userState.email}</Col>
              <Col md>{userState.name}</Col>
              <Col md="auto">
                <Button onClick={SignOutHandler} warning>
                  Sign out
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        <BDiv style={{ padding: '20px' }}>
          <Outlet />
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
