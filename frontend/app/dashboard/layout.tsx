// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const router = useRouter();

//   useEffect(() => {

//     const token =
//       localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//     }

//   }, []);

//   return (
//     <div>
//       {children}
//     </div>
//   );
// }

"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, []);

  return (
    <div className="flex bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}