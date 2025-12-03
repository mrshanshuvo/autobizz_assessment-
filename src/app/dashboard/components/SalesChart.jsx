"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import {
  FiBarChart2,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiDownload,
} from "react-icons/fi";

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-[#050E3C]/20 backdrop-blur-sm">
        <div className="flex items-center text-sm font-semibold text-[#050E3C] mb-1">
          <FiCalendar className="w-3 h-3 mr-2" />
          {label}
        </div>
        <div className="flex items-center text-sm text-[#050E3C]">
          <FiDollarSign className="w-3 h-3 mr-1 text-[#050E3C]/60" />
          Sales:{" "}
          <span className="font-bold ml-1">
            ${payload[0].value?.toLocaleString() || "0"}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ series, isLoading = false, onExport }) {
  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm h-[350px] sm:h-[400px] flex flex-col">
        {/* Skeleton Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
          <div className="space-y-2">
            <div className="h-6 w-32 sm:w-40 bg-[#050E3C]/5 rounded animate-pulse"></div>
            <div className="h-4 w-24 sm:w-32 bg-[#050E3C]/5 rounded animate-pulse"></div>
          </div>
          <div className="mt-2 sm:mt-0 h-8 w-24 bg-[#050E3C]/5 rounded-lg animate-pulse"></div>
        </div>

        {/* Skeleton Chart */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-[#050E3C]/20 border-t-[#050E3C] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!series || series.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm h-[350px] sm:h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-full flex items-center justify-center mb-4">
          <FiBarChart2 className="w-8 h-8 text-[#050E3C]" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-[#050E3C] mb-2">
          No Chart Data
        </h3>
        <p className="text-[#050E3C]/60 text-sm sm:text-base max-w-sm px-4">
          No sales data available for the selected period.
        </p>
      </div>
    );
  }

  const totalSales = series.reduce(
    (sum, item) => sum + (item.totalSales || 0),
    0
  );

  const avgSales = series.length > 0 ? totalSales / series.length : 0;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#050E3C]/10 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-[#050E3C]/5 to-[#050E3C]/10 rounded-xl flex items-center justify-center border border-[#050E3C]/10 shrink-0">
            <FiBarChart2 className="w-5 h-5 text-[#050E3C]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#050E3C]">
              Sales Over Time
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <p className="text-xs sm:text-sm text-[#050E3C]/60 flex items-center">
                <FiCalendar className="w-3 h-3 mr-1 hidden xs:inline" />
                {series.length} days
              </p>
              <p className="text-xs sm:text-sm text-[#050E3C]/60 flex items-center">
                <FiDollarSign className="w-3 h-3 mr-1 hidden xs:inline" />
                Total: ${totalSales.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <div className="hidden sm:flex items-center px-3 py-1.5 bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10">
            <div className="w-2 h-2 bg-[#050E3C] rounded-full mr-2"></div>
            <span className="text-xs font-medium text-[#050E3C]/70">
              Daily Sales
            </span>
          </div>

          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-[#050E3C] hover:bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10 transition-colors"
            >
              <FiDownload className="w-3 h-3 mr-1.5" />
              <span className="hidden xs:inline">Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10">
          <p className="text-xs sm:text-sm text-[#050E3C]/60 font-medium">
            Total Sales
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#050E3C] truncate">
            ${totalSales.toLocaleString()}
          </p>
        </div>
        <div className="p-2 sm:p-3 bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10">
          <p className="text-xs sm:text-sm text-[#050E3C]/60 font-medium">
            Avg. Daily
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#050E3C] truncate">
            ${avgSales.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="hidden sm:block p-3 bg-[#050E3C]/5 rounded-lg border border-[#050E3C]/10">
          <p className="text-sm text-[#050E3C]/60 font-medium">Peak Day</p>
          <p className="text-xl font-bold text-[#050E3C] truncate">
            $
            {Math.max(...series.map((s) => s.totalSales || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={series}
            margin={{
              top: 5,
              right: window.innerWidth < 640 ? 10 : 30,
              left: window.innerWidth < 640 ? 0 : 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#050E3C" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#050E3C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#050E3C"
              strokeOpacity={0.1}
              vertical={false}
              horizontal={window.innerWidth >= 640}
            />
            <XAxis
              dataKey="date"
              fontSize={window.innerWidth < 640 ? 10 : 12}
              tick={{ fill: "#050E3C", fillOpacity: 0.6 }}
              tickLine={false}
              axisLine={{ stroke: "#050E3C", strokeOpacity: 0.1 }}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={window.innerWidth < 640 ? 20 : 40}
            />
            <YAxis
              fontSize={window.innerWidth < 640 ? 10 : 12}
              tick={{ fill: "#050E3C", fillOpacity: 0.6 }}
              tickFormatter={(value) =>
                window.innerWidth < 640
                  ? `$${
                      value >= 1000 ? (value / 1000).toFixed(0) + "k" : value
                    }`
                  : `$${value?.toLocaleString() || "0"}`
              }
              tickLine={false}
              axisLine={{ stroke: "#050E3C", strokeOpacity: 0.1 }}
              width={window.innerWidth < 640 ? 40 : 60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#050E3C", strokeOpacity: 0.1, strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="totalSales"
              stroke="#050E3C"
              fill="url(#colorSales)"
              strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#050E3C"
              strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
              dot={{
                stroke: "#050E3C",
                strokeWidth: window.innerWidth < 640 ? 1 : 2,
                r: window.innerWidth < 640 ? 2 : 3,
                fill: "white",
              }}
              activeDot={{
                r: window.innerWidth < 640 ? 4 : 5,
                strokeWidth: 0,
                fill: "#050E3C",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile Legend & Export */}
      <div className="flex items-center justify-between mt-4 sm:hidden">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#050E3C] rounded-full mr-2"></div>
          <span className="text-xs text-[#050E3C]/70">Daily Sales</span>
        </div>
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center px-2 py-1 text-xs font-medium text-[#050E3C] hover:bg-[#050E3C]/5 rounded border border-[#050E3C]/10"
          >
            <FiDownload className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
