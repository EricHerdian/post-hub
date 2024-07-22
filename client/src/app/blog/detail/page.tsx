"use client";

import useVerifyToken from "@/hooks/useVerifyToken";
import BlogDetailPage from "@/pages/blog/BlogDetailPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DetailBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "";

  useEffect(() => {
    if (!id) {
      router.push("/blog");
    }
  }, []);

  const { userId } = useVerifyToken("/login", `/blog/detail?id=${id}`); // Redirect to current page if authenticated

  return (
    <main className="pt-14 sm:pt-[75px]">
      <BlogDetailPage id={id} userId={userId || 0} />
    </main>
  );
};

export default DetailBlog;
