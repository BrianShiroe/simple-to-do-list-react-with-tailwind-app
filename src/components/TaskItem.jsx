// TaskItem.jsx

import React from "react";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  taskBg,
  taskCompletedBg,
  textColor,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <li
      className={`flex items-center justify-between p-2 mb-2 rounded ${task.completed ? taskCompletedBg : taskBg}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <label className={`flex items-center cursor-pointer select-none ${textColor}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-3 form-checkbox h-5 w-5 text-blue-600"
        />
        <span className={task.completed ? "line-through opacity-70" : ""}>{task.text}</span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-bold"
        aria-label="Delete task"
      >
        &times;
      </button>
    </li>
  );
}
