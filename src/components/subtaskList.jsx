import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const SubtaskList = (props) => {
  const { children } = props;

  return (
    <ListGroup>
      {children !== 0
        ? null
        : children.map((item, index) => {
            return (
              <ListGroupItem
                className="py-1 px-0 pb-0 rounded-0 bg-dark border-0"
                key={index}
              >
                {item}
              </ListGroupItem>
            );
          })}
    </ListGroup>
  );
};

export default SubtaskList;
