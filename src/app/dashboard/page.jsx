// Updated DashboardPage component using API data
"use client";
import { useState, useMemo } from "react";
import Filters from "./components/Filters";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";
import { useSalesQuery } from "../../hooks/useSales";
import RecentActivities from "./components/RecentActivities";
import DashboardCard from "./components/DashboardCard";

export default function DashboardPage() {
  // Initialize with default values for API
  const [filters, setFilters] = useState({
    limit: 50,
    startDate: "",
    endDate: "",
    minPrice: "",
    email: "",
    phone: "",
    after: "",
    before: "",
  });

  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  // Prepare API parameters - MATCH THE API DOCUMENTATION
  const apiParams = useMemo(() => {
    const params = {
      limit: 50,
      sortBy,
      sortOrder,
    };

    // Add date filters if provided
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    // Add other filters if provided - USE CORRECT PARAM NAMES
    if (filters.minPrice) params.priceMin = filters.minPrice;
    if (filters.email) params.email = filters.email;
    if (filters.phone) params.phone = filters.phone;

    // Add pagination tokens
    if (filters.after) params.after = filters.after;
    if (filters.before) params.before = filters.before;

    return params;
  }, [filters, sortBy, sortOrder]);

  // Fetch sales data from API with all parameters
  const salesQuery = useSalesQuery(apiParams);

  const data = salesQuery.data || {
    results: { Sales: [], TotalSales: [] },
    pagination: {},
  };

  const items = useMemo(() => data.results.Sales || [], [data.results.Sales]);
  const series = useMemo(
    () => data.results.TotalSales || [],
    [data.results.TotalSales]
  );

  // Calculate dashboard metrics from API data
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

    // Total sales from TotalSales series (last 30 days)
    const totalSales = series.reduce(
      (sum, day) => sum + (day.totalSale || 0),
      0
    );

    // Total transactions count (current page)
    const totalTransactions = items.length;

    // Average order value from current items
    const totalSalesFromItems = items.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    const avgOrderValue =
      totalTransactions > 0 ? totalSalesFromItems / totalTransactions : 0;

    // Unique customers by email from current items
    const uniqueCustomers = new Set(
      items.map((item) => item.customerEmail).filter(Boolean)
    );
    const activeCustomers = uniqueCustomers.size;

    // Sales growth: compare last day with previous day
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

  // Apply filters - reset pagination when filters change
  const applyFilters = (newFilters) => {
    console.log(newFilters);
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      minPrice: newFilters.minPrice || "",
      after: "",
      before: "",
    }));
  };

  // Handle sort - trigger API call with new sort parameters
  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  // Pagination functions
  const nextPage = () => {
    if (tokens.after) {
      setFilters((prev) => ({
        ...prev,
        after: tokens.after,
        before: "",
      }));
    }
  };

  const prevPage = () => {
    if (tokens.before) {
      setFilters((prev) => ({
        ...prev,
        before: tokens.before,
        after: "",
      }));
    }
  };

  // Format series for chart
  const formattedSeries = useMemo(() => {
    return series.map((item) => {
      const date = item.day ? new Date(item.day) : null;
      return {
        date: date
          ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "",
        totalSales: item.totalSale || 0,
        originalDate: item.day,
      };
    });
  }, [series]);

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
            ? `Showing ${items.length} transactions (${series.length} days of data)`
            : "No data available"}
        </p>
      </div>

      {/* Dashboard Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Sales"
          value={
            dashboardMetrics.totalSales > 0
              ? `৳${dashboardMetrics.totalSales.toLocaleString()}`
              : "৳0"
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
              ? `৳${dashboardMetrics.avgOrderValue.toFixed(2)}`
              : "৳0.00"
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

      {/* Loading, Error, and Main Content */}
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

      {salesQuery.error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 shrink-0">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Error Loading Data</h3>
              <p className="text-red-600 text-sm mt-1">
                {salesQuery.error.message ||
                  "Unable to fetch sales data. Please try again."}
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

      {!salesQuery.isLoading && !salesQuery.error && (
        <>
          <Filters onApply={applyFilters} initial={filters} />

          {items.length > 0 ? (
            <>
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
                filters={filters}
              />
            </>
          ) : (
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
                  onClick={() =>
                    setFilters({
                      limit: 50,
                      startDate: "",
                      endDate: "",
                      minPrice: "",
                      email: "",
                      phone: "",
                      after: "",
                      before: "",
                    })
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
