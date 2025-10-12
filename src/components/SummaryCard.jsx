// SummaryCard.jsx
import React from 'react'

export default function SummaryCard({ title, value, delta }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-slate-500 dark:text-neon-lime">{title}</div>
          <div className="text-2xl font-semibold mt-1 dark:text-neon-cyan">{value}</div>
        </div>
        <div className="text-sm text-green-600 dark:text-neon-pink">{delta}</div>
      </div>
    </div>
  )
}
