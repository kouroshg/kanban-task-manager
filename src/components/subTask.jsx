import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { MdRadioButtonUnchecked, MdDone, MdDoneAll } from "react-icons/md";
import { Button } from "reactstrap";
const SubTask = (props) => {
  const { children, onRemoveSubtask, columnId, taskId, index } = props;

  const renderStatusIcon = (statusValue) => {
    switch (statusValue) {
      case "idle":
        return <MdRadioButtonUnchecked />;
      case "in progress":
        return <IoMdTime />;
      case "done":
        return <MdDone />;
      case "complete":
        return <MdDoneAll />;
      default:
        break;
    }
  };
  return (
    <span>
      <Button color="link" className="text-light">
        <FiTrash2
          onClick={() => {
            onRemoveSubtask(columnId, taskId, index);
          }}
          className="mx-2"
        />
      </Button>
      <span
        style={{
          textDecoration:
            children.statusValue === "complete" ? "line-through" : "",
        }}
      >
        {children.title}
      </span>
      <h5 className="float-right m-2">
        {renderStatusIcon(children.statusValue)}
      </h5>
    </span>
  );
};

export default SubTask;
