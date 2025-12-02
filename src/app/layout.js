import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AutoBizz Dashboard",
  description: "AutoBizz Junior Frontend Engineer Assessment Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-linear-to-br from-gray-50 to-gray-100 antialiased`}
      >
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Mobile Header */}
          <header className="md:hidden bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
                <h1 className="text-lg font-bold text-gray-900">AutoBizz</h1>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg transform transition-transform duration-300">
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
              <Link
                href="/"
                className="flex items-center px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-3 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 font-medium transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
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

          {/* Main Content */}
          <main className="flex-1 overflow-x-hidden">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
