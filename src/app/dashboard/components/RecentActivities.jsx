"use client";

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
        return "💰";
      case "info":
        return "📋";
      default:
        return "📝";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
        <div className="space-y-4">
          <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mb-6"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse mr-3"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          <p className="text-sm text-gray-500 mt-1">
            {salesData.length > 0
              ? `Latest ${Math.min(salesData.length, 4)} transactions`
              : "No activities"}
          </p>
        </div>
        {salesData.length > 4 && (
          <span className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors">
            View All
          </span>
        )}
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-lg">{getIcon(item.type)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.text}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{item.time}</p>
                {item.amount && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {item.amount}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Stats Summary - Only show if we have data */}
      {salesData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {salesData.length}
              </p>
              <p className="text-xs text-blue-800 font-medium">Total Sales</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                ৳{totalValue.toLocaleString()}
              </p>
              <p className="text-xs text-green-800 font-medium">Total Value</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
