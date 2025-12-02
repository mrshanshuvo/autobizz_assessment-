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

// Move CustomTooltip outside the render
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600">
          Sales:{" "}
          <span className="font-bold">
            ${payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ series, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-64 sm:h-72 lg:h-80">
        {/* Loading skeleton */}
      </div>
    );
  }

  if (!series || series.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-64 sm:h-72 lg:h-80 flex flex-col items-center justify-center">
        {/* No data message */}
      </div>
    );
  }

  const totalSales = series.reduce(
    (sum, item) => sum + (item.totalSales || 0),
    0
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm h-64 sm:h-72 lg:h-80">
      {/* Header */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={series}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            fontSize={12}
            tick={{ fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            fontSize={12}
            tick={{ fill: "#6b7280" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#3b82f6"
            fill="url(#colorSales)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 3, fill: "white" }}
            activeDot={{ r: 5, strokeWidth: 0, fill: "#1d4ed8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
