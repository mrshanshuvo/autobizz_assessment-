"use client";
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
  console.log(items);
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
          Showing:{" "}
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
                Customer Email
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
                  key={it._id ?? idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {it.date
                      ? format(new Date(it.date), "MMM dd, yyyy HH:mm")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <span className="text-blue-600 font-medium text-xs">
                          {(it.customerEmail || "?")[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="truncate max-w-[200px]">
                        {it.customerEmail || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {it.customerPhone || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    ${it.price != null ? it.price.toLocaleString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-8 text-center" colSpan={4}>
                  <div className="text-gray-400">
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={onPrev}
            disabled={!tokens?.before}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
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
              className="w-4 h-4 ml-1"
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
        <div className="text-sm text-gray-500">
          {tokens.before || tokens.after ? "More records available" : "Page 1"}
        </div>
      </div>
    </div>
  );
}
