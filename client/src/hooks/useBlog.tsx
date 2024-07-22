import { Blog } from "@/types";
import { getToken } from "@/utils/tokenUtils";
import { useEffect, useState } from "react";

export const useBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getToken();
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          "http://localhost:5000/api/blogs/getBlogs",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, error, loading };
};
