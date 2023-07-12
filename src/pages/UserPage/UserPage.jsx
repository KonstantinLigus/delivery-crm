import { BH2 } from 'bootstrap-4-react';
import { List } from 'components/List/List';
import { Trip } from 'components/Trip/Trip';
import { auth } from 'dataStore/firebaseInit';
import { getUsersByFieldInStore } from 'dataStore/firestoreActions';
import { getUserTripsFromStore } from 'dataStore/firestoreActions';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const UserPage = () => {
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userFromDB = await getUsersByFieldInStore({
          searchedField: 'email',
          value: user.email,
        });
        const trips = await getUserTripsFromStore(userFromDB[0].id);
        setUserTrips(trips);
      } else {
      }
    });
    // })();
    return () => unsubscribe();
  }, []);
  return (
    <>
      <BH2 mb="3">Your Trips</BH2>
      <List items={userTrips} item={Trip} />
    </>
  );
};
