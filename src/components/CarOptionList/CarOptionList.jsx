export const CarOptionsList = ({ items: cars }) =>
  cars.map(car => (
    <option key={car.id} value={car.id}>
      {car.model}
    </option>
  ));
