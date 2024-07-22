"use client";

import useVerifyToken from "@/hooks/useVerifyToken";
import LoginPage from "@/pages/auth/LoginPage";

const Login = () => {
  useVerifyToken("/login", "/blog"); // Redirect to blog if authenticated

  return (
    <main className="pt-14 sm:pt-[75px]">
      <LoginPage />
    </main>
  );
};

export default Login;
