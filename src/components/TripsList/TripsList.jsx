export const TripsList = ({ trips }) => {
  return (
    <>
      {trips.lenght !== 0 && (
        <ul>
          {trips.map(trip => (
            <li key={trip.id}>
              <div>driver: {trip.driver.name}</div>
              <div>dispatcher: {trip.dispatcher.name}</div>
              <div>
                car: {trip.car.model}, {trip.car.number}
              </div>
              <div>from: {trip.from}</div>
              <div>to: {trip.to}</div>
              <ul>
                passengers:
                {trip.passengers.map(passenger => (
                  <li key={passenger.uid}>{passenger.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
