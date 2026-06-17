export default function DataTable({ columns, data, onRowClick, emptyMessage = 'No data found.' }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-blush-100 bg-white shadow-soft">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-blush-50/50 border-b border-blush-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 sm:px-6 py-4 text-xs font-semibold tracking-wider uppercase text-ink-500 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-ink-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-blush-50 last:border-0 ${
                  onRowClick ? 'cursor-pointer hover:bg-blush-50/30 transition-colors' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 sm:px-6 py-4 text-ink-700 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
