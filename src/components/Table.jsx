import React from "react";

export default function Table({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">{tx.amount}</td>
              <td className="py-2 px-3 text-gray-700">{tx.desc}</td>
              <td className="py-2 px-3 text-gray-700">{tx.date}</td>
              <td className="py-2 px-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {tx.category}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
