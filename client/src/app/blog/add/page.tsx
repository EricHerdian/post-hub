"use client";

import useVerifyToken from "@/hooks/useVerifyToken";
import AddBlogPage from "@/pages/blog/AddBlogPage";

const AddBlog = () => {
  const { userId, username } = useVerifyToken("/login", "/blog/add"); // Redirect to current page if authenticated

  return (
    <main className="pt-14 sm:pt-[75px]">
      <AddBlogPage userId={userId as number} author={username as string} />
    </main>
  );
};

export default AddBlog;
