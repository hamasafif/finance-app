// TransactionList.jsx
import React from 'react'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num)
}

export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-neon-cyan rounded-2xl shadow-lg p-5">
      <h3 className="font-medium mb-4">Daftar Transaksi</h3>
      <div className="space-y-3">
        {transactions.map(tx => (
          <div key={tx.id} className="flex justify-between items-center border-b border-slate-200 dark:border-gray-700 pb-2">
            <div>
              <div className="text-sm font-medium">{tx.desc}</div>
              <div className="text-xs text-slate-400 dark:text-neon-lime">{tx.date} • {tx.accountId}</div>
            </div>
            <div className={`font-semibold ${tx.type === 'income' ? 'text-green-600 dark:text-neon-lime' : 'text-rose-600 dark:text-neon-pink'}`}>
              {tx.type === 'income' ? '+' : '-'}{formatRupiah(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
