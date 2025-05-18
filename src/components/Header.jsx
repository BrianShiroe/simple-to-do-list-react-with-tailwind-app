// Header.jsx

import React from "react";

export default function Header({ textColor }) {
  return <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>To-Do List</h1>;
}
