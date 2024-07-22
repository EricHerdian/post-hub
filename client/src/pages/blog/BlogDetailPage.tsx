"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBlogDetail from "@/hooks/useBlogDetail";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetailPage = ({ id, userId }: { id: string; userId: number }) => {
  const router = useRouter();
  const { updateBlog, deleteBlog, blog, error, loading } = useBlogDetail(
    id,
    userId
  );
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  useEffect(() => {
    setTitle(blog?.title || "");
    setContext(blog?.context || "");
  }, [blog]);

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const blogId = parseInt(id);
    try {
      await updateBlog({ id: blogId, title, context, userId });
      alert("Blog update successfully");
      router.push("/blog");
    } catch (error: any) {
      console.error("Failed to edit blog", error);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const blogId = parseInt(id);
    try {
      await deleteBlog({ id: blogId, userId });
      alert("Blog deleted successfully");
      router.push("/blog");
    } catch (error: any) {
      console.error("Failed to delete blog", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="m-5 sm:m-8 bg-neutral-900 text-neutral-50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Blog</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[180px] sm:min-h-[280px] flex flex-col gap-2 sm:gap-5">
        <div className="w-full">
          <Label className="text-xl">Title</Label>
          <Input
            type="text"
            defaultValue={blog?.title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 bg-transparent text-lg"
          />
        </div>
        <div className="w-full">
          <Label className="text-xl">Context</Label>
          <Input
            type="text"
            defaultValue={blog?.context}
            placeholder="Context"
            onChange={(e) => setContext(e.target.value)}
            className="mt-2 bg-transparent text-lg"
          />
        </div>
      </CardContent>
      {!error && (
        <CardFooter className="mt-5 sm:mt-10 flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto px-5 sm:px-8 py-5 bg-red-700 hover:bg-red-600 text-xl text-white transition-colors duration-200"
          >
            Delete
          </Button>
          <Button
            onClick={handleEdit}
            disabled={loading}
            className="w-full sm:w-auto px-5 sm:px-8 py-5 bg-neutral-50 hover:bg-neutral-200 text-xl text-black transition-colors duration-200"
          >
            Edit
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BlogDetailPage;
