import React, { useState } from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { MdRadioButtonUnchecked, MdDone, MdDoneAll } from "react-icons/md";
import {
  Button,
  InputGroup,
  Input,
  ListGroupItem,
  InputGroupAddon,
} from "reactstrap";

const SubTask = (props) => {
  const {
    children,
    onRemoveSubtask,
    onSubtaskClick,
    onSubtaskEdit,
    columnId,
    taskId,
    index,
    statusValue,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState(children.title);

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

  const renderSubtaskEdit = () => {
    return (
      <InputGroup>
        <Input
          className={`text-light rounded-pill bg-dark border-${getSubtaskColor(
            statusValue
          )}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <InputGroupAddon addonType="append" className="rounded-right-pill">
          <Button
            color="link"
            className="text-light"
            onClick={() => {
              setEditMode(false);
              setTitle(inputValue);
              onSubtaskEdit(columnId, taskId, index, title);
            }}
          >
            <FaCheck />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  return (
    <ListGroupItem
      className={`bg-${getSubtaskColor(statusValue)} p-0 my-1 rounded-pill`}
    >
      {editMode ? (
        renderSubtaskEdit()
      ) : (
        <>
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
            {title}
          </span>
          <Button
            onClick={() => setEditMode(true)}
            color="link"
            className="float-right px-1 mr-2 text-light"
          >
            <h5>
              <FiEdit3 />
            </h5>
          </Button>
          <Button
            onClick={() => onSubtaskClick(columnId, taskId, index)}
            color="link"
            className="float-right px-1 text-light"
          >
            <h5>{renderStatusIcon(children.statusValue)}</h5>
          </Button>
        </>
      )}
    </ListGroupItem>
  );
};

export default SubTask;
