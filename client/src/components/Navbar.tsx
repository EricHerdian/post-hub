"use client";

import { clearToken, getToken } from "@/utils/tokenUtils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    setToken(token || null);
  }, [pathName]);

  const handleLogOut = () => {
    clearToken();
    setToken(null);
    router.push("/");
  };

  return (
    <div className="fixed w-full px-5 py-3 sm:px-10 sm:py-5 bg-neutral-900 z-50">
      <div className="flex justify-between items-center">
        <span className="text-2xl sm:text-3xl text-white">POST-HUB</span>
        {token && (
          <span
            onClick={handleLogOut}
            className="text-md text-white hover:underline cursor-pointer"
          >
            Log Out
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
