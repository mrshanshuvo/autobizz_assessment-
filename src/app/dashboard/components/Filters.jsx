"use client";
import { useState } from "react";
import {
  FiFilter,
  FiX,
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default function Filters({ onApply, initial }) {
  const [startDate, setStartDate] = useState(initial.startDate || "");
  const [endDate, setEndDate] = useState(initial.endDate || "");
  const [minPrice, setMinPrice] = useState(initial.minPrice || "");
  const [email, setEmail] = useState(initial.email || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    onApply({
      startDate,
      endDate,
      minPrice,
      email,
      phone,
    });
    // On mobile, collapse after applying
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setMinPrice("");
    setEmail("");
    setPhone("");
    onApply({
      startDate: "",
      endDate: "",
      minPrice: "",
      email: "",
      phone: "",
    });
  };

  // Check if any filters are active
  const hasActiveFilters = startDate || endDate || minPrice || email || phone;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#050E3C]/10 overflow-hidden">
      {/* Mobile Header Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between bg-white"
        >
          <div className="flex items-center space-x-3">
            <FiFilter className="w-5 h-5 text-[#050E3C]" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-[#050E3C]">
                Filter Results
              </h3>
              <p className="text-sm text-[#050E3C]/60">
                {hasActiveFilters ? "Filters active" : "Tap to filter"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[#DC0000] rounded-full animate-pulse"></span>
            )}
            {isExpanded ? (
              <FiX className="w-5 h-5 text-[#050E3C]" />
            ) : (
              <div className="w-5 h-5 text-[#050E3C]">›</div>
            )}
          </div>
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-[#050E3C]/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#050E3C]/5 rounded-xl flex items-center justify-center">
            <FiFilter className="w-5 h-5 text-[#050E3C]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#050E3C]">
              Filter Results
            </h3>
            <p className="text-sm text-[#050E3C]/60">
              Refine your search with advanced filters
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center px-4 py-2 text-sm text-[#050E3C]/70 hover:text-[#050E3C] hover:bg-[#002455]/5 rounded-lg transition-colors"
        >
          <FiX className="w-4 h-4 mr-2" />
          Clear Filters
        </button>
      </div>

      {/* Filter Form */}
      <div className={`p-4 sm:p-6 ${isExpanded ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#050E3C] flex items-center">
              <FiCalendar className="w-4 h-4 mr-2 text-[#050E3C]/60" />
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white border border-[#050E3C]/20 text-[#050E3C] rounded-lg focus:ring-2 focus:ring-[#050E3C]/20 focus:border-[#050E3C]/40 transition-all text-sm"
              />
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#050E3C]/40 pointer-events-none" />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#050E3C] flex items-center">
              <FiCalendar className="w-4 h-4 mr-2 text-[#050E3C]/60" />
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white border border-[#050E3C]/20 text-[#050E3C] rounded-lg focus:ring-2 focus:ring-[#050E3C]/20 focus:border-[#050E3C]/40 transition-all text-sm"
              />
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#050E3C]/40 pointer-events-none" />
            </div>
          </div>

          {/* Min Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#050E3C] flex items-center">
              <FiDollarSign className="w-4 h-4 mr-2 text-[#050E3C]/60" />
              Min Price
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#050E3C]/60" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-3 py-3 bg-white border border-[#050E3C]/20 text-[#050E3C] rounded-lg focus:ring-2 focus:ring-[#050E3C]/20 focus:border-[#050E3C]/40 transition-all placeholder-[#050E3C]/40 text-sm"
              />
            </div>
          </div>

          {/* Customer Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#050E3C] flex items-center">
              <FiMail className="w-4 h-4 mr-2 text-[#050E3C]/60" />
              Customer Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#050E3C]/20 text-[#050E3C] rounded-lg focus:ring-2 focus:ring-[#050E3C]/20 focus:border-[#050E3C]/40 transition-all placeholder-[#050E3C]/40 text-sm"
              />
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#050E3C]/40 pointer-events-none" />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#050E3C] flex items-center">
              <FiPhone className="w-4 h-4 mr-2 text-[#050E3C]/60" />
              Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#050E3C]/20 text-[#050E3C] rounded-lg focus:ring-2 focus:ring-[#050E3C]/20 focus:border-[#050E3C]/40 transition-all placeholder-[#050E3C]/40 text-sm"
              />
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#050E3C]/40 pointer-events-none" />
            </div>
          </div>

          {/* Apply Button - THE ONLY RED ELEMENT */}
          <div className="flex flex-col justify-end space-y-2">
            <button
              type="button"
              onClick={handleApply}
              className="w-full px-4 py-3 bg-linear-to-r from-[#DC0000] to-[#B00000] text-white font-medium rounded-lg hover:from-[#B00000] hover:to-[#900000] transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center group"
            >
              Apply Filters
              <FiFilter className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 text-sm text-[#050E3C]/60 hover:text-[#050E3C] hover:bg-[#050E3C]/5 rounded-lg transition-colors md:hidden"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Badges - Mobile */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-[#050E3C]/10 md:hidden">
            <p className="text-sm font-medium text-[#050E3C] mb-2">
              Active Filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {startDate && (
                <span className="px-2 py-1 bg-[#050E3C]/5 text-[#050E3C] text-xs rounded-full">
                  From: {startDate}
                </span>
              )}
              {endDate && (
                <span className="px-2 py-1 bg-[#050E3C]/5 text-[#050E3C] text-xs rounded-full">
                  To: {endDate}
                </span>
              )}
              {minPrice && (
                <span className="px-2 py-1 bg-[#050E3C]/5 text-[#050E3C] text-xs rounded-full">
                  Min: ৳{minPrice}
                </span>
              )}
              {email && (
                <span className="px-2 py-1 bg-[#050E3C]/5 text-[#050E3C] text-xs rounded-full truncate max-w-[120px]">
                  Email: {email}
                </span>
              )}
              {phone && (
                <span className="px-2 py-1 bg-[#050E3C]/5 text-[#050E3C] text-xs rounded-full">
                  Phone: {phone}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
