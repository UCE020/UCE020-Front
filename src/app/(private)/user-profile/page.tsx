'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { ProfileHeader, ProfileForm } from '@/features/user-profile';
import type { UserProfile } from '@/types/userProfile';
import { userProfileService } from '@/services/userProfileService';
import { Toast } from '@/components/ui/Toast';
import { ToastSeverity } from '@/types/toast';
import { isAxiosError } from 'axios';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: ToastSeverity;
  }>({
    open: false,
    message: '',
    severity: ToastSeverity.Error,
  });

  useEffect(() => {
    userProfileService
      .getProfile()
      .then(({ data }) => setUser(data))
      .catch(() => {
        setToast({
          open: true,
          message: 'Não foi possível carregar o perfil',
          severity: ToastSeverity.Error,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSaveProfile = async (userData: UserProfile) => {
    try {
      const { data: updated } = await userProfileService.updateProfile({
        name: userData.name,
        email: userData.email,
      });
      setUser(updated);
      setToast({
        open: true,
        message: 'Perfil atualizado com sucesso',
        severity: ToastSeverity.Success,
      });
    } catch (error) {
      const message =
        isAxiosError(error) && typeof error.response?.data?.message === 'string'
          ? error.response.data.message
          : 'Não foi possível salvar as alterações';
      setToast({ open: true, message, severity: ToastSeverity.Error });
    }
  };

  if (isLoading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <ProfileHeader user={user} />

      <Box sx={{ maxWidth: 600, mx: 'auto', px: 3, pb: 4 }}>
        <ProfileForm
          user={user}
          onSave={handleSaveProfile}
          isEditing={isEditing}
          onEditChange={setIsEditing}
        />
      </Box>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}