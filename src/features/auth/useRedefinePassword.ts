"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface RedefinePasswordFormData {
  novaSenha: string;
  repetirSenha: string;
}

export interface RedefinePasswordErrors {
  novaSenha?: string;
  repetirSenha?: string;
}

export const SECURITY_RULES = [
  {
    test: (v: string) => v.length >= 8,
    label: "8+ dígitos",
  },
  {
    test: (v: string) =>
      /[a-zA-Z]/.test(v) &&
      /[0-9]/.test(v) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
    label: "Letra, número e caractere especial (!,@,#…)",
  },
  {
    test: (v: string) =>
      !/(012|123|234|345|456|567|678|789|890)/.test(v),
    label: "Não use números sequenciais. Ex: 1234",
  },
  {
    test: (v: string) => !/\b(nome|name|cpf)\b/i.test(v),
    label: "Não use dados pessoais. Ex: Nome, CPF",
  },
];

export function validate(
  data: RedefinePasswordFormData
): RedefinePasswordErrors {
  const errors: RedefinePasswordErrors = {};

  if (!data.novaSenha.trim()) {
    errors.novaSenha = "A senha é obrigatória.";
  } else if (data.novaSenha.length < 8) {
    errors.novaSenha = "A senha deve ter pelo menos 8 caracteres.";
  } else if (
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(data.novaSenha)
  ) {
    errors.novaSenha = "Inclua pelo menos um caractere especial (!,@,#…).";
  }

  if (!data.repetirSenha.trim()) {
    errors.repetirSenha = "Confirme sua senha.";
  } else if (data.novaSenha !== data.repetirSenha) {
    errors.repetirSenha = "As senhas não coincidem.";
  }

  return errors;
}

export function useRedefinePassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleRedefine(data: RedefinePasswordFormData) {
    setLoading(true);
    setError(null);
    try {
      // substitua pela sua chamada real
      // await authService.redefinePassword(data);
      await new Promise((r) => setTimeout(r, 1000)); // simula request
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Não foi possível redefinir a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return { handleRedefine, loading, error, success };
}