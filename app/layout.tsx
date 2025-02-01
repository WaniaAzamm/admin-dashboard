"use client";
import "./globals.css"; 
import { useState } from "react";
import Sidebar from "./components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html>
      <body>
        
      
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-auto">
        <header className="md:hidden p-4 bg-gray-100 dark:bg-gray-900 flex items-center">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">Furniva</h1>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 container mx-auto max-w-screen-xl">
          {children}
        </main>
      </div>
    </div>
     </body>
    </html>
  );
}
