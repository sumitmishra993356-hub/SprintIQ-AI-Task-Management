"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];


export default function Sidebar() {

  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        SprintIQ
      </h1>

      <div className="space-y-3">

        {links.map((link) => {

          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}

      </div>
      <button
        onClick={logout}
        className="mt-10 bg-red-500 hover:bg-red-600 transition text-white w-full py-3 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}