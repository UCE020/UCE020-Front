"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  FormHelperText,
} from "@mui/material";
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

  const emailError    = touched.email    && email.trim() === "";
  const passwordError = touched.password && password.trim() === "";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email.trim() || !password.trim()) return;
    handleLogin({ email, password });
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#e8eaf0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ bgcolor: "#1a2744", px: 3, py: 2, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 36, height: 36,
            borderRadius: "10px",
            border: "2.5px solid #3dd6c8",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 20, color: "#3dd6c8",
          }}
        >
          K
        </Box>
      </Box>

      {/* ── Card ── */}
      <Box
        sx={{
          mx: "auto", mt: 3, mb: 4,
          width: "100%", maxWidth: 420,
          bgcolor: "#fff",
          borderRadius: 4,
          px: 3, py: 4,
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
            {emailError && (
              <FormHelperText>O e-mail é obrigatório.</FormHelperText>
            )}
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
              onClick={() => router.push("/esqueci-senha")}
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

          {/* ── Entrar ── */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.4,
              borderRadius: 50,
              bgcolor: "#3dd6c8",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              textTransform: "none",
              "&:hover": { bgcolor: "#2bbfb2" },
              "&.Mui-disabled": { bgcolor: "#a8ede9", color: "#fff" },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Entrar"}
          </Button>

          {/* ── Primeiro acesso? Criar conta. ── */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography component="span" sx={{ fontSize: 13, color: "#555" }}>
              Primeiro acesso?{" "}
            </Typography>
            <Typography
              component="span"
              onClick={() => router.push("/cadastro")}
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