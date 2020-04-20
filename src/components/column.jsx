import React from "react";
import { Container, Row, Col, Button, Card, CardHeader } from "reactstrap";

const Column = (props) => {
  const { color, title, children, id, onAddTask } = props;

  return (
    <Container id="column">
      <Row id="column-header">
        <Col className="p-0">
          <Card inverse color={color} className="border-0">
            <CardHeader className="font-weight-bold">{title}</CardHeader>
          </Card>
        </Col>
      </Row>
      <Row id="tasks">
        <Col className="pt-1 p-0">{children}</Col>
      </Row>
      <Row id="add-new-task">
        <Col className="p-0 bg-dark rounded-lg">
          <Button onClick={() => onAddTask(id)} className="w-100 bg-dark p-2">
            Add new task
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Column;