"use client";

import { getToken } from "@/utils/tokenUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useVerifyToken = (unauthorizedPath?: string, authorizedPath?: string) => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("http://localhost:5000/api/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setUserId(data.userId);
        setUsername(data.username);

        // Token available and valid
        router.push(authorizedPath || "/blog");
      } catch (error) {
        // Token not available or invalid
        console.error(error);
        router.push(unauthorizedPath || "/");
      }
    };

    verifyToken();
  }, [router, unauthorizedPath, authorizedPath]);

  return { userId, username };
};

export default useVerifyToken;
