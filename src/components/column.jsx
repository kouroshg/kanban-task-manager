import React from "react";
import Task from "./task";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  Badge,
  Label,
} from "reactstrap";
import { Droppable } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";

const Column = (props) => {
  const {
    id,
    color,
    title,
    tasks,
    onAddTask,
    onRemoveTask,
    onUpdateTask,
  } = props;

  return (
    <Container id="column">
      <Row id="column-header">
        <Col className="p-0">
          <Card inverse color={color} className="border-0">
            <CardHeader className="">
              <Badge className="p-2 position-absolute bg-dark border-0 rounded-pill">
                {tasks.length}
              </Badge>
              <Label style={{ marginLeft: 30 }}>{title}</Label>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              className="w-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Col className="pt-1 p-0">
                {tasks.map((task, index) => (
                  <Task
                    onRemoveTask={onRemoveTask}
                    onUpdateTask={onUpdateTask}
                    value={task}
                    color={color}
                    columnId={id}
                    id={`${id * 100 + index}`}
                    index={index}
                    key={index}
                  ></Task>
                ))}
              </Col>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Row>
      <Row id="add-new-task">
        <Col className="p-0 bg-dark rounded-lg">
          <Button onClick={() => onAddTask(id)} className="w-100 bg-dark border-0 rounded-lg">
            <h3 className="m-0 float-left">
              <IoIosAdd/>
            </h3>
            <Label className="m-2 float-left">Add a task</Label>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Column;
