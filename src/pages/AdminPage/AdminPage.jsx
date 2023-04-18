import { UsersList } from 'components/UsersList/UsersList';
import css from './AdminPage.module.css';
import { CreateTrip } from 'components/CreateTrip/CreateTrip';
import { WholeTripsList } from 'components/WholeTripsList/WholeTripsList';

export const AdminPage = () => {
  return (
    <>
      <div className={css.usersListWrapper}>
        <h2 className={css.title}>List of users</h2>
        <UsersList />
      </div>
      <CreateTrip />
      <h2>All Trips</h2>
      <WholeTripsList />
    </>
  );
};
