import { Select } from 'components/Select/Select';
import {
  addTripToStore,
  getAllCarsInStore,
  usersListListener,
} from 'dataStore/firestoreActions';
import { useEffect, useState } from 'react';
import { UserOptionsList } from 'components/UserOptionsList/UserOptionsList';
import { CarOptionsList } from 'components/CarOptionList/CarOptionList';
import { Form, Button, BH2 } from 'bootstrap-4-react';

export const CreateTrip = () => {
  const [users, setUsers] = useState([]);
  const drivers = users.filter(user => user.role === 'driver');
  const passengers = users.filter(user => user.role === 'passenger');
  const dispatchers = users.filter(user => user.role === 'dispatcher');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const unsubscribeUsersListListener = usersListListener(setUsers);
    (async () => {
      const carsDB = await getAllCarsInStore();
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
    trip.driver = drivers.find(driverItem => driverItem.id === trip.driver);
    trip.dispatcher = dispatchers.find(
      dispatcherItem => dispatcherItem.id === trip.dispatcher
    );
    trip.passengers = passengers.filter(passengerItem =>
      trip.passengers.includes(passengerItem.id)
    );
    trip.car = cars.find(car => car.id === trip.car);
    await addTripToStore(trip);
  };

  return (
    <>
      <Form mb="3" onSubmit={submitBtnHandler}>
        <BH2 mb="3">Create Trip</BH2>
        <Select
          items={drivers}
          selectName="driver"
          optionsList={UserOptionsList}
          label="List of Drivers"
        />
        <Select
          items={passengers}
          selectName="passengers"
          isMultiple={true}
          optionsList={UserOptionsList}
          label="List of Passengers"
        />
        <Select
          items={dispatchers}
          selectName="dispatcher"
          optionsList={UserOptionsList}
          label="List of Dispatchers"
        />
        <Select
          items={cars}
          selectName="car"
          optionsList={CarOptionsList}
          label="List of Cars"
        />
        <label htmlFor="from">From:</label>
        <Form.Input type="text" name="from" id="from" required />
        <label htmlFor="to">To:</label>
        <Form.Input mb="3" type="text" name="to" id="to" required />
        <Button type="submit" lg block warning>
          Create Trip
        </Button>
      </Form>
    </>
  );
};
