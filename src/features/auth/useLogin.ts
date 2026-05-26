"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // varial data vai ser mockada?
  async function handleLogin(data: LoginFormData) {
    setLoading(true);
    setError(null);
    try {
      // substitua pela sua chamada real
      // await authService.login(data);
      await new Promise((r) => setTimeout(r, 1000)); // simula request
      router.push("/");
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}