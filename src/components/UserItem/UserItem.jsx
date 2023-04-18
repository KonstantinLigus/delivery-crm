import { useState } from 'react';
import css from './UserItem.module.css';
import { updateUser } from 'dataStore/firestoreActions';

export const UserItem = ({ user }) => {
  const [userRole, setRole] = useState(user.role);

  const selectRoleHandler = async e => {
    const uid = e.target.attributes.uid.value;
    const role = e.target.value;
    await updateUser({ uid, obj: { role } });
    setRole(role);
  };

  return (
    <div className={css.userPropertysWrapper}>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <label>
        Role:
        <select
          onChange={selectRoleHandler}
          value={userRole}
          name="role"
          uid={user.uid}
          className={css.select}
        >
          <option value="none">none</option>
          <option value="driver">driver</option>
          <option value="passenger">passenger</option>
          <option value="dispatcher">dispatcher</option>
        </select>
      </label>
    </div>
  );
};
