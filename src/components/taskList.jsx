import React from "react";
import Task from "./task";
import SubtaskList from "./subtaskList";
import { ListGroup, ListGroupItem } from "reactstrap";

const TaskList = (props) => {
  const { color } = props;
  return (
    <ListGroup>
      <ListGroupItem className="p-1 border-0 mb-1 rounded-lg bg-dark">
        <Task color={color}>
          <SubtaskList>
            {/* <Task color="info" />
            <Task color="info" />
            <Task color="info" /> */}
          </SubtaskList>
        </Task>
      </ListGroupItem>
    </ListGroup>
  );
};

export default TaskList;
