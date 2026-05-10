"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import toast from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      toast.success("Login successful");

      router.push("/dashboard");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          SprintIQ Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-500 mt-5">

            Don't have an account?

            <a
              href="/register"
              className="text-indigo-600 font-medium ml-1"
            >
              Register
            </a>

          </p>

        </form>

      </div>
    </div>
  );
}