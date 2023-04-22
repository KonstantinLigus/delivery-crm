import { useState } from 'react';
import css from './UserItem.module.css';
import { updateUser } from 'dataStore/firestoreActions';
import { InputGroup, Form, Card } from 'bootstrap-4-react';

export const UserItem = ({ item }) => {
  const [userRole, setRole] = useState(item.role);

  const selectRoleHandler = async e => {
    const id = e.target.attributes.uid.value;
    const role = e.target.value;
    await updateUser({ id, obj: { role } });
    setRole(role);
  };

  return (
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text mb="3">{item.email}</Card.Text>
      <InputGroup>
        <InputGroup.PrependText>Role:</InputGroup.PrependText>
        <Form.CustomSelect
          onChange={selectRoleHandler}
          value={userRole}
          name="role"
          uid={item.id}
        >
          <option value="none">none</option>
          <option value="driver">driver</option>
          <option value="passenger">passenger</option>
          <option value="dispatcher">dispatcher</option>
        </Form.CustomSelect>
      </InputGroup>
    </Card.Body>
  );
};
