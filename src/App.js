import React, { useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Row, Col } from "reactstrap";
import TaskList from "./components/taskList";
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
    clone[index].tasks.push(
      <TaskList color={clone[index].color} key={uniqid()}></TaskList>
    );
    setColumns(clone);
  };

  return (
    <Container>
      <Row>
        {columns.map((column, index) => {
          return (
            <Col key={index} lg="3" xs="12" className="p-1">
              <Column
                onAddTask={handleAddTask}
                title={column.title}
                color={column.color}
                id={index}
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
