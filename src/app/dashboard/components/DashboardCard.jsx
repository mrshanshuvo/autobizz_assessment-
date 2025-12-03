"use client";

import { FiTrendingUp, FiTrendingDown, FiClock } from "react-icons/fi";

export default function DashboardCard({
  title,
  value,
  icon = "📈",
  trend,
  description,
  isLoading = false,
  trendLabel,
}) {
  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm h-full">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#050E3C]/5 rounded-lg sm:rounded-xl animate-pulse shrink-0"></div>
            <div className="space-y-1.5 sm:space-y-2 min-w-0 flex-1">
              <div className="h-3 sm:h-4 w-16 sm:w-20 bg-[#050E3C]/5 rounded animate-pulse"></div>
              <div className="h-6 sm:h-8 w-full max-w-32 bg-[#050E3C]/5 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-5 w-14 sm:h-6 sm:w-16 bg-[#050E3C]/5 rounded-full animate-pulse shrink-0 ml-2"></div>
        </div>
        <div className="pt-3 sm:pt-4 border-t border-[#050E3C]/10">
          <div className="h-3 sm:h-4 w-24 sm:w-32 bg-[#050E3C]/5 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const isPositiveTrend = trend >= 0;
  const TrendIcon = isPositiveTrend ? FiTrendingUp : FiTrendingDown;

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 h-full">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-lg sm:rounded-xl flex items-center justify-center border border-[#050E3C]/10 shrink-0">
            <span className="text-xl sm:text-2xl">{icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-[#050E3C]/60 font-medium uppercase tracking-wider truncate">
              {title}
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-0.5 sm:mt-1 text-[#050E3C] truncate">
              {value}
            </h3>
          </div>
        </div>
        {trend !== undefined && trend !== 0 && (
          <div
            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium shrink-0 ml-2
              ${
                isPositiveTrend
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
          >
            <TrendIcon
              className={`w-3 h-3 mr-1 ${
                isPositiveTrend ? "text-green-600" : "text-red-600"
              }`}
            />
            <span className="whitespace-nowrap">
              {Math.abs(trend).toFixed(1)}%
              {trendLabel && (
                <span className="ml-1 hidden xs:inline">{trendLabel}</span>
              )}
            </span>
          </div>
        )}
      </div>
      {description && (
        <div className="pt-3 sm:pt-4 border-t border-[#050E3C]/10">
          <p className="text-xs sm:text-sm text-[#050E3C]/60 flex items-center">
            <FiClock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 shrink-0" />
            <span className="truncate">{description}</span>
          </p>
        </div>
      )}
    </div>
  );
}
