"use client";

import { JSX, useState } from "react";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { TbFileAnalytics } from "react-icons/tb";
import Link from "next/link";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-900 text-white p-5 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } h-screen`}
    >
      <div className="flex items-center justify-between">
        {!collapsed && <h1 className="text-2xl font-bold">Furniva</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
        >
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2">
          <SidebarItem
            collapsed={collapsed}
            href="/dashboard"
            icon={<FiHome size={20} />}
            label="Dashboard"
          />
          <SidebarItem
            collapsed={collapsed}
            href="/orders"
            icon={<FiPackage size={20} />}
            label="Orders"
          />
          <SidebarItem
            collapsed={collapsed}
            href="/analytics"
            icon={<TbFileAnalytics size={20} />}
            label="Analytics"
          />
          <SidebarItem
            collapsed={collapsed}
            href="/customer"
            icon={<FiUsers size={20} />}
            label="Customers"
          />
          <SidebarItem
            collapsed={collapsed}
            href="#"
            icon={<FiSettings size={20} />}
            label="Settings"
          />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-3 hover:bg-gray-700 rounded transition-all duration-300"
      >
        <span className="text-gray-300">{icon}</span>
        {!collapsed && <span className="ml-3 text-lg">{label}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
