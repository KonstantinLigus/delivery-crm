import { Card, ListGroup } from 'bootstrap-4-react';

export const Trip = ({ item }) => {
  return (
    <Card.Body key={item.id}>
      <ListGroup>
        <ListGroup.Item>
          <Card.Text>
            <b>driver:</b> {item.driver.name}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <b>dispatcher:</b> {item.dispatcher.name}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <b>car:</b> {item.car.model}, {item.car.number}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <b>from:</b> {item.from}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <b>to:</b> {item.to}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <ListGroup>
            <b>passengers:</b>
            {item.passengers.map(passenger => (
              <ListGroup.Item key={passenger.id}>
                {passenger.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  );
};
