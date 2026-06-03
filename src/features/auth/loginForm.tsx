"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  FormHelperText,
} from "@mui/material";
import { Button } from "@/components/ui/Button";

import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBackIos } from "@mui/icons-material";
import { useLogin } from "./useLogin";

export function LoginForm() {
  const router = useRouter();
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // ── Validação ──────────────────────────────────────────
  const [touched, setTouched] = useState({ email: false, password: false });

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailEmpty   = touched.email    && email.trim() === "";
  const emailInvalid = touched.email    && email.trim() !== "" && !EMAIL_REGEX.test(email.trim());
  const emailError   = emailEmpty || emailInvalid;

  const passwordError = touched.password && password.trim() === "";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email.trim() || !EMAIL_REGEX.test(email.trim()) || !password.trim()) return;
    handleLogin({ email, password });
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: { xs: "#fff", sm: "#e8eaf0" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "center" },
        px: { xs: 0, sm: 2 },
        py: { xs: 0, sm: 4 },
      }}
    >

      {/* ── Card ── */}
      <Box
        sx={{
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
        }}
      >
        <IconButton onClick={() => router.back()} size="small" sx={{ mb: 1, ml: -1, color: "#1a2744" }}>
          <ArrowBackIos fontSize="small" />
        </IconButton>

        {/* Título */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1a2744", whiteSpace: "nowrap" }}>
            Login
          </Typography>
          <Box sx={{ flex: 1, height: "1.5px", bgcolor: "#d0d5dd" }} />
        </Box>

        {/* Erro global da API */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} noValidate>

          {/* E-mail */}
          <Typography sx={labelSx}>Digite seu e-mail</Typography>
          <FormControl fullWidth size="small" error={emailError}>
            <OutlinedInput
              type="email"
              placeholder="aluno@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              sx={inputSx(emailError)}
            />
            {emailEmpty   && <FormHelperText>O e-mail é obrigatório.</FormHelperText>}
            {emailInvalid && <FormHelperText>Digite um e-mail válido.</FormHelperText>}
          </FormControl>

          {/* Senha */}
          <Typography sx={{ ...labelSx, mt: 2.5 }}>Digite sua senha</Typography>
          <FormControl fullWidth size="small" error={passwordError}>
            <OutlinedInput
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              sx={inputSx(passwordError)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((p) => !p)} edge="end" size="small" sx={{ color: "#aaa" }}>
                    {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError && (
              <FormHelperText>A senha é obrigatória.</FormHelperText>
            )}
          </FormControl>

          {/* ── Esqueceu sua senha? ── */}
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Typography
              component="span"
              onClick={() => router.push("/forgot-password")}
              sx={{
                fontSize: 13,
                color: "#1a2744",
                fontWeight: 600,
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": { color: "#3dd6c8" },
              }}
            >
              Esqueceu sua senha?
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            sx={{
              mt: 2,
              py: 1.4,
              borderRadius: 50,
              bgcolor: "#008963",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 15,
              "&:hover": { bgcolor: "#76E3BC" },
              "&.Mui-disabled": { bgcolor: "#b0b0b0", color: "#ffffff" },
            }}
          >
            Entrar

          </Button>

          {/* ── Primeiro acesso? Criar conta. ── */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography component="span" sx={{ fontSize: 13, color: "#555" }}>
              Primeiro acesso?{" "}
            </Typography>
            <Typography
              component="span"
              onClick={() => router.push("/register")}
              sx={{
                fontSize: 13,
                color: "#1a2744",
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": { color: "#3dd6c8" },
              }}
            >
              Criar conta.
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

// ── Estilos reutilizáveis ─────────────────────────────────
const labelSx = {
  fontSize: 13,
  fontWeight: 600,
  color: "#1a2744",
  mb: 0.5,
};

const inputSx = (hasError: boolean) => ({
  borderRadius: 2,
  bgcolor: "#fff",
  "& fieldset": { borderColor: hasError ? "#d32f2f" : "#d0d5dd" },
  "&:hover fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
  "&.Mui-focused fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
  "& input": { fontSize: 14 },
});