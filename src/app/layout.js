import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Sidebar from "./Sidebar"; // <-- NEW

import { HiMenuAlt3 } from "react-icons/hi";

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
                <HiMenuAlt3 className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </header>

          {/* Sidebar (separated component) */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-x-hidden">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
