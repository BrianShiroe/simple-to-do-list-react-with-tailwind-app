/**
 * File: app.jsx
 * Description: Root component of the application that manages global state including tasks and theme.
 *              Handles task creation, toggling, deletion, and reordering.
 *              Also manages theme switching between light and dark modes with persistence via localStorage.
 *              Renders the main UI structure with Header, TaskInput, TaskList, and ThemeToggleButton components.
 */

import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";

const themes = {
  light: {
    bg: "bg-gray-100",
    text: "text-gray-900",
    inputBorder: "border-gray-300",
    buttonBg: "bg-blue-500 hover:bg-blue-600",
    taskBg: "bg-white",
    taskCompletedBg: "bg-green-100",
  },
  dark: {
    bg: "bg-gray-900",
    text: "text-gray-100",
    inputBorder: "border-gray-700",
    buttonBg: "bg-blue-700 hover:bg-blue-800",
    taskBg: "bg-gray-800",
    taskCompletedBg: "bg-green-700",
  },
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const reorderTasks = (startIndex, endIndex) => {
    const updatedTasks = [...tasks];
    const [removed] = updatedTasks.splice(startIndex, 1);
    updatedTasks.splice(endIndex, 0, removed);
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentTheme = themes[theme];

  return (
    <div className={`${currentTheme.bg} min-h-screen p-6 transition-colors duration-500`}>
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} buttonBg={currentTheme.buttonBg} />

      <div className="max-w-md mx-auto">
        <Header textColor={currentTheme.text} />

        <TaskInput
          onAdd={addTask}
          inputBorder={currentTheme.inputBorder}
          buttonBg={currentTheme.buttonBg}
          emojiTheme={theme}
        />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          reorderTasks={reorderTasks}
          taskBg={currentTheme.taskBg}
          taskCompletedBg={currentTheme.taskCompletedBg}
          textColor={currentTheme.text}
        />
      </div>
    </div>
  );
}
