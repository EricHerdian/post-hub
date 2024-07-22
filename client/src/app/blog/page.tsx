"use client";

import useVerifyToken from "@/hooks/useVerifyToken";
import BlogPage from "@/pages/blog/BlogPage";

const Blog = () => {
  useVerifyToken("/login", "/blog"); // Redirect to login if not authenticated

  return (
    <main className="pt-14 sm:pt-[75px]">
      <BlogPage />
    </main>
  );
};

export default Blog;
