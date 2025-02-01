"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiLock } from "react-icons/fi";
import { env } from "process";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;

  const handleLogin = () => {
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminName", "Wania Azam"); 
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Admin Login
        </h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-400">
            <FiUser />
          </span>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <span className="absolute left-3 top-3 text-gray-400">
            <FiLock />
          </span>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 pl-10 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
