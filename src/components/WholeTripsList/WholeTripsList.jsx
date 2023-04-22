import { List } from 'components/List/List';
import { Trip } from 'components/Trip/Trip';
import { tripsListListener } from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';

export const WholeTripsList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const unsubscribeTripsListListener = tripsListListener(setTrips);
    return () => unsubscribeTripsListListener();
  }, []);

  return <List items={trips} item={Trip} />;
};
