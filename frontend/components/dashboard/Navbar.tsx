
"use client";

import { useEffect, useState } from "react";

export default function Navbar() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (
    <div className="bg-white border-b p-5 flex items-center justify-between">

      <h2 className="text-2xl font-semibold ml-4">
        Command Center
      </h2>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">

          {user?.name?.charAt(0) || "U"}

        </div>

        <div>

          <p className="font-medium">
            {user?.name || "User"}
          </p>

          <p className="text-sm text-gray-500 text-center">
            {user?.role || "Member"}
          </p>

        </div>

      </div>

    </div>
  );
}