import { BDiv, BH2 } from 'bootstrap-4-react';
import { UsersList } from 'components/UsersList/UsersList';
import { CreateTrip } from 'components/CreateTrip/CreateTrip';
import { WholeTripsList } from 'components/WholeTripsList/WholeTripsList';

export const AdminPage = () => {
  return (
    <>
      <BDiv mb="3">
        <BH2 mb="3">List of users</BH2>
        <UsersList />
      </BDiv>
      <CreateTrip />
      <BH2 mb="3">All Trips</BH2>
      <WholeTripsList />
    </>
  );
};
