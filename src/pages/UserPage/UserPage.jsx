import { BH2 } from 'bootstrap-4-react';
import { List } from 'components/List/List';
import { Trip } from 'components/Trip/Trip';
import { auth } from 'dataStore/firebaseInit';
import { getUserTrips } from 'dataStore/firestoreActions';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const UserPage = () => {
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    // (async () => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // console.log('user signed');
        const trips = await getUserTrips(user.uid);
        setUserTrips(trips);
      } else {
        // User is signed out
        // console.log('user signed out');
      }
    });
    // })();
  }, []);
  return (
    <>
      <BH2 mb="3">Your Trips</BH2>
      <List items={userTrips} item={Trip} />
    </>
  );
};
