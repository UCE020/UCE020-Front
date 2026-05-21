"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Typography, Button, IconButton,
  InputAdornment, CircularProgress, Alert,
  FormControl, OutlinedInput, FormHelperText,
  Checkbox, FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBackIos } from "@mui/icons-material";
import { useRegister } from "./useRegister";
import { UserProfile } from "../../types/userProfile";

// ── Estilos reutilizáveis ────────────────────────────────
const labelSx = { fontSize: 12, fontWeight: 600, color: "#1a2744", mb: 0.5 };

const inputSx = (hasError = false) => ({
  borderRadius: 2,
  bgcolor: "#fff",
  fontSize: 13,
  "& fieldset": { borderColor: hasError ? "#d32f2f" : "#d0d5dd" },
  "&:hover fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
  "&.Mui-focused fieldset": { borderColor: hasError ? "#d32f2f" : "#3dd6c8" },
});

// ── Subcomponente: campo com label ───────────────────────
function Field({
  label, value, onChange, type = "text",
  placeholder, error, helperText, endAdornment, onBlur,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  type?: string; placeholder?: string;
  error?: boolean; helperText?: string;
  endAdornment?: React.ReactNode;
  onBlur?: () => void;
}) {
  return (
    <Box>
      <Typography sx={labelSx}>{label}</Typography>
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

// ── Wrapper comum (header + card) ────────────────────────
function AuthCard({ onBack, children, hideBack = false }: { 
  onBack: () => void; 
  children: React.ReactNode;
  hideBack?: boolean;
}) {
  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#e8eaf0", display: "flex", flexDirection: "column" }}>
      <Box sx={{ bgcolor: "#1a2744", px: 3, py: 2 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "10px",
          border: "2.5px solid #3dd6c8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 20, color: "#3dd6c8",
        }}>A</Box>
      </Box>

      <Box sx={{
        mx: "auto", mt: 3, mb: 4,
        width: "100%", maxWidth: 440,
        bgcolor: "#fff", borderRadius: 4, px: 3, py: 3,
      }}>
        {}
        {!hideBack && (
          <IconButton onClick={onBack} size="small" sx={{ mb: 1, ml: -1, color: "#1a2744" }}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#1a2744", whiteSpace: "nowrap" }}>
            Cadastro
          </Typography>
          <Box sx={{ flex: 1, height: "1.5px", bgcolor: "#d0d5dd" }} />
        </Box>

        {children}
      </Box>
    </Box>
  );
}

// ── ETAPA 1: Formulário ──────────────────────────────────
function StepForm({ onSubmit, loading, error }: {
  onSubmit: (data: UserProfile) => void;
  loading: boolean;
  error: string | null;
}) {
  const [fields, setFields] = useState({
    nome: "", email: "",
    senha: "", confirmaSenha: "", cpf: "",
  });
  const [showSenha, setShowSenha]     = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [touched, setTouched]         = useState<Record<string, boolean>>({});
  const [termos, setTermos]           = useState(false);
  const [termosError, setTermosError] = useState(false);

  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));
  const err  = (k: string) => touched[k] && fields[k as keyof typeof fields].trim() === "";
  const senhasDiferem = touched.confirmaSenha && fields.confirmaSenha !== "" && fields.senha !== fields.confirmaSenha;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(fields).map((k) => [k, true]));
    console.log(fields);
    setTouched(allTouched);
    setTermosError(!termos);
    const hasEmpty = Object.values(fields).some((v) => v.trim() === "");
    if (hasEmpty || !termos || senhasDiferem) return;

    // Mapeia para UserProfile (id vazio pois ainda não existe no backend)
  const userProfile: UserProfile = {
    id: "",
    name: fields.nome,
    email: fields.email,
    cpf: fields.cpf,
    password: fields.senha,
  };
  
    onSubmit(userProfile);
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
      <Box sx={{ mb: 1.5 }}>
        <Field label="Nome"      value={fields.nome}      onChange={set("nome")}
               onBlur={blur("nome")}      error={err("nome")}      helperText="Obrigatório" placeholder="Nome Completo" />
      </Box>

      {/* E-mail */}
      <Box sx={{ mb: 1.5 }}>
        <Field label="E-mail" value={fields.email} onChange={set("email")} type="email"
               onBlur={blur("email")} error={err("email")} helperText="Obrigatório" placeholder="aluno@email.com" />
      </Box>

      {/* Senha + Confirma */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
        <Field label="Digite sua senha" value={fields.senha} onChange={set("senha")}
               type={showSenha ? "text" : "password"} onBlur={blur("senha")}
               error={err("senha")} helperText="Obrigatório"
               endAdornment={eyeBtn(showSenha, () => setShowSenha((p) => !p))} />

        <Box>
          <Field label="Confirme sua senha" value={fields.confirmaSenha} onChange={set("confirmaSenha")}
                 type={showConfirma ? "text" : "password"} onBlur={blur("confirmaSenha")}
                 error={err("confirmaSenha") || senhasDiferem}
                 helperText={senhasDiferem ? "Senhas não coincidem" : "Obrigatório"}
                 endAdornment={eyeBtn(showConfirma, () => setShowConfirma((p) => !p))} />
        </Box>
      </Box>

      {/* CPF */}
      <Box sx={{ mb: 1.5 }}>
        <Field label="CPF *" value={fields.cpf} onChange={set("cpf")}
               onBlur={blur("cpf")} error={err("cpf")} helperText="Obrigatório" placeholder="000.000.000-00" />
      </Box>

      {/* Termos */}
      <FormControlLabel
        control={
          <Checkbox
            checked={termos}
            onChange={(e) => { setTermos(e.target.checked); setTermosError(false); }}
            size="small"
            sx={{ color: termosError ? "#d32f2f" : "#1a2744", "&.Mui-checked": { color: "#3dd6c8" } }}
          />
        }
        label={
          <Typography sx={{ fontSize: 12, color: termosError ? "#d32f2f" : "#555" }}>
            Li e aceito as{" "}
            <Box component="span" sx={{ color: "#3dd6c8", textDecoration: "underline", cursor: "pointer" }}>
              Condições Legais
            </Box>
            {" "}e a{" "}
            <Box component="span" sx={{ color: "#3dd6c8", textDecoration: "underline", cursor: "pointer" }}>
              Política de Privacidade
            </Box>
          </Typography>
        }
      />
      {termosError && (
        <Typography sx={{ fontSize: 11, color: "#d32f2f", ml: 1 }}>
          Você deve aceitar os termos.
        </Typography>
      )}

      <Button type="submit" fullWidth disabled={loading} sx={btnSx("#1a2744", "#111c33")}>
        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Cadastrar"}
      </Button>
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
      {/*Logo grande */}
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

      <Button fullWidth onClick={onSubmit} disabled={loading || code.trim() === ""} sx={btnSx("#3dd6c8", "#2bbfb2")}>
        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Enviar"}
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

      <Button fullWidth onClick={onAccess} sx={btnSx("#1a2744", "#111c33")}>
        Acessar Minha Conta
      </Button>
    </Box>
  );
}

// ── Componente principal ─────────────────────────────────
export function RegisterForm() {
  const router = useRouter();
  const { step, loading, error, code, setCode, submitForm, submitCode, resetForm } = useRegister();

  function handleBack() {
    if (step === "form") router.back();
    if (step === "code") resetForm();
  }

  return (
    <AuthCard onBack={handleBack} hideBack={step === "success"}>
      {step === "form"    && <StepForm    onSubmit={submitForm} loading={loading} error={error} />}
      {step === "code"    && <StepCode    code={code} setCode={setCode} onSubmit={submitCode} loading={loading} error={error} />}
      {step === "success" && <StepSuccess onAccess={() => router.push("/home")} />}
    </AuthCard>
  );
}

// ── Estilo botão ─────────────────────────────────────────
const btnSx = (bg: string, hover: string) => ({
  mt: 1, py: 1.4, borderRadius: 50,
  bgcolor: bg, color: "#fff",
  fontWeight: 700, fontSize: 15,
  textTransform: "none",
  "&:hover": { bgcolor: hover },
  "&.Mui-disabled": { bgcolor: "#ccc", color: "#fff" },
});