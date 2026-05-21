"use client";

import { useState } from "react";
import { UserProfile } from "../../types/userProfile";

export type RegisterStep = "form" | "code" | "success";

export function UseRegister() {
  const [step, setStep]       = useState<RegisterStep>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [code, setCode]       = useState("");
  const [formData, setFormData] = useState<UserProfile | null>(null);

  async function submitForm(data: UserProfile) {
    setLoading(true);
    setError(null);
    try {
      // await authService.register(data)
      await new Promise((r) => setTimeout(r, 1000));
      setFormData(data);
      setStep("code");
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function submitCode() {
    if (!code.trim()) {
      setError("Digite o código recebido por e-mail.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // await authService.verifyCode({ email: formData?.email, code })
      await new Promise((r) => setTimeout(r, 1000));
      setStep("success");
    } catch {
      setError("Código inválido. Verifique seu e-mail.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setStep("form");
    setCode("");
    setFormData(null);
    setError(null);
  }

  return { step, loading, error, code, setCode, submitForm, submitCode, resetForm, formData };
}