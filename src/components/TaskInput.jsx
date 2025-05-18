/**
 * File: TaskInput.jsx
 * Description: Component for entering new tasks.
 *              Handles input state and triggers task addition on button click, icon click, or Enter key press.
 *              Applies theming styles for input border and button background.
 */

import React, { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function TaskInput({
  onAdd,
  inputBorder,
  buttonBg,
  pickerWidth = "",
  pickerMaxHeight = "395px",
  emojiTheme = "light",
}) {
  const [task, setTask] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAdd(task.trim());
    setTask("");
    setShowEmojiPicker(false); // optionally close picker on add
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const onEmojiClick = (emojiData) => {
    setTask((prev) => prev + emojiData.emoji);
  };

  // Close emoji picker if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className={`w-full border rounded px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          emojiTheme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } ${inputBorder}`}
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => setShowEmojiPicker((show) => !show)}
        aria-label="Toggle emoji picker"
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white ${buttonBg} rounded p-1.5 hover:opacity-90 focus:outline-none z-10`}
        type="button"
      >
        <Smile size={20} />
      </button>

      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="absolute right-0 z-20"
          style={{
            width: pickerWidth,
            maxHeight: pickerMaxHeight,
            overflowY: "auto",
            overflow: "hidden",
          }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} theme={emojiTheme} emojiStyle={"google"} />
        </div>
      )}
    </div>
  );
}
