import React from "react";

export function Card({ children }) {
  return (
    <div className="border rounded-md shadow p-4 bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
