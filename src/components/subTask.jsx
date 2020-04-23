import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdTime, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
const SubTask = (props) => {
  const { status, children, onRemoveSubtask, columnId, taskId, index } = props;
  const [statusIndex, setStatusIndex] = useState(0);

  return (
    <span>
      <a href="#" className="text-light">
        <FiTrash2
          onClick={() => {
            onRemoveSubtask(columnId, taskId, index);
          }}
          className="mx-2"
        />
      </a>
      {children}
    </span>
  );
};

export default SubTask;
