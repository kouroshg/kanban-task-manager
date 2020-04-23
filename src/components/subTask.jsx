import React from "react";

const SubTask = (props) => {
  const { status, children } = props;

  return <span>{children}</span>;
};

export default SubTask;
