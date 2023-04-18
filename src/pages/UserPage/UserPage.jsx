import { TripsList } from 'components/TripsList/TripsList';
import { getUserTrips } from 'dataStore/firestoreActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const UserPage = () => {
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    (async () => {
      const auth = getAuth();
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
    })();
  }, []);
  return (
    <>
      <div>UserPage</div>
      <h2>Yuor Trips</h2>
      <TripsList trips={userTrips} />
    </>
  );
};
