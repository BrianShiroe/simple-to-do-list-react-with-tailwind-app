// TaskInput.jsx

import React, { useState } from "react";

export default function TaskInput({ onAdd, inputBorder, buttonBg }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAdd(task.trim());
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        className={`flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBorder}`}
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd} className={`px-4 py-2 rounded-r font-semibold ${buttonBg}`}>
        Add
      </button>
    </div>
  );
}
