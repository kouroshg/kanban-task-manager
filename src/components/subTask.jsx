import React, { useState } from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { MdRadioButtonUnchecked, MdDone, MdDoneAll } from "react-icons/md";
import {
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Card,
  CardFooter,
  Badge,
  CardHeader,
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
          className={`text-light rounded-lg bg-dark border-${getSubtaskColor(
            statusValue
          )}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <InputGroupAddon addonType="append">
          <Button
            color="link"
            className="text-light"
            onClick={() => {
              setEditMode(false);
              onSubtaskEdit(
                columnId,
                taskId,
                index,
                inputValue === "" ? children.title : inputValue
              );
            }}
          >
            <FaCheck />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  return (
    <Card className={`p-0 my-1 rounded-lg shadow-lg bg-dark`}>
      {editMode ? (
        renderSubtaskEdit()
      ) : (
        <>
          <CardHeader
            style={{
              textDecoration:
                children.statusValue === "complete" ? "line-through" : "",
            }}
            className={`bg-${getSubtaskColor(statusValue)}`}
          >
            {children.title}
          </CardHeader>
          <CardFooter className={`p-0 m-0`}>
            <Button color="link" className="text-light">
              <FiTrash2
                onClick={() => {
                  onRemoveSubtask(columnId, taskId, index);
                }}
                className="mx-2"
              />
            </Button>
            <Button
              onClick={() => setEditMode(true)}
              color="link"
              className="float-right px-1 mr-2 text-light"
            >
              <h5>
                <FiEdit3 />
              </h5>
            </Button>
            <Badge style={{ color: "light gray" }} disabled>
              <small>{children.statusValue}</small>
            </Badge>
            <Button
              color="link"
              onClick={() => onSubtaskClick(columnId, taskId, index)}
              className="float-right px-1 text-light"
            >
              <h5>{renderStatusIcon(children.statusValue)}</h5>
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SubTask;
