"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiViewGrid } from "react-icons/hi";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white  shadow-lg transform transition-transform duration-300">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AutoBizz</h1>
            <p className="text-xs text-gray-500">Dashboard v1.0</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {/* Home */}
        <Link
          href="/"
          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
            ${
              isActive("/")
                ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600"
            }
          `}
        >
          <HiHome
            className={`w-5 h-5 mr-3 ${
              isActive("/")
                ? "text-blue-500"
                : "text-gray-400 group-hover:text-blue-500"
            }`}
          />
          Home
        </Link>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
            ${
              isActive("/dashboard")
                ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600"
            }
          `}
        >
          <HiViewGrid
            className={`w-5 h-5 mr-3 ${
              isActive("/dashboard")
                ? "text-blue-500"
                : "text-gray-400 group-hover:text-blue-500"
            }`}
          />
          Dashboard
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="px-4 py-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">Built with ❤️</p>
          <p className="text-xs text-gray-500 mt-1">AutoBizz Team</p>
        </div>
      </div>
    </aside>
  );
}
