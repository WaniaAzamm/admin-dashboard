"use client";

import { useEffect, useState } from "react";
import { FiPackage, FiUsers, FiDollarSign } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getOrders } from "@/lib/fetchOrder";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import DashboardLayout from "../layout";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);

      const revenue = data.reduce(
        (acc: number, order: { total: number }) => acc + order.total,
        0
      );
      const uniqueCustomers = new Set(
        data.map((order: { user: { email: string } }) => order.user.email)
      ).size;

      setTotalRevenue(revenue);
      setTotalCustomers(uniqueCustomers);
    }
    fetchOrders();
  }, []);

  const chartData = {
    labels: orders.map((_, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: "Sales",
        data: orders.map((order) => order.total),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.5)",
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow flex items-center">
          <FiPackage size={30} />
          <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">
            Total Orders
          </span>
          <p className="ml-auto text-xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow flex items-center">
          <FiDollarSign size={30} />
          <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">
            Total Revenue
          </span>
          <p className="ml-auto text-xl font-bold">${totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow flex items-center">
          <FiUsers size={30} />
          <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">
            Total Customers
          </span>
          <p className="ml-auto text-xl font-bold">{orders.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow mt-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-3">
          Recent Orders
        </h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Total</th>
              <th className="border p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td className="border p-3">
                  {order.user.firstName} {order.user.lastName}
                </td>
                <td className="border p-3">${order.total}</td>
                <td className="border p-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow mt-6">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
          Sales Chart
        </h2>
        <Line data={chartData} />
      </div>
    </DashboardLayout>
  );
}
