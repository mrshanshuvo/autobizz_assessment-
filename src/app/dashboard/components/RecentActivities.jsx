"use client";

import {
  FiActivity,
  FiEye,
  FiShoppingBag,
  FiClock,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

export default function RecentActivities({
  salesData = [],
  isLoading = false,
}) {
  // Generate recent activities ONLY from sales data
  const generateActivities = () => {
    if (!salesData || salesData.length === 0) {
      return [
        {
          text: "No recent sales activity",
          time: "When data is available",
          type: "info",
          amount: null,
        },
      ];
    }

    // Take the most recent 4 sales
    const recentSales = [...salesData]
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 4);

    return recentSales.map((sale, index) => ({
      text: sale.customerName
        ? `Sale to ${sale.customerName}`
        : sale.email
        ? `Sale to ${sale.email.split("@")[0]}`
        : `Transaction #${index + 1}`,
      time: sale.date
        ? new Date(sale.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Recent",
      type: "sale",
      amount: sale.price ? `$${sale.price.toLocaleString()}` : null,
      customer: sale.customerName || sale.email || "Customer",
    }));
  };

  const items = generateActivities();
  const totalValue = salesData.reduce(
    (sum, sale) => sum + (sale.price || 0),
    0
  );

  const getIcon = (type) => {
    switch (type) {
      case "sale":
        return <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "info":
        return <FiActivity className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <FiActivity className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm h-full">
        <div className="space-y-4">
          <div className="h-6 w-32 sm:w-40 bg-[#050E3C]/5 rounded animate-pulse mb-4 sm:mb-6"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center p-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050E3C]/5 rounded-lg animate-pulse mr-3 shrink-0"></div>
              <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                <div className="h-3 sm:h-4 w-32 sm:w-48 bg-[#050E3C]/5 rounded animate-pulse"></div>
                <div className="h-2.5 sm:h-3 w-24 sm:w-32 bg-[#050E3C]/5 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
          {/* Loading stats */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#050E3C]/10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10"
                >
                  <div className="h-6 sm:h-8 w-full bg-[#050E3C]/5 rounded animate-pulse"></div>
                  <div className="h-3 sm:h-4 w-16 mx-auto mt-1.5 bg-[#050E3C]/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#050E3C]/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-xl flex items-center justify-center border border-[#050E3C]/10">
            <FiActivity className="w-5 h-5 text-[#050E3C]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#050E3C]">
              Recent Activities
            </h2>
            <p className="text-xs sm:text-sm text-[#050E3C]/60 mt-0.5">
              {salesData.length > 0
                ? `Latest ${Math.min(salesData.length, 4)} transactions`
                : "No recent activities"}
            </p>
          </div>
        </div>
        {salesData.length > 4 && (
          <button className="hidden sm:flex items-center text-sm text-[#050E3C] font-medium hover:text-[#002455] transition-colors group">
            <span className="mr-1.5">View All</span>
            <FiEye className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 sm:space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center p-2.5 sm:p-3 bg-[#050E3C]/5 rounded-lg sm:rounded-xl border border-[#050E3C]/10 hover:bg-white hover:border-[#050E3C]/20 hover:shadow-sm transition-all duration-200 group cursor-pointer"
            >
              <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-white to-[#050E3C]/5 border border-[#050E3C]/10 rounded-lg flex items-center justify-center mr-2.5 sm:mr-3 group-hover:bg-[#050E3C]/5 group-hover:scale-105 transition-all duration-200">
                <div className="text-[#050E3C]">{getIcon(item.type)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-[#050E3C] truncate">
                  {item.text}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center text-[#050E3C]/60">
                    <FiClock className="w-3 h-3 mr-1 hidden xs:inline" />
                    <span className="text-xs truncate">{item.time}</span>
                  </div>
                  {item.amount && (
                    <span className="text-xs font-semibold text-[#050E3C] bg-white group-hover:bg-[#050E3C]/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-[#050E3C]/10 shrink-0 ml-2">
                      {item.amount}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats Summary - Only show if we have data */}
      {salesData.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#050E3C]/10">
          <p className="text-xs sm:text-sm text-[#050E3C]/60 font-medium mb-2 sm:mb-3">
            Summary
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="text-center p-2.5 sm:p-3 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-lg border border-[#050E3C]/10 hover:bg-white hover:border-[#050E3C]/20 transition-all duration-200">
              <div className="flex items-center justify-center space-x-1.5 mb-1">
                <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#050E3C]/70" />
                <p className="text-lg sm:text-2xl font-bold text-[#050E3C]">
                  {salesData.length}
                </p>
              </div>
              <p className="text-xs text-[#050E3C]/70 font-medium">
                Total Sales
              </p>
            </div>
            <div className="text-center p-2.5 sm:p-3 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-lg border border-[#050E3C]/10 hover:bg-white hover:border-[#050E3C]/20 transition-all duration-200">
              <div className="flex items-center justify-center space-x-1.5 mb-1">
                <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#050E3C]/70" />
                <p className="text-lg sm:text-2xl font-bold text-[#050E3C] truncate">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-[#050E3C]/70 font-medium">
                Total Value
              </p>
            </div>
          </div>

          {/* Mobile View All Button */}
          {salesData.length > 4 && (
            <button className="w-full mt-3 sm:mt-4 py-2 text-sm text-[#050E3C] font-medium hover:bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10 transition-colors flex items-center justify-center sm:hidden">
              <span>View All Activities</span>
              <FiEye className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
