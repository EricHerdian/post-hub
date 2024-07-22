"use client";

import useVerifyToken from "@/hooks/useVerifyToken";
import RegisterPage from "@/pages/auth/RegisterPage";

const Register = () => {
  useVerifyToken("/register", "/blog"); // Redirect to blog if authenticated

  return (
    <main className="pt-14 sm:pt-[75px]">
      <RegisterPage />
    </main>
  );
};

export default Register;
