"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

import { Button, SelectInput, TextInput } from "@/components/ui";
import { ModalContainer, CloseButton, ModalContent } from "@/components/modals";
import type { SelectOption } from "@/types/inputs";

export type RegisterGuestModalProps = {
  open: boolean;
  onClose: () => void;
  activityTitle: string;
  activityLocation: string;
  roleOptions: ReadonlyArray<SelectOption>;
  onSubmit: (payload: {
    fullName: string;
    role: string;
    email: string;
  }) => void | Promise<void>;
};

export default function RegisterGuestModal({
  open,
  onClose,
  activityTitle,
  activityLocation,
  roleOptions,
  onSubmit,
}: RegisterGuestModalProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return fullName.trim().length >= 3 && role.trim().length > 0 && email.includes("@");
  }, [fullName, role, email]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onSubmit({ fullName, role, email });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContainer open={open} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <ModalContent paddingX={3} marginBottom={0}>
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
          Cadastrar Convidado (EM DESENVOLVIMENTO)
        </Typography>

        <Typography sx={{ color: 'text.secondary', fontSize: 12, mb: 3 }}>
          Preencha os dados abaixo para cadastrar participantes ou organizadores.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 2.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '999px',
              bgcolor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 0.2,
            }}
          >
            <EventNoteOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.primary' }}>
              {activityTitle}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {activityLocation}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
          Dados do Convidado
        </Typography>

        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <TextInput label="Nome Completo" value={fullName} onChange={setFullName} size="small" />

          <SelectInput
            label="Função"
            value={role}
            onChange={setRole}
            placeholder="Selecione a função"
            options={roleOptions}
            size="small"
          />

          <TextInput label="E-mail" value={email} onChange={setEmail} type="email" size="small" />
        </Box>

        <Button
          variant="contained"
          onClick={() => void handleSubmit()}
          isLoading={isSubmitting}
          disabled={!canSubmit}
          sx={{
            mt: 3,
            width: '100%',
            bgcolor: 'text.primary',
            '&:hover': { bgcolor: 'action.hover' },
            borderRadius: '8px',
            height: 34,
            fontWeight: 800,
          }}
        >
          Cadastrar
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}

