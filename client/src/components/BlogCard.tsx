"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/types";
import { useRouter } from "next/navigation";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const router = useRouter();

  return (
    <Card className="bg-neutral-900 text-neutral-50">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>By {blog.author}</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px] max-h-[100px] sm:min-h-[150px] sm:max-h-[150px] overflow-auto">
        <p>{blog.context}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => router.push(`/blog/detail?id=${blog.id}`)}
          className="px-5 sm:px-8 py-5 bg-neutral-50 hover:bg-neutral-200 text-xl text-black transition-colors duration-200"
        >
          Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
