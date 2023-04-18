import { TripsList } from 'components/TripsList/TripsList';
import { tripsListListener } from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';

export const WholeTripsList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const unsubscribeTripsListListener = tripsListListener(setTrips);
    return () => unsubscribeTripsListListener();
  }, []);

  return <TripsList trips={trips} />;
};
