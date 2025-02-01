"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import { isAuthenticated } from "@/lib/auth";
import DashboardLayout from "../layout";

export default function AnalyticsPage() {
  const router = useRouter();
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales ($)",
        data: [500, 1200, 2200, 3500, totalRevenue],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
          Sales Performance
        </h2>
        <Line data={salesData} />
      </div>
    </DashboardLayout>
  );
}
