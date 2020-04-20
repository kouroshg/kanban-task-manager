import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import {
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
} from "reactstrap";

const Task = (props) => {
  const {
    id,
    parentId,
    description,
    status,
    color,
    children,
    onRemoveTask,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [taskDescription, setTaskDescription] = useState(
    props.description || ""
  );

  return (
    <>
      <Container>
        <Row>
          <Card
            color="dark"
            inverse
            className={`w-100 border-1 mb-1 border-${color}`}
          >
            <Col className="w-100 p-1">
              {editMode ? (
                <>
                  <InputGroup>
                    <Input
                      value={`${taskDescription}`}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className={`bg-dark text-light px-4 py-4 border-${color}`}
                    />
                  </InputGroup>
                  <Button
                    className="my-1"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    Done
                  </Button>
                  <h3
                    onClick={onRemoveTask}
                    className="float-right my-1"
                  >
                    <FiTrash2 />
                  </h3>
                </>
              ) : (
                <CardTitle
                  onClick={() => {
                    setEditMode(true);
                  }}
                  className="px-4 py-2 bg-dark rounded"
                >
                  {taskDescription || "Tap to edit"}
                </CardTitle>
              )}
            </Col>
          </Card>
        </Row>
        <Row className="bg-dark">
          <Col id="subtasks">{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Task;
