"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import { Button, SelectInput, TextInput } from "@/components/ui";
import { ModalContainer, CloseButton, ModalContent } from "@/components/modals";
import { formatDate } from "@/utils/format";
import type { RegisterGuestModalProps, FieldErrors } from "@/types/registerGuestModal";

export default function RegisterGuestModal({
  open,
  onClose,
  activityTitle,
  activityDate,
  activityLocation,
  roleOptions,
  onSubmit,
  isLoading = false,
}: RegisterGuestModalProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ fullName: false, role: false, email: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors: FieldErrors = (() => {
    const newErrors: FieldErrors = {};

    if (touched.fullName && fullName.trim().length === 0) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (touched.fullName && fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter no mínimo 3 caracteres";
    }

    if (touched.role && role.trim().length === 0) {
      newErrors.role = "Função é obrigatória";
    }

    if (touched.email && email.trim().length === 0) {
      newErrors.email = "E-mail é obrigatório";
    } else if (touched.email && !email.includes("@")) {
      newErrors.email = "E-mail inválido";
    }

    return newErrors;
  })();

  const canSubmit =
    fullName.trim().length >= 3 &&
    role.trim().length > 0 &&
    email.includes("@") &&
    Object.keys(errors).length === 0;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const displayActivityDate = (() => {
    if (!activityDate) return "Data não informada";

    try {
      return formatDate(activityDate);
    } catch {
      return "Data indisponível";
    }
  })();

  const handleSubmit = async () => {
    if (isSubmitting || !canSubmit) return;
    try {
      setIsSubmitting(true);
      await onSubmit({ fullName, role, email });
      onClose();
      setFullName("");
      setRole("");
      setEmail("");
      setTouched({ fullName: false, role: false, email: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <ModalContent paddingX={0} marginBottom={0}>
        <Box sx={{ px: 3, mt: 0, mb: 2.5 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 800, color: 'text.primary', mt: 4 }}>
            Cadastrar Convidado
          </Typography>

          <Typography sx={{ color: 'text.secondary', fontSize: 11, mb: 3, mt: 3 }}>
            Preencha os dados abaixo para cadastrar palestrantes ou ministrantes do evento
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CalendarTodayOutlinedIcon sx={{ fontSize: 30, color: 'text.secondary' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 12, color: 'text.primary', mb: 0.5 }}>
                {activityTitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                  {displayActivityDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                <PlaceOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                  {activityLocation}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 3 }}>
          <Typography sx={{ fontSize: 12, color: 'text.primary', mb: 1.5 }}>
            Dados do Convidado
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 2, px: 3 }}>
          <div>
            <TextInput
              label="Nome Completo"
              value={fullName}
              onChange={setFullName}
              onBlur={() => handleBlur('fullName')}
              size="small"
              error={Boolean(errors.fullName)}
            />
            {errors.fullName && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5 }}>
                {errors.fullName}
              </Typography>
            )}
          </div>

          <div>
            <SelectInput
              label="Função"
              value={role}
              onChange={setRole}
              placeholder="Selecione a função"
              options={roleOptions}
              size="small"
              error={Boolean(errors.role)}
              onBlur={() => handleBlur('role')}
            />
            {errors.role && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5 }}>
                {errors.role}
              </Typography>
            )}
          </div>

          <div>
            <TextInput
              label="E-mail"
              value={email}
              onChange={setEmail}
              onBlur={() => handleBlur('email')}
              type="email"
              size="small"
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5 }}>
                {errors.email}
              </Typography>
            )}
          </div>
        </Box>

        <Box sx={{ px: 3, mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => void handleSubmit()}
            isLoading={isSubmitting || isLoading}
            disabled={!canSubmit}
            color="primary"
            sx={{
              width: '120px',
              height: '36px',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
}
