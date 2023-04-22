import { Card, Col, Row, Container } from 'bootstrap-4-react';

export const List = ({ items, item: Item }) => {
  return (
    <>
      {items.length !== 0 && (
        <Container fluid>
          <Row style={{ rowGap: '30px' }}>
            {items.map(item => (
              <Col md="auto" key={item.id}>
                <Card shadow="sm">
                  <Item item={item} />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};
