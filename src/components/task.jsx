import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";

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
                  color={editMode ? color : "dark"}
                  inverse
                  className={`w-100 my-1 border-${color} rounded-lg`}
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
                        <Row className="flex-nowrap">
                          <Col xs="auto" className="pr-0">
                            <Button
                              className="my-1"
                              onClick={() => {
                                setEditMode(false);
                                onUpdateTask(columnId, index, inputValue);
                              }}
                            >
                              Done
                            </Button>
                          </Col>
                          <Col sm="2">
                            <h3>
                              <IoIosAdd />
                            </h3>
                          </Col>
                          <Col sm="6" className="float-right">
                            <h3
                              onClick={() => {
                                setEditMode(false);
                                onRemoveTask(columnId, index);
                              }}
                              className="float-right my-1"
                            >
                              <FiTrash2 />
                            </h3>
                          </Col>
                        </Row>
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
                <Col id="subtasks"></Col>
              </Row>
            </Container>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
