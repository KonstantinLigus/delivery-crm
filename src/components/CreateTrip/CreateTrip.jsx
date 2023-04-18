import { Select } from 'components/Select/Select';
import {
  addTripToStore,
  getAllCars,
  usersListListener,
} from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';
import css from './CreateTrip.module.css';
import { UserOptionsList } from 'components/UserOptionsList/UserOptionsList';
import { CarOptionsList } from 'components/CarOptionList/CarOptionList';

export const CreateTrip = () => {
  const [users, setUsers] = useState([]);
  const drivers = users.filter(user => user.role === 'driver');
  const passengers = users.filter(user => user.role === 'passenger');
  const dispatchers = users.filter(user => user.role === 'dispatcher');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const unsubscribeUsersListListener = usersListListener(setUsers);
    (async () => {
      const carsDB = await getAllCars();
      setCars(carsDB);
    })();
    return () => unsubscribeUsersListListener();
  }, []);

  const submitBtnHandler = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const trip = Object.fromEntries(formData.entries());
    trip.passengers = formData.getAll('passengers');
    trip.passengersID = formData.getAll('passengers');
    trip.driver = drivers.find(driverItem => driverItem.uid === trip.driver);
    trip.dispatcher = dispatchers.find(
      dispatcherItem => dispatcherItem.uid === trip.dispatcher
    );
    trip.passengers = passengers.filter(passengerItem =>
      trip.passengers.includes(passengerItem.uid)
    );
    trip.car = cars.find(car => car.id === trip.car);
    await addTripToStore(trip);
  };

  return (
    <>
      <form onSubmit={submitBtnHandler}>
        <h2>Create Trip</h2>
        <h3>List of Drivers</h3>
        <Select
          items={drivers}
          selectName="driver"
          optionsList={UserOptionsList}
        />
        <h3>List of Passengers</h3>
        <Select
          items={passengers}
          selectName="passengers"
          isMultiple={true}
          optionsList={UserOptionsList}
        />
        <h3>List of Dispatchers</h3>
        <Select
          items={dispatchers}
          selectName="dispatcher"
          optionsList={UserOptionsList}
        />
        <h3>List of Cars</h3>
        <Select items={cars} selectName="car" optionsList={CarOptionsList} />
        <h3>From:</h3>
        <input type="text" name="from" required />
        <h3>To:</h3>
        <input type="text" name="to" required />
        <button type="submit" className={css.buttonTrip}>
          Create Trip
        </button>
      </form>
    </>
  );
};
