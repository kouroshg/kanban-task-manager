import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash2 } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

import {
  Container,
  Card,
  CardTitle,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import SubTask from "./subTask";

const Task = (props) => {
  const {
    id,
    columnId,
    index,
    value,
    color,
    onRemoveTask,
    onUpdateTask,
    onAddSubtask,
    onRemoveSubtask,
    onSubtaskClick,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value.title);

  const renderTaskInputValue = () => {
    return (
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
          <Col className="float-right">
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
    );
  };

  const renderTaskTitle = () => {
    return (
      <Row className="flex-nowrap shadow-lg mb-2">
        <Col>
          <CardTitle
            onClick={() => {
              setEditMode(true);
            }}
            className="px-4 py-2 bg-dark rounded"
          >
            {value.title}
          </CardTitle>
        </Col>
        <Col
          onClick={() => onAddSubtask(columnId, index)}
          xs="2"
          className="m-0 p-0 float-right"
        >
          <Button color="link" className="px-0 text-light rounded-pill">
            <h3>
              <IoIosAdd />
            </h3>
          </Button>
        </Col>
      </Row>
    );
  };

  const getSubtaskColor = (statusValue) => {
    switch (statusValue) {
      case "idle":
        return "dark";
      case "in progress":
        return "primary";
      case "done":
        return "info";
      case "complete":
        return "success";
      default:
        break;
    }
  };

  const renderSubTasks = () => {
    return (
      <ListGroup>
        {value.subtasks.map((item, subtaskIndex) => {
          return (
            <ListGroupItem
              key={subtaskIndex}
              className={`bg-${getSubtaskColor(
                item.statusValue
              )} p-2 mb-1 rounded-pill`}
              onClick={() => onSubtaskClick(columnId, index, subtaskIndex)}
            >
              <SubTask
                columnId={columnId}
                taskId={index}
                index={subtaskIndex}
                onRemoveSubtask={onRemoveSubtask}
              >
                {item}
              </SubTask>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  };
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
                      renderTaskInputValue()
                    ) : (
                      <>
                        {renderTaskTitle()}
                        {renderSubTasks()}
                      </>
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
