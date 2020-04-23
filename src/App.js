import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/column";

function App() {
  class task {
    constructor(title, subtasks) {
      this.title = title;
      this.subtasks = subtasks;
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

  const handleAddTask = (colIndex) => {
    let clone = [...columns];
    clone[colIndex].tasks.push(new task("new task", []));
    setColumns(clone);
  };

  const handleAddSubtask = (colIndex, taskIndex) => {
    let clone = [...columns];
    clone[colIndex].tasks[taskIndex].subtasks.push(["new subtask"]);
    setColumns(clone);
  };

  const handleUpdateTask = (colIndex, taskIndex, value) => {
    let clone = [...columns];
    clone[colIndex].tasks[taskIndex].title = value;
    setColumns(clone);
  };

  const handleRemoveTask = (columnIndex, taskIndex) => {
    let clone = [...columns];
    clone[columnIndex].tasks.splice(taskIndex, 1);
    setColumns(clone);
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
    destColumn.tasks.splice(destination.index, 0, sourceTask);

    let clone = [...columns];

    setColumns(clone);
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
                  onUpdateTask={handleUpdateTask}
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
