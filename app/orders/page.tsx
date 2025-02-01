"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@/lib/fetchOrder";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import DashboardLayout from "../layout";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
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

  return (
    <DashboardLayout>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Orders</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border p-3 text-left whitespace-nowrap">Customer</th>
                <th className="border p-3 text-left whitespace-nowrap">Total</th>
                <th className="border p-3 text-left whitespace-nowrap">Status</th>
                <th className="border p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-3 whitespace-nowrap">
                    {order.user.firstName} {order.user.lastName}
                  </td>
                  <td className="border p-3 whitespace-nowrap">${order.total}</td>
                  <td className="border p-3 whitespace-nowrap">{order.status}</td>
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
                <strong>Customer:</strong> {selectedOrder.user.firstName} {selectedOrder.user.lastName}
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
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </p>
              <h3 className="font-bold mt-4">Items:</h3>
              <ul>
                {selectedOrder.cart.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} - {item.quantity} pcs
                  </li>
                ))}
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
