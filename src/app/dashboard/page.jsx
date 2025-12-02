// Updated DashboardPage component - NO STATIC DATA
"use client";
import { useState, useMemo } from "react";
import Filters from "./components/Filters";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";
import { useSalesQuery } from "../../hooks/useSales";
import RecentActivities from "./components/RecentActivities";
import DashboardCard from "./components/DashboardCard";

export default function DashboardPage() {
  const [filters, setFilters] = useState({ limit: 50 });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const salesQuery = useSalesQuery({ ...filters, sortBy, sortOrder });
  const data = salesQuery.data || {
    results: { Sales: [], TotalSales: [] },
    pagination: {},
  };

  const items = useMemo(() => data.results.Sales || [], [data.results.Sales]);
  const series = useMemo(
    () => data.results.TotalSales || [],
    [data.results.TotalSales]
  );

  // Calculate dashboard metrics ONLY from API data
  const dashboardMetrics = useMemo(() => {
    if (!items.length || !series.length) {
      return {
        totalSales: 0,
        totalTransactions: 0,
        avgOrderValue: 0,
        activeCustomers: 0,
        salesGrowth: 0,
      };
    }

    // Calculate total sales from the series data
    const totalSales = series.reduce(
      (sum, day) => sum + (day.totalSale || 0),
      0
    );

    // Calculate total number of transactions
    const totalTransactions = items.length;

    // Calculate average order value from actual sales items
    const totalSalesFromItems = items.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    const avgOrderValue =
      totalTransactions > 0 ? totalSalesFromItems / totalTransactions : 0;

    // Count unique customers from sales data
    const uniqueCustomers = new Set(
      items
        .map((item) => item.customerName || item.email || item.phone)
        .filter(Boolean) // Remove null/undefined
    );
    const activeCustomers = uniqueCustomers.size;

    // Calculate sales growth from the series data
    let salesGrowth = 0;
    if (series.length >= 2) {
      const yesterday = series[series.length - 2]?.totalSale || 0;
      const today = series[series.length - 1]?.totalSale || 0;
      if (yesterday > 0) {
        salesGrowth = ((today - yesterday) / yesterday) * 100;
      }
    }

    return {
      totalSales,
      totalTransactions,
      avgOrderValue,
      activeCustomers,
      salesGrowth,
    };
  }, [items, series]);

  const tokens = data.pagination || {};

  const applyFilters = (f) =>
    setFilters((prev) => ({ ...prev, ...f, after: "", before: "" }));
  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };
  const nextPage = () => {
    if (tokens.after)
      setFilters((prev) => ({ ...prev, after: tokens.after, before: "" }));
  };
  const prevPage = () => {
    if (tokens.before)
      setFilters((prev) => ({ ...prev, before: tokens.before, after: "" }));
  };

  // Format the series for the chart from API data
  const formattedSeries = series.map((item) => ({
    date: item.day ? formatChartDate(item.day) : "",
    totalSales: item.totalSale || 0,
    originalDate: item.day,
  }));

  // Helper function to format date for chart
  function formatChartDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          {items.length > 0
            ? `Showing ${items.length} transactions`
            : "No data available"}
        </p>
      </div>

      {/* Dashboard Metrics Cards - ALL FROM API DATA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Sales"
          value={
            dashboardMetrics.totalSales > 0
              ? `$${dashboardMetrics.totalSales.toLocaleString()}`
              : "$0"
          }
          icon="💰"
          trend={dashboardMetrics.salesGrowth}
          description={
            series.length > 0 ? `${series.length} days data` : "No data"
          }
          isLoading={salesQuery.isLoading}
        />
        <DashboardCard
          title="Transactions"
          value={dashboardMetrics.totalTransactions.toLocaleString()}
          icon="🛒"
          description={items.length > 0 ? "Total orders" : "No orders"}
          isLoading={salesQuery.isLoading}
        />
        <DashboardCard
          title="Avg. Order"
          value={
            dashboardMetrics.avgOrderValue > 0
              ? `$${dashboardMetrics.avgOrderValue.toFixed(2)}`
              : "$0.00"
          }
          icon="📊"
          description="Per transaction"
          isLoading={salesQuery.isLoading}
        />
        <DashboardCard
          title="Customers"
          value={dashboardMetrics.activeCustomers.toLocaleString()}
          icon="👥"
          description="Unique customers"
          isLoading={salesQuery.isLoading}
        />
      </div>

      {/* Loading State */}
      {salesQuery.isLoading && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-gray-700 font-medium">Loading sales data...</p>
              <p className="text-gray-500 text-sm mt-1">Fetching from API</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {salesQuery.error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 shrink-0">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Error Loading Data</h3>
              <p className="text-red-600 text-sm mt-1">
                Unable to fetch sales data. Please try again.
              </p>
              <button
                onClick={() => salesQuery.refetch()}
                className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Only show when data is loaded */}
      {!salesQuery.isLoading && !salesQuery.error && items.length > 0 && (
        <>
          <Filters onApply={applyFilters} initial={filters} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart
                series={formattedSeries}
                isLoading={salesQuery.isLoading}
              />
            </div>
            <div>
              <RecentActivities
                salesData={items}
                isLoading={salesQuery.isLoading}
              />
            </div>
          </div>

          <SalesTable
            items={items}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onNext={nextPage}
            onPrev={prevPage}
            tokens={tokens}
            isLoading={salesQuery.isLoading}
          />
        </>
      )}

      {/* Empty State - When no data but loaded successfully */}
      {!salesQuery.isLoading && !salesQuery.error && items.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Sales Data
            </h3>
            <p className="text-gray-600 mb-6">
              No transactions found with the current filters.
            </p>
            <button
              onClick={() => setFilters({ limit: 50 })}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
