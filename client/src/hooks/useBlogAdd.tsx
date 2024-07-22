import { getToken } from "@/utils/tokenUtils";
import { useState } from "react";

export const useBlogAdd = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addBlog = async (blogData: {
    title: string;
    context: string;
    userId: number;
    author: string;
  }) => {
    const validateInputs = () => {
      const { title, context, userId, author } = blogData;

      if (title.length < 10) {
        console.log("Title must be at least 10 characters long");
        throw new Error("Title must be at least 10 characters long");
      }

      if (context.length < 10) {
        console.log("Context must be at least 10 characters long");
        throw new Error("Context must be at least 10 characters long");
      }

      if (author.length < 3) {
        throw new Error("Invalid Author");
      }

      if (userId < 1) {
        throw new Error("Invalid User Id");
      }
    };

    try {
      validateInputs();
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        "http://localhost:5000/api/blogs/createBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogData),
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

  return { addBlog, error, loading };
};
