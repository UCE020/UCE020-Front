"use client";

import { useState } from "react";

export type RegisterStep = "form" | "code" | "success";

export interface RegisterFormData {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
  nacionalidade: string;
  cpf: string;
}

export function useRegister() {
  const [step, setStep]     = useState<RegisterStep>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [code, setCode]     = useState("");

  async function submitForm(data: RegisterFormData) {
    setLoading(true);
    setError(null);
    try {
      // substitua pela chamada real: await authService.register(data)
      await new Promise((r) => setTimeout(r, 1000));
      setStep("code");
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function submitCode() {
    setLoading(true);
    setError(null);
    try {
      // substitua pela chamada real: await authService.verifyCode(code)
      await new Promise((r) => setTimeout(r, 1000));
      setStep("success");
    } catch {
      setError("Código inválido. Verifique seu e-mail.");
    } finally {
      setLoading(false);
    }
  }

  return { step, loading, error, code, setCode, submitForm, submitCode };
}