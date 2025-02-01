"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@/lib/fetchOrder";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../layout";

export default function CustomersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
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
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === "All" || order.status === filterStatus) &&
      (order.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Customers
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-10 text-white bg-black font-bold border rounded-md w-full"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <FaSearch />
            </span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-md bg-black text-white font-semibold"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border p-3 text-left whitespace-nowrap">Customer</th>
                <th className="border p-3 text-left whitespace-nowrap">Address</th>
                <th className="border p-3 text-left whitespace-nowrap">Total</th>
                <th className="border p-3 text-left whitespace-nowrap">Status</th>
                <th className="border p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-3 whitespace-nowrap">
                    {order.user.firstName} {order.user.lastName}
                  </td>
                  <td className="border p-3 whitespace-nowrap">{order.user.address}</td>
                  <td className="border p-3 whitespace-nowrap">${order.total}</td>
                  <td
                    className={`border p-3 whitespace-nowrap ${
                      order.status === "Shipped"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-600"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border p-3 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-black text-white w-full max-w-lg h-auto p-9 rounded-lg overflow-y-auto">
              <h2 className="text-xl font-bold">Order Details</h2>
              <p>
                <strong>Customer:</strong>{" "}
                {selectedOrder.user.firstName} {selectedOrder.user.lastName}
              </p>
              <p>
                <strong>Total:</strong> ${selectedOrder.total}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.user.address}
              </p>
              <p>
                <strong>City:</strong> {selectedOrder.user.city}
              </p>
              <p>
                <strong>Postal Code:</strong> {selectedOrder.user.postalCode}
              </p>
              <h3 className="font-bold mt-4">Items:</h3>
              <ul className="list-disc pl-5">
                {selectedOrder.cart.map(
                  (item: { name: string; quantity: number | string }, index: number) => (
                    <li key={index}>
                      {item.name} - {item.quantity} pcs
                    </li>
                  )
                )}
              </ul>
              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
