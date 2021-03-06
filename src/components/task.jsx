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
  Progress,
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
    onSubtaskEdit,
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
                onUpdateTask(
                  columnId,
                  index,
                  inputValue === "" ? value.title : inputValue
                );
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
      <>
        <Row className="flex-nowrap shadow-lg mb-2">
          <Col>
            <CardTitle
              onClick={() => {
                setEditMode(true);
              }}
              className="px-4 py-2 bg-dark rounded float-left"
            >
              {value.title}
            </CardTitle>
          </Col>
          <Col
            onClick={() => onAddSubtask(columnId, index)}
            xs="2"
            className="m-0 p-0 float-right"
          >
            <Button color="link" className="p-0 text-light rounded-pill">
              <h3>
                <IoIosAdd />
              </h3>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Progress
              animated={value.progress < 100 ? true : false}
              color={value.progress === 100 ? "success" : `${color}`}
              style={{ height: ".5rem" }}
              value={value.progress}
              className="bg-dark"
            />
          </Col>
        </Row>
      </>
    );
  };

  const renderSubTasks = () => {
    if (value.subtasks === undefined) return;

    return (
      <ListGroup>
        {value.subtasks.map((item, subtaskIndex) => {
          return (
            <SubTask
              key={subtaskIndex}
              columnId={columnId}
              taskId={index}
              index={subtaskIndex}
              onRemoveSubtask={onRemoveSubtask}
              onSubtaskClick={onSubtaskClick}
              onSubtaskEdit={onSubtaskEdit}
              statusValue={item.statusValue}
            >
              {item}
            </SubTask>
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
