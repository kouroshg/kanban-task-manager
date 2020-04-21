import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";

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
    columnId,
    index,
    value,
    color,
    children,
    onRemoveTask,
    onUpdateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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
                            value={`${inputValue}`}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={`bg-dark text-light px-4 py-4 border-${color}`}
                          />
                        </InputGroup>
                        <Button
                          className="my-1"
                          onClick={() => {
                            setEditMode(false);
                            onUpdateTask(columnId, index, inputValue);
                          }}
                        >
                          Done
                        </Button>
                        <h3
                          onClick={() => {
                            setEditMode(false);
                            onRemoveTask(columnId, index);
                          }}
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
                        {value}
                      </CardTitle>
                    )}
                  </Col>
                </Card>
              </Row>
              <Row className="bg-dark">
                <Col id="subtasks">{children}</Col>
              </Row>
            </Container>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
