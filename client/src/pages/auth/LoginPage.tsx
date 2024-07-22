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
import { useLoginUser } from "@/hooks/useLoginUser";
import { setToken } from "@/utils/tokenUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { loginUser, error, loading } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      const { token } = response;

      // Save token in local storage
      setToken(token);

      // Redirect to home
      router.push("/blog");
    } catch (error: any) {
      console.error("Failed to login", error);
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center">
      <Card className="w-[90%] sm:w-1/2 bg-neutral-900 text-neutral-50">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-2 sm:gap-5">
            <div>
              <Label className="text-xl">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-transparent text-lg"
                required
              />
            </div>
            <div>
              <Label className="text-xl">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-transparent text-lg"
                required
              />
            </div>
          </CardContent>
          {error && (
            <div className="text-md sm:text-lg text-red-500 text-center animate-pulse">
              {error}
            </div>
          )}
          <CardFooter className="mt-6 flex flex-col justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-5 sm:px-8 py-5 bg-neutral-50 hover:bg-neutral-200 text-xl text-black transition-colors duration-200"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
        <div className="w-full pb-6 flex justify-center">
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-md">
            <p>Don't have an account?</p>
            <Button
              onClick={() => {
                router.push("/register");
              }}
              variant="link"
              className="p-0 text-neutral-50"
            >
              Sing Up
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
