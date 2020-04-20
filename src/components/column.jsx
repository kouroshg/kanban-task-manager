import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardHeader } from "reactstrap";
import { Droppable } from "react-beautiful-dnd";

const Column = (props) => {
  const { color, title, children, onAddTask, columnId } = props;
  return (
    <Container id="column">
      <Row id="column-header">
        <Col className="p-0">
          <Card inverse color={color} className="border-0">
            <CardHeader className="font-weight-bold">{title}</CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Droppable droppableId={title}>
          {(provided) => (
            <div className="w-100"
              id="tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Col className="pt-1 p-0">{children}</Col>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Row>
      <Row id="add-new-task">
        <Col className="p-0 bg-dark rounded-lg">
          <Button onClick={onAddTask} className="w-100 bg-dark p-2">
            Add new task
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Column;
