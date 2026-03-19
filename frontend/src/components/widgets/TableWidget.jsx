import { useState } from 'react';

const LABELS = {
  firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone',
  product: 'Product', quantity: 'Qty', unitPrice: 'Unit Price',
  totalAmount: 'Total', status: 'Status', createdBy: 'Agent', createdAt: 'Date',
};

export default function TableWidget({ config, orders }) {
  const { columns = [], pagination = 10, fontSize = 14, headerBg = '#54bd95', sortBy } = config;
  const [page, setPage] = useState(0);
  let rows = [...orders];
  if (sortBy === 'Ascending')  rows.sort((a, b) => a.totalAmount - b.totalAmount);
  if (sortBy === 'Descending') rows.sort((a, b) => b.totalAmount - a.totalAmount);
  if (sortBy === 'Order date') rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const pages = Math.ceil(rows.length / pagination);
  const visible = rows.slice(page * pagination, (page + 1) * pagination);
  const fmt = (row, col) => {
    if (col === 'totalAmount' || col === 'unitPrice') return `$${parseFloat(row[col] || 0).toFixed(2)}`;
    if (col === 'createdAt') return new Date(row[col]).toLocaleDateString();
    return row[col] ?? '-';
  };
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse" style={{ fontSize }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 text-white text-xs font-medium whitespace-nowrap">{LABELS[col] || col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={row._id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((col) => (
                  <td key={col} className="px-3 py-2 text-xs text-gray-700 whitespace-nowrap">{fmt(row, col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="flex gap-1 justify-end p-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`w-6 h-6 text-xs rounded ${page === i ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}