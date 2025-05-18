// TaskList.jsx

import React, { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, reorderTasks, taskBg, taskCompletedBg, textColor }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderTasks(draggedIndex, index);
    }
    setDraggedIndex(null);
  };

  if (tasks.length === 0) {
    return <p className={`text-center ${textColor} opacity-70`}>No tasks yet!</p>;
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          taskBg={taskBg}
          taskCompletedBg={taskCompletedBg}
          textColor={textColor}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        />
      ))}
    </ul>
  );
}
