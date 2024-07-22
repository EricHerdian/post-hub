import { Blog } from "@/types";
import { getToken } from "@/utils/tokenUtils";
import { useEffect, useState } from "react";

const useBlogDetail = (id: string, userId: number) => {
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateBlog = async (updatedBlog: {
    id: number;
    title: string;
    context: string;
    userId: number;
  }) => {
    const validateInputs = () => {
      const { title, context } = updatedBlog;

      if (title.length < 10) {
        throw new Error("Title must be at least 10 characters long");
      }

      if (context.length < 10) {
        throw new Error("Context must be at least 10 characters long");
      }
    };

    try {
      validateInputs();
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        "http://localhost:5000/api/blogs/updateBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBlog),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (deletedBlog: { id: number; userId: number }) => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        "http://localhost:5000/api/blogs/deleteBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(deletedBlog),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getToken();
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          `http://localhost:5000/api/blogs/getBlog?id=${id}`,
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
        setBlog(data);

        // Check if the blog belongs to the current user
        if (data.userId !== userId) {
          throw new Error("Unauthorized");
        } else {
          setError("");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, userId]);

  return { updateBlog, deleteBlog, blog, error, loading };
};

export default useBlogDetail;
