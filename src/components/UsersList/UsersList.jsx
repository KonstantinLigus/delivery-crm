import { useEffect, useState } from 'react';
import { UserItem } from 'components/UserItem/UserItem';
import { getAllUsersFromStore } from 'dataStore/firestoreActions';
import { List } from 'components/List/List';

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersFromDB = await getAllUsersFromStore();
      setUsers(usersFromDB);
    })();
  }, []);

  return <List items={users} item={UserItem} />;
};
