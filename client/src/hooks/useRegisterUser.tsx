import { useState } from "react";

export const useRegisterUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const validateInputs = () => {
      const { username, email, password, confirmPassword } = userData;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (username.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }

      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
    };

    try {
      validateInputs();
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5000/api/users/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, error, loading };
};
