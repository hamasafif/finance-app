import React from "react";

export default function Card({ title, value, color, icon }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border-t-4 ${color} transition-all hover:scale-[1.02] hover:shadow-xl duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-600 dark:text-neon-green mb-1">
            {title}
          </h3>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-neon-green">
            {value.toLocaleString("id-ID")}
          </p>
        </div>
        <span className="text-2xl md:text-3xl lg:text-4xl">{icon}</span>
      </div>
    </div>
  );
}
