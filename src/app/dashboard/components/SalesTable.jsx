// SalesTable component
import { format } from "date-fns";

export default function SalesTable({
  items,
  onSort,
  sortBy,
  sortOrder,
  onNext,
  onPrev,
  tokens,
}) {
  const toggleSort = (field) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, order);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 sm:mb-0">
          Sales Transactions
        </h3>
        <div className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-semibold text-gray-900">
            {items.length} records
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  <span className="ml-1">
                    {sortBy === "date"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleSort("price")}
              >
                <div className="flex items-center justify-end">
                  Price
                  <span className="ml-1">
                    {sortBy === "price"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length ? (
              items.map((it, idx) => (
                <tr
                  key={it.id ?? idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {it.date
                      ? format(new Date(it.date), "MMM dd, yyyy HH:mm")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <span className="text-blue-600 font-medium text-xs">
                          {(it.customerName || it.name || "?")[0]}
                        </span>
                      </div>
                      {it.customerName || it.name || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {it.email || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {it.phone || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    ${it.price != null ? it.price.toLocaleString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-8 text-center" colSpan={5}>
                  <div className="text-gray-400">
                    <svg
                      className="w-12 h-12 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-600">
                      No sales data found
                    </p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={onPrev}
            disabled={!tokens?.before}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={!tokens?.after}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            Next
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-500">Page navigation</div>
      </div>
    </div>
  );
}
