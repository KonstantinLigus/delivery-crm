import { useEffect, useState } from 'react';
import { UserItem } from 'components/UserItem/UserItem';
import { getAllUsers } from 'dataStore/firestoreActions';
import { List } from 'components/List/List';

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersFromDB = await getAllUsers();
      setUsers(usersFromDB);
    })();
  }, []);

  return <List items={users} item={UserItem} />;
};
