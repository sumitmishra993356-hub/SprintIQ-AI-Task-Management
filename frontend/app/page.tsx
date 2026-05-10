"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

const router = useRouter();

const handleChange = () => {
   router.push("/login");
};

 return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
    <h1 className="text-4xl font-bold mb-4">
      Welcome to SprintIQ
    </h1>
    <p className="text-lg text-gray-600">
      Your ultimate project management tool.
    </p>
    <p>please login to continue</p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      onClick={handleChange}
    >
      Login
    </button>
  </div>
);
}
