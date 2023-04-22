export const UserOptionsList = ({ items: users }) =>
  users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
