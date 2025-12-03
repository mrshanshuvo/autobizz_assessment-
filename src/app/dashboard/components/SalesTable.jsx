"use client";

import {
  FiCalendar,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiFilter,
  FiUser,
} from "react-icons/fi";

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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Mobile-friendly format
    if (window.innerWidth < 640) {
      return `${month} ${day}, ${hours}:${minutes}`;
    }
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  // Mobile-friendly customer email display
  const formatEmail = (email) => {
    if (!email) return "-";
    if (window.innerWidth < 640) {
      const [name, domain] = email.split("@");
      if (name.length > 10) {
        return `${name.substring(0, 8)}...@${domain}`;
      }
    }
    return email;
  };

  // Mobile-friendly phone display
  const formatPhone = (phone) => {
    if (!phone) return "-";
    if (window.innerWidth < 640 && phone.length > 12) {
      return `${phone.substring(0, 10)}...`;
    }
    return phone;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="w-10 h-10 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-xl flex items-center justify-center border border-[#050E3C]/10">
            <FiFilter className="w-5 h-5 text-[#050E3C]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#050E3C]">
              Sales Transactions
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-[#050E3C]/60">
              <FiUser className="w-3 h-3 mr-1" />
              Showing:{" "}
              <span className="font-semibold text-[#050E3C] ml-1">
                {items.length} {items.length === 1 ? "record" : "records"}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile pagination indicators */}
        <div className="flex items-center sm:hidden">
          <div className="text-xs text-[#050E3C]/60">
            {tokens?.before ? "← Previous" : ""}
            {tokens?.before && tokens?.after ? " • " : ""}
            {tokens?.after ? "Next →" : ""}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-[#050E3C]/10">
        <table className="min-w-full divide-y divide-[#050E3C]/10">
          <thead className="bg-linear-to-r from-[#050E3C]/5 to-[#050E3C]/10">
            <tr>
              {/* Date Column */}
              <th
                className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-[#050E3C]/70 uppercase tracking-wider cursor-pointer hover:bg-[#050E3C]/10 transition-colors group"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center">
                  <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 text-[#050E3C]/60 group-hover:text-[#050E3C]" />
                  <span className="hidden xs:inline">Date</span>
                  <span className="ml-1 flex items-center">
                    {sortBy === "date" ? (
                      sortOrder === "asc" ? (
                        <FiChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      )
                    ) : (
                      <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-40 group-hover:opacity-70" />
                    )}
                  </span>
                </div>
              </th>

              {/* Email Column */}
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-[#050E3C]/70 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiMail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 text-[#050E3C]/60" />
                  <span className="hidden sm:inline">Customer Email</span>
                  <span className="sm:hidden">Email</span>
                </div>
              </th>

              {/* Phone Column - Hide on small mobile */}
              <th className="hidden xs:table-cell px-3 sm:px-4 py-3 text-left text-xs font-medium text-[#050E3C]/70 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 text-[#050E3C]/60" />
                  <span className="hidden sm:inline">Phone</span>
                  <span className="sm:hidden">Phone</span>
                </div>
              </th>

              {/* Price Column */}
              <th
                className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-[#050E3C]/70 uppercase tracking-wider cursor-pointer hover:bg-[#050E3C]/10 transition-colors group"
                onClick={() => toggleSort("price")}
              >
                <div className="flex items-center justify-end">
                  <span className=" xs:inline">Price</span>
                  <span className="ml-1 flex items-center">
                    {sortBy === "price" ? (
                      sortOrder === "asc" ? (
                        <FiChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      )
                    ) : (
                      <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-40 group-hover:opacity-70" />
                    )}
                  </span>
                  <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 text-[#050E3C]/60 group-hover:text-[#050E3C] hidden xs:inline" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#050E3C]/10">
            {items.length ? (
              items.map((it, idx) => (
                <tr
                  key={it._id ?? idx}
                  className="hover:bg-linear-to-r hover:from-[#050E3C]/5 hover:to-[#050E3C]/2 transition-colors duration-150"
                >
                  {/* Date Cell */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-[#050E3C]">
                    <div className="flex items-center">
                      <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#050E3C]/60 sm:hidden" />
                      {formatDate(it.date)}
                    </div>
                  </td>

                  {/* Email Cell */}
                  <td className="px-3 sm:px-4 py-3 text-sm text-[#050E3C]/70">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-linear-to-br from-[#050E3C]/10 to-[#050E3C]/5 rounded-lg flex items-center justify-center mr-2 border border-[#050E3C]/10 shrink-0">
                        <FiUser className="w-4 h-4 text-[#050E3C]" />
                      </div>
                      <span className="truncate max-w-[120px] xs:max-w-[180px] sm:max-w-60 font-medium">
                        {formatEmail(it.customerEmail)}
                      </span>
                    </div>
                  </td>

                  {/* Phone Cell - Hide on small mobile */}
                  <td className="hidden xs:table-cell px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-[#050E3C]/70">
                    <div className="flex items-center">
                      <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#050E3C]/60 sm:hidden" />
                      {formatPhone(it.customerPhone)}
                    </div>
                  </td>

                  {/* Price Cell */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      <span className="text-sm sm:text-base font-semibold text-[#050E3C] bg-linear-to-r from-[#050E3C]/5 to-[#050E3C]/10 px-2 py-1 rounded-lg border border-[#050E3C]/10">
                        ৳ {it.price != null ? it.price.toLocaleString() : "-"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-6 sm:p-8 text-center" colSpan={4}>
                  <div className="flex flex-col items-center justify-center text-[#050E3C]/60">
                    <div className="w-16 h-16 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-full flex items-center justify-center mb-4">
                      <FiFilter className="w-8 h-8 text-[#050E3C]/40" />
                    </div>
                    <p className="text-lg font-medium text-[#050E3C]/70 mb-1">
                      No sales data found
                    </p>
                    <p className="text-sm max-w-sm">
                      Try adjusting your filters or check back later
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#050E3C]/10">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <button
            onClick={onPrev}
            disabled={!tokens?.before}
            className="px-3 sm:px-4 py-2 border border-[#050E3C]/20 rounded-lg text-sm font-medium text-[#050E3C] hover:bg-[#050E3C]/5 hover:border-[#050E3C]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center group"
          >
            <FiChevronLeft className="w-4 h-4 mr-1 sm:mr-2 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>
          <button
            onClick={onNext}
            disabled={!tokens?.after}
            className="px-3 sm:px-4 py-2 border border-[#050E3C]/20 rounded-lg text-sm font-medium text-[#050E3C] hover:bg-[#050E3C]/5 hover:border-[#050E3C]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center group"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <FiChevronRight className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-[#050E3C]/60 flex items-center">
          <div className="hidden sm:flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                tokens?.before ? "bg-[#050E3C]" : "bg-[#050E3C]/20"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                tokens?.after ? "bg-[#050E3C]" : "bg-[#050E3C]/20"
              }`}
            ></div>
          </div>
          {tokens?.before || tokens?.after ? (
            <span className="text-[#050E3C] font-medium">
              More records available
            </span>
          ) : (
            <span>All records displayed</span>
          )}
        </div>
      </div>
    </div>
  );
}
