// TaskItem.jsx

import React, { useState } from "react";
/**
 * File: TaskItem.jsx
 * Description: Component representing a single task item.
 *              Handles task toggle, deletion, and supports drag-and-drop interaction.
 *              Adapts styling based on theme and task completion state.
 */

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
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <li
      className={`group flex items-center justify-between p-2 mb-2 rounded transition duration-300
        ${task.completed ? taskCompletedBg : taskBg} ${textColor}
        hover:shadow-lg hover:scale-[1.01] hover:brightness-105
        ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
      draggable={draggable}
      onDragStart={(e) => {
        setIsGrabbing(true);
        onDragStart?.(e);
      }}
      onDragEnd={() => setIsGrabbing(false)}
      onDragOver={onDragOver}
      onDrop={(e) => {
        setIsGrabbing(false);
        onDrop?.(e);
      }}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="mr-3 form-checkbox h-5 w-5 text-blue-600 pointer-events-none"
        />
        <span className={`${task.completed ? "line-through opacity-70" : ""}`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="text-red-500 hover:text-red-700 font-bold ml-4"
        aria-label="Delete task"
      >
        &times;
      </button>
    </li>
  );
}