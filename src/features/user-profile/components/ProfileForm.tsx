'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import TextInput from '@/components/ui/inputs/TextInput';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import { Button } from '@/components/ui/Button';
import type { UserProfile } from '@/types/userProfile';

interface ProfileFormProps {
  user: UserProfile;
  onSave: (userData: UserProfile) => void;
  isEditing: boolean;
  onEditChange: (isEditing: boolean) => void;
}

export function ProfileForm({ user, onSave, isEditing, onEditChange }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(user);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onEditChange(false);
  };

  const handleCancel = () => {
    setFormData(user);
    onEditChange(false);
  };

  return (
    <Box
      sx={{
        bgcolor: '#FAFAFA',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#0D1E3B',
            mb: 2.5,
            fontSize: '1.1rem',
          }}
        >
          Informações Pessoais
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2.5 }}>
            <TextInput
              label="Nome Completo"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              disabled={!isEditing}
              placeholder="Seu nome"
            />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <TextInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              disabled={!isEditing}
              placeholder="seu@email.com"
            />
          </Box>
        </Box>
      </Box>

      {isEditing && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
            p: 3,
            bgcolor: 'rgba(26, 39, 68, 0.02)',
            borderTop: '1px solid rgba(26, 39, 68, 0.1)',
          }}
        >
          <Button variant="outlined" onClick={handleCancel} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Salvar Alterações
          </Button>
        </Box>
      )}
    </Box>
  );
}
