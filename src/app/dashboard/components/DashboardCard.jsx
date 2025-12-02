// Updated DashboardCard component - supports loading state
export default function DashboardCard({
  title,
  value,
  icon = "📈",
  trend,
  description,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              {title}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">
              {value}
            </h3>
          </div>
        </div>
        {trend !== undefined && trend !== 0 && (
          <div
            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              trend >= 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend >= 0 ? "↗" : "↘"} {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      {description && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
