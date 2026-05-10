"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import toast from "react-hot-toast";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
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

      toast.success("Registration successful");

      router.push("/login");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          SprintIQ Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

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
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">

            Already have an account?

            <a
              href="/login"
              className="text-indigo-600 font-medium ml-1"
            >
              Login
            </a>

          </p>

        </form>

      </div>
    </div>
  );
}