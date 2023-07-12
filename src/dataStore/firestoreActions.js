import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  query,
  where,
  addDoc,
  onSnapshot,
  or,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from './firebaseInit';

const db = getFirestore(app);

export const setUserToStore = async user => {
  const existingUserFromDB = getUsersByFieldInStore({
    searchedField: 'email',
    value: user.email,
  });
  if (existingUserFromDB.length === 0) {
    await addDoc(doc(db, 'users'), user);
  }
};

export const getUserFromStoreById = async id => {
  const userSnap = await getDoc(doc(db, 'users', id));

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
};

export const getAllUsersFromStore = async () => {
  const usersSnap = await getDocs(collection(db, 'users'));
  if (usersSnap.empty) {
    return [];
  }
  const users = usersSnap.docs.map(userSnap => {
    const user = userSnap.data();
    user.id = userSnap.id;
    return user;
  });
  return users;
};

export const updateUserInStore = async ({ id, obj }) => {
  await updateDoc(doc(db, 'users', id), obj);
};

export const getUsersByFieldInStore = async ({ searchedField, value }) => {
  const q = query(collection(db, 'users'), where(searchedField, '==', value));
  const usersSnap = await getDocs(q);
  if (usersSnap.empty) {
    return [];
  }
  const users = usersSnap.docs.map(userSnap => {
    const user = userSnap.data();
    user.id = userSnap.id;
    return user;
  });
  return users;
};

export const getAllCarsInStore = async () => {
  const carsSnap = await getDocs(collection(db, 'cars'));
  if (carsSnap.empty) {
    return [];
  }
  const cars = carsSnap.docs.map(carSnap => {
    const car = carSnap.data();
    car.id = carSnap.id;
    return car;
  });
  return cars;
};

export const addTripToStore = async trip => {
  const newTrip = await addDoc(collection(db, 'trips'), trip);
  return newTrip;
};

export const getAllTripsFromStore = async () => {
  const tripsSnap = await getDocs(collection(db, 'trips'));
  if (tripsSnap.empty) {
    return [];
  }
  const trips = tripsSnap.docs.map(tripSnap => {
    const trip = tripSnap.data();
    trip.id = tripSnap.id;
    return trip;
  });
  return trips;
};

export const getUserTripsFromStore = async id => {
  const colRef = collection(db, 'trips');
  const q = query(
    colRef,
    or(
      where('driver.id', '==', id),
      where('dispatcher.id', '==', id),
      where('passengersID', 'array-contains', id)
    )
  );
  const tripsSnap = await getDocs(q);
  if (tripsSnap.empty) {
    return [];
  }
  const trips = tripsSnap.docs.map(tripSnap => {
    const trip = tripSnap.data();
    trip.id = tripSnap.id;
    return trip;
  });
  return trips;
};

export const tripsListListener = setTrips => {
  const unsubscribe = onSnapshot(collection(db, 'trips'), tripsSnap => {
    if (tripsSnap.empty) {
      return [];
    }
    const trips = tripsSnap.docs.map(docSnap => {
      const trip = docSnap.data();
      trip.id = docSnap.id;
      return trip;
    });
    setTrips(trips);
  });
  return unsubscribe;
};

export const usersListListener = setUsers => {
  const unsubscribe = onSnapshot(collection(db, 'users'), usersSnap => {
    if (usersSnap.empty) {
      return [];
    }
    const users = usersSnap.docs.map(userSnap => {
      const user = userSnap.data();
      user.id = userSnap.id;
      return user;
    });
    setUsers(users);
  });
  return unsubscribe;
};
