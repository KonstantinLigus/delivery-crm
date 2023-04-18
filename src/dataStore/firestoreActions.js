import {
  setDoc,
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

export const setUserToStore = async (user, uid) => {
  await setDoc(doc(db, 'users', uid), user, { merge: true });
};

export const getUserFromStore = async uid => {
  const userSnap = await getDoc(doc(db, 'users', uid));

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
};

export const getAllUsers = async () => {
  const usersSnap = await getDocs(collection(db, 'users'));
  if (usersSnap.empty) {
    return [];
  }
  const users = usersSnap.docs.map(userSnap => {
    const user = userSnap.data();
    user.uid = userSnap.id;
    return user;
  });
  return users;
};

export const updateUser = async ({ uid, obj }) => {
  await updateDoc(doc(db, 'users', uid), obj);
};

export const getUsersByProp = async ({ searchedProp, value }) => {
  const q = query(collection(db, 'users'), where(searchedProp, '==', value));
  const usersSnap = await getDocs(q);
  if (usersSnap.empty) {
    return [];
  }
  const filteredUsers = usersSnap.docs.map(userSnap => {
    const user = userSnap.data();
    user.uid = userSnap.id;
    return user;
  });
  return filteredUsers;
};

export const getAllCars = async () => {
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

export const getAllTrips = async () => {
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

export const getUserTrips = async uid => {
  const colRef = collection(db, 'trips');
  const q = query(
    colRef,
    or(
      where('driver.uid', '==', uid),
      where('dispatcher.uid', '==', uid),
      where('passengersID', 'array-contains', uid)
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
      user.uid = userSnap.id;
      return user;
    });
    setUsers(users);
  });
  return unsubscribe;
};
