import { useEffect, useState } from 'react';
import css from './UsersList.module.css';
import { UserItem } from 'components/UserItem/UserItem';
import { getAllUsers } from 'dataStore/firestoreActions';

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersFromDB = await getAllUsers();
      setUsers(usersFromDB);
    })();
  }, []);

  return (
    <>
      {users.length !== 0 && (
        <ul>
          {users.length !== 0 &&
            users.map(user => (
              <li className={css.userWrapper} key={user.uid}>
                <UserItem user={user} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
