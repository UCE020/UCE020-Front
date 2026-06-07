"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Typography, IconButton,
  InputAdornment, Alert,
  FormControl, OutlinedInput, FormHelperText,
} from "@mui/material";
import { Button } from "@/components/ui/Button";
import { Visibility, VisibilityOff, ArrowBackIos, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRegister } from "../hooks/useRegister";
import { UserRegister } from "../types/userRegister";

// ── Requisitos de senha segura ───────────────────────────
const SECURITY_RULES = [
  { label: "Mínimo de 8 caracteres",           test: (v: string) => v.length >= 8 },
  { label: "Pelo menos uma letra maiúscula",   test: (v: string) => /[A-Z]/.test(v) },
  { label: "Pelo menos uma letra minúscula",   test: (v: string) => /[a-z]/.test(v) },
  { label: "Pelo menos um número",             test: (v: string) => /[0-9]/.test(v) },
  { label: "Pelo menos um caractere especial", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

// ── Estilos reutilizáveis ────────────────────────────────
const labelSx = {
  fontSize: 13,
  fontWeight: 600,
  color: "#1a2744",
  mb: 0.5,
};

const inputSx = (hasError = false) => ({
  borderRadius: 2,
  bgcolor: "#fff",
  "& fieldset": { borderColor: hasError ? "#d32f2f" : "#d0d5dd" },
  "&:hover fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
  "&.Mui-focused fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
  "& input": { fontSize: 14 },
});

// ── Subcomponente: campo com label ───────────────────────
function Field({
  label, value, onChange, type = "text",
  placeholder, error, helperText, endAdornment, onBlur, mt,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  type?: string; placeholder?: string;
  error?: boolean; helperText?: string;
  endAdornment?: React.ReactNode;
  onBlur?: () => void;
  mt?: number;
}) {
  return (
    <Box>
      <Typography sx={{ ...labelSx, mt: mt ?? 0 }}>{label}</Typography>
      <FormControl fullWidth size="small" error={error}>
        <OutlinedInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          endAdornment={endAdornment}
          sx={inputSx(error)}
        />
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

// ── ETAPA 1: Formulário ──────────────────────────────────
function StepForm({ onSubmit, loading, error }: {
  onSubmit: (data: UserRegister) => void;
  loading: boolean;
  error: string | null;
}) {
  const router = useRouter();
  const [fields, setFields] = useState({
    nome: "", email: "",
    senha: "", confirmaSenha: "",
  });
  const [showSenha, setShowSenha]       = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [touched, setTouched]           = useState<Record<string, boolean>>({});

  const set = (k: string) => (v: string) =>
    setFields((f) => ({ ...f, [k]: v }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));
  const err  = (k: string) => touched[k] && fields[k as keyof typeof fields].trim() === "";

  const validateEmail = (email: string) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const senhasDiferem =
    touched.confirmaSenha &&
    fields.confirmaSenha !== "" &&
    fields.senha !== fields.confirmaSenha;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(fields).map((k) => [k, true])));
    const isEmailValid = validateEmail(fields.email);
    const isSenhaValid = SECURITY_RULES.every((r) => r.test(fields.senha));
    if (Object.values(fields).some((v) => v.trim() === "") || senhasDiferem || !isEmailValid || !isSenhaValid) return;

    const userRegister = {
      name: fields.nome,
      email: fields.email,
      password: fields.senha,
    };
    onSubmit(userRegister);
  }

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <InputAdornment position="end">
      <IconButton onClick={toggle} edge="end" size="small" sx={{ color: "#aaa" }}>
        {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      {/* Nome */}
      <Field label="Nome completo" value={fields.nome} onChange={set("nome")}
             onBlur={blur("nome")} error={err("nome")} helperText="O nome é obrigatório."
             placeholder="Nome Completo" />

      {/* E-mail */}
      <Field label="Digite seu e-mail" value={fields.email} onChange={set("email")} type="email"
             mt={2.5}
             onBlur={blur("email")}
             error={err("email") || (touched.email && !validateEmail(fields.email))}
             helperText={err("email") ? "O e-mail é obrigatório." : "E-mail inválido."}
             placeholder="aluno@email.com" />

      {/* Senha */}
      <Field label="Digite sua senha" value={fields.senha} onChange={set("senha")}
             type={showSenha ? "text" : "password"} mt={2.5}
             onBlur={blur("senha")} error={err("senha")} helperText="A senha é obrigatória."
             endAdornment={eyeBtn(showSenha, () => setShowSenha((p) => !p))} />

      {/* ── Dicas de segurança ── */}
      {touched.senha && (
        <Box sx={{
          mt: 1.5, mb: 1, p: 1.5,
          bgcolor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 2,
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1a2744", mb: 0.75 }}>
            Requisitos de senha:
          </Typography>
          {SECURITY_RULES.map((rule) => {
            const valid = rule.test(fields.senha);
            return (
              <Box key={rule.label} sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, mb: 0.5 }}>
                {valid
                  ? <CheckCircle sx={{ fontSize: 14, color: "#3dd6c8", mt: "1px", flexShrink: 0 }} />
                  : <RadioButtonUnchecked sx={{ fontSize: 14, color: "#cbd5e1", mt: "1px", flexShrink: 0 }} />
                }
                <Typography sx={{ fontSize: 12, color: valid ? "#1a2744" : "#94a3b8", lineHeight: 1.4 }}>
                  {rule.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      {/* Confirma senha */}
      <Field label="Confirme sua senha" value={fields.confirmaSenha} onChange={set("confirmaSenha")}
             type={showConfirma ? "text" : "password"} mt={2.5}
             onBlur={blur("confirmaSenha")}
             error={err("confirmaSenha") || senhasDiferem}
             helperText={senhasDiferem ? "As senhas não coincidem." : "Obrigatório."}
             endAdornment={eyeBtn(showConfirma, () => setShowConfirma((p) => !p))} />

      <Button
        type="submit"
        fullWidth
        isLoading={loading}
        sx={{
          mt: 3,
          py: 1.4,
          borderRadius: 50,
          bgcolor: "#1a2744",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 15,
          "&:hover": { bgcolor: "#111c33" },
          "&.Mui-disabled": { bgcolor: "#b0b0b0", color: "#ffffff" },
        }}
      >
        Cadastrar
      </Button>

      {/* Já tem conta? */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography component="span" sx={{ fontSize: 13, color: "#555" }}>
          Já tem conta?{" "}
        </Typography>
        <Typography
          component="span"
          onClick={() => { router.push("/login") }}
          sx={{
            fontSize: 13,
            color: "#1a2744",
            fontWeight: 700,
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": { color: "#3dd6c8" },
          }}
        >
          Fazer login.
        </Typography>
      </Box>
    </Box>
  );
}

// ── ETAPA 2: Código de confirmação ───────────────────────
function StepCode({ code, setCode, onSubmit, loading, error }: {
  code: string; setCode: (v: string) => void;
  onSubmit: () => void; loading: boolean; error: string | null;
}) {
  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box sx={{
          width: 90, height: 90, borderRadius: "20px",
          border: "3px solid #3dd6c8",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 48, color: "#3dd6c8",
        }}>A</Box>
      </Box>

      <Typography sx={{ textAlign: "center", color: "#1a2744", fontWeight: 600, mb: 2.5, fontSize: 14 }}>
        Para finalizar o seu cadastro, informe o código recebido através do e-mail
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      <Typography sx={labelSx}>Código de Confirmação</Typography>
      <FormControl fullWidth size="small">
        <OutlinedInput
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="000000"
          sx={{ ...inputSx(), borderRadius: 2, mb: 3, letterSpacing: 4, fontSize: 16 }}
        />
      </FormControl>

      <Button
        fullWidth
        onClick={onSubmit}
        disabled={loading || code.trim() === ""}
        isLoading={loading}
        sx={{
          py: 1.4,
          borderRadius: 50,
          bgcolor: "#3dd6c8",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 15,
          "&:hover": { bgcolor: "#2bbfb2" },
          "&.Mui-disabled": { bgcolor: "#b0b0b0", color: "#ffffff" },
        }}
      >
         Enviar
      </Button>
    </Box>
  );
}

// ── ETAPA 3: Sucesso ─────────────────────────────────────
function StepSuccess({ onAccess }: { onAccess: () => void }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{
        width: 90, height: 90, borderRadius: "20px",
        border: "3px solid #3dd6c8",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 48, color: "#3dd6c8", mb: 3,
      }}>A</Box>

      <Typography sx={{ color: "#1a2744", fontWeight: 600, mb: 4, fontSize: 15 }}>
        E-mail confirmado com sucesso
      </Typography>

      <Button
        fullWidth
        onClick={onAccess}
        sx={{
          py: 1.4,
          borderRadius: 50,
          bgcolor: "#1a2744",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 15,
          "&:hover": { bgcolor: "#111c33" },
        }}
      >
        Acessar Minha Conta
      </Button>
    </Box>
  );
}

// ── Componente principal ─────────────────────────────────
export function RegisterForm() {
  const router = useRouter();
  const { step, isLoading, error, code, setCode, submitForm, submitCode, resetForm } = useRegister();

  function handleBack() {
    if (step === "form") router.back();
    if (step === "code") resetForm();
  }

  return (
    <Box sx={{
      minHeight: "100dvh",
      bgcolor: { xs: "#fff", sm: "#e8eaf0" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: { xs: "flex-start", sm: "center" },
      px: { xs: 0, sm: 2 },
      py: { xs: 0, sm: 4 },
    }}>
      <Box sx={{
        mx: "auto",
        mt: { xs: 0, sm: 3 },
        mb: { xs: 0, sm: 4 },
        width: "100%",
        maxWidth: { xs: "100%", sm: 420 },
        minHeight: { xs: "100dvh", sm: "auto" },
        bgcolor: "#fff",
        borderRadius: { xs: 0, sm: 4 },
        px: { xs: 3, sm: 3 },
        py: { xs: 5, sm: 4 },
        boxShadow: { xs: "none", sm: "0 4px 24px rgba(0,0,0,0.08)" },
      }}>
        {/* Botão voltar */}
        {step !== "success" && (
          <IconButton onClick={handleBack} size="small" sx={{ mb: 1, ml: -1, color: "#1a2744" }}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
        )}

        {/* Título com linha divisória */}
        {step === "form" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1a2744", whiteSpace: "nowrap" }}>
              Cadastro
            </Typography>
            <Box sx={{ flex: 1, height: "1.5px", bgcolor: "#d0d5dd" }} />
          </Box>
        )}

        {step === "form"    && <StepForm    onSubmit={submitForm} loading={isLoading} error={error} />}
        {step === "code"    && <StepCode    code={code} setCode={setCode} onSubmit={submitCode} loading={isLoading} error={error} />}
        {step === "success" && <StepSuccess onAccess={() => router.push("/home")} />}
      </Box>
    </Box>
  );
}
