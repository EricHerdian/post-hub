"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";
import { Blog } from "@/types";
import { useRouter } from "next/navigation";

const BlogPage = () => {
  const { blogs, error, loading } = useBlog();
  const router = useRouter();

  return (
    <div className="w-full p-5 sm:p-8 flex flex-wrap gap-5 sm:gap-10">
      <div className="w-full flex justify-between items-center">
        <div className="text-2xl font-semibold">Blog List</div>
        <Button
          onClick={() => router.push("/blog/add")}
          className="px-5 py-6 flex flex-row gap-2 bg-neutral-900 text-xl text-white rounded-md hover:bg-neutral-800"
        >
          <span>Add</span>
          <span className="hidden sm:block">Blog</span>
        </Button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!blogs.length && <div>No blogs found</div>}
      <div className="w-full sm:px-2 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {blogs.map((blog: Blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
