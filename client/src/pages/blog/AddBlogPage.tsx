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
import { useBlogAdd } from "@/hooks/useBlogAdd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddBlogPage = ({
  userId,
  author,
}: {
  userId: number;
  author: string;
}) => {
  const router = useRouter();
  const { addBlog, error, loading } = useBlogAdd();
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBlog({ title, context, userId, author });
      alert("Blog added successfully");
      router.push("/blog");
    } catch (error: any) {
      console.error("Failed to add blog", error);
    }
  };

  return (
    <Card className="m-5 sm:m-8 bg-neutral-900 text-neutral-50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Add Blog</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="min-h-[250px] sm:min-h-[320px] flex flex-col gap-2 sm:gap-5">
          {error && (
            <div className="text-md sm:text-lg text-red-500 text-center animate-pulse">
              {error}
            </div>
          )}
          <div className="w-full">
            <Label className="text-xl">Title</Label>
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mt-2 bg-transparent text-lg"
              required
            />
          </div>
          <div className="w-full">
            <Label className="text-xl">Context</Label>
            <Input
              type="text"
              onChange={(e) => setContext(e.target.value)}
              placeholder="Context"
              className="mt-2 bg-transparent text-lg"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="px-5 sm:px-8 py-5 bg-neutral-50 hover:bg-neutral-200 text-xl text-black transition-colors duration-200"
          >
            Add
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddBlogPage;
