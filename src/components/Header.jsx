/**
 * File: Header.jsx
 * Description: Simple header component displaying the app title.
 *              Applies dynamic text color based on the current theme.
 */

import React from "react";

export default function Header({ textColor }) {
  return <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>To-Do List</h1>;
}
