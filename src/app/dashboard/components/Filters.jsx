// Filters component
import { useState } from "react";

export default function Filters({ onApply, initial }) {
  const [startDate, setStartDate] = useState(initial.startDate || "");
  const [endDate, setEndDate] = useState(initial.endDate || "");
  const [minPrice, setMinPrice] = useState(initial.minPrice || "");
  const [email, setEmail] = useState(initial.email || "");
  const [phone, setPhone] = useState(initial.phone || "");

  const handleApply = () => {
    onApply({ startDate, endDate, minPrice, email, phone });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter Results
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Customer Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@domain.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="017..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleApply}
            className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
