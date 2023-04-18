export const UserOptionsList = ({ items: users }) =>
  users.map(user => (
    <option key={user.uid} value={user.uid}>
      {user.name}
    </option>
  ));
