import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/column";
import Axios from "axios";

function App() {
  class task {
    constructor(title, subtasks, progress = 0) {
      this.title = title;
      this.subtasks = subtasks;
      this.progress = progress;
    }
  }
  const [columns, setColumns] = useState([
    {
      title: "Tasks",
      color: "secondary",
      tasks: [],
    },
    {
      title: "In Progress",
      color: "primary",
      tasks: [],
    },
    { title: "Done", color: "info", tasks: [] },
    {
      title: "Complete",
      color: "success",
      tasks: [],
    },
  ]);

  useEffect(() => {
    getDataFromFirebaseDB();
  }, []);

  const getDataFromFirebaseDB = () => {
    const firebase_db = "https://kanban-386e7.firebaseio.com/.json";

    Axios({
      method: "get",
      url: firebase_db,
    }).then(
      (response) => {
        if (response.status === 200) {
          setColumns(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const setDataToFirebaseDB = () => {
    const firebase_db = "https://kanban-386e7.firebaseio.com/.json";

    Axios({
      method: "put",
      url: firebase_db,
      data: JSON.stringify(columns),
    }).then(
      (response) => {
        console.log(response.status);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const status = { idle: 0, "in progress": 1, done: 2, complete: 3 };
  const updateColumns = (data) => {
    setColumns(data);
    setDataToFirebaseDB();
  };

  const handleAddTask = (colIndex) => {
    let clone = [...columns];
    let column = clone[colIndex];
    if (column.tasks === undefined) column.tasks = [];
    clone[colIndex].tasks.push(new task("new task", []));
    updateColumns(clone);
  };

  const handleAddSubtask = (colIndex, taskIndex) => {
    let clone = [...columns];
    let task = clone[colIndex].tasks[taskIndex];
    if (task.subtasks === undefined) task.subtasks = [];
    task.subtasks.push({
      title: "new subtask",
      statusId: status.idle,
      statusValue: Object.keys(status)[0],
    });

    task.progress = calculateProgress(task);
    updateColumns(clone);
  };

  const handleSubtaskRemove = (colIndex, taskIndex, subtaskIndex) => {
    let clone = [...columns];
    let task = clone[colIndex].tasks[taskIndex];
    task.subtasks.splice(subtaskIndex, 1);
    task.progress = calculateProgress(task);
    updateColumns(clone);
  };

  const handleUpdateTask = (colIndex, taskIndex, value) => {
    let clone = [...columns];
    clone[colIndex].tasks[taskIndex].title = value;
    updateColumns(clone);
  };

  const handleRemoveTask = (columnIndex, taskIndex) => {
    let clone = [...columns];
    clone[columnIndex].tasks.splice(taskIndex, 1);
    updateColumns(clone);
  };

  const handleSubtaskClick = (columnIndex, taskIndex, subtaskIndex) => {
    let clone = [...columns];
    let task = clone[columnIndex].tasks[taskIndex];
    let subtask = task.subtasks[subtaskIndex];
    let statusIndex = subtask.statusId;
    statusIndex += 1;
    statusIndex = Math.min(Object.keys(status).length, statusIndex);
    statusIndex = statusIndex === Object.keys(status).length ? 0 : statusIndex;
    subtask.statusId = statusIndex;
    subtask.statusValue = Object.keys(status)[statusIndex];

    task.progress = calculateProgress(task);

    updateColumns(clone);
  };

  const handleSubtaskEdit = (columnIndex, taskIndex, subtaskIndex, value) => {
    let clone = [...columns];
    clone[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].title = value;

    updateColumns(clone);
  };

  const calculateProgress = (task) => {
    let completeCount = 0;
    for (let i = 0; i < task.subtasks.length; i++) {
      const element = task.subtasks[i];
      if (element.statusValue === "complete") {
        completeCount++;
      }
    }

    return (completeCount / task.subtasks.length) * 100;
  };

  const dragEndHandler = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let sourceColumnIndex = columns.findIndex(
      (c) => c.title === source.droppableId
    );
    let destColumnIndex = columns.findIndex(
      (c) => c.title === destination.droppableId
    );
    let sourceColumn = columns[sourceColumnIndex];
    let destColumn = columns[destColumnIndex];
    let sourceTask = sourceColumn.tasks[source.index];

    sourceColumn.tasks.splice(source.index, 1);

    if (destColumn.tasks === undefined) destColumn.tasks = [];
    destColumn.tasks.splice(destination.index, 0, sourceTask);

    let clone = [...columns];

    updateColumns(clone);
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Container>
        <Row>
          {columns.map((column, index) => {
            return (
              <Col key={index} lg="3" xs="12" className="p-2">
                <Column
                  onAddTask={handleAddTask}
                  onAddSubtask={handleAddSubtask}
                  onRemoveTask={handleRemoveTask}
                  onRemoveSubtask={handleSubtaskRemove}
                  onUpdateTask={handleUpdateTask}
                  onSubtaskClick={handleSubtaskClick}
                  onSubtaskEdit={handleSubtaskEdit}
                  id={index}
                  {...column}
                ></Column>
              </Col>
            );
          })}
        </Row>
      </Container>
    </DragDropContext>
  );
}

export default App;
