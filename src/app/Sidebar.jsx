"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiViewGrid, HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path) => pathname === path;

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu on route change - using a timeout to avoid synchronous update
  useEffect(() => {
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 0); // Queue the state update for next event loop

      return () => clearTimeout(timer);
    }
  }, [pathname, isMobileMenuOpen]);

  // Also close menu on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg border border-[#050E3C]/10 hover:bg-[#050E3C]/5 transition-all duration-200"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <HiX className="w-5 h-5 text-[#050E3C]" />
        ) : (
          <HiMenu className="w-5 h-5 text-[#050E3C]" />
        )}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-40
          flex flex-col w-64 bg-white shadow-lg md:shadow-none
          border-r border-[#050E3C]/10
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#050E3C]/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#050E3C] rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-[#050E3C] truncate">
                AutoBizz
              </h1>
              <p className="text-xs text-[#050E3C]/60">Dashboard v1.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {/* Home */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
              ${
                isActive("/")
                  ? "bg-[#050E3C]/5 text-[#050E3C] font-medium"
                  : "text-[#050E3C]/70 hover:bg-[#002455]/5 hover:text-[#050E3C]"
              }
            `}
          >
            <HiHome
              className={`w-5 h-5 mr-3 shrink-0 ${
                isActive("/")
                  ? "text-[#050E3C]"
                  : "text-[#050E3C]/40 group-hover:text-[#050E3C]"
              }`}
            />
            <span className="truncate">Home</span>
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
              ${
                isActive("/dashboard")
                  ? "bg-[#050E3C]/5 text-[#050E3C] font-medium"
                  : "text-[#050E3C]/70 hover:bg-[#002455]/5 hover:text-[#050E3C]"
              }
            `}
          >
            <HiViewGrid
              className={`w-5 h-5 mr-3 shrink-0 ${
                isActive("/dashboard")
                  ? "text-[#050E3C]"
                  : "text-[#050E3C]/40 group-hover:text-[#050E3C]"
              }`}
            />
            <span className="truncate">Dashboard</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#050E3C]/10">
          <div className="px-4 py-3 bg-[#050E3C]/5 rounded-xl">
            <p className="text-sm text-[#050E3C]">Built with ❤️</p>
            <p className="text-xs text-[#050E3C]/60 mt-1">AutoBizz Team</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          aria-label="Close menu"
        />
      )}
    </>
  );
}
