import React, { useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Row, Col } from "reactstrap";
import Task from "./components/task";
import Column from "./components/column";
import uniqid from "uniqid";

function App() {
  const [columns, setColumns] = useState([
    { title: "Tasks", color: "secondary", tasks: [] },
    { title: "In Progress", color: "primary", tasks: [] },
    { title: "Done", color: "info", tasks: [] },
    { title: "Complete", color: "success", tasks: [] },
  ]);

  const handleAddTask = (index) => {
    let clone = [...columns];
    const uniqId = uniqid();
    clone[index].tasks.push(
      <Task
        id={uniqId}
        onRemoveTask={() => handleRemoveTask(index, uniqId)}
        color={clone[index].color}
        key={uniqId}
      ></Task>
    );
    setColumns(clone);
  };

  const handleRemoveTask = (columnIndex, id) => {
    let clone = [...columns];
    const taskIndex = clone[columnIndex].tasks.findIndex(
      (t) => t.props.id === id
    );
    clone[columnIndex].tasks.splice(taskIndex, 1);
    setColumns(clone);
  };

  return (
    <Container>
      <Row>
        {columns.map((column, index) => {
          return (
            <Col key={index} lg="3" xs="12" className="p-1">
              <Column
                onAddTask={() => handleAddTask(index)}
                title={column.title}
                color={column.color}
              >
                {column.tasks}
              </Column>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
