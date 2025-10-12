import React from "react";

export default function Card({ title, value, color, icon }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-t-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
