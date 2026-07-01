'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
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
        bgcolor: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(15, 29, 53, 0.04)',
        boxShadow: '0 10px 30px rgba(15, 29, 53, 0.08)',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #101828 0%, #1A2744 100%)',
              boxShadow: '0 6px 14px rgba(16, 24, 40, 0.25)',
            }}
          >
            <PersonOutlineRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#0D1E3B',
              fontSize: '1.05rem',
            }}
          >
            Informações Pessoais
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
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
            borderTop: '1px solid rgba(26, 39, 68, 0.08)',
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