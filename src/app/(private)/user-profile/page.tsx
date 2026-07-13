'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { PageLoader } from '@/components/ui';

import { ProfileHeader, ProfileForm } from '@/features/user-profile';
import type { UserProfile } from '@/types/userProfile';
import { userProfileService } from '@/services/userProfileService';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userProfileService
      .getProfile()
      .then(({ data }) => setUser(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSaveProfile = async (userData: UserProfile) => {
    const previousUser = user;

    // Atualização otimista da UI
    setUser(userData);

    try {
      const { data } = await userProfileService.updateProfile({
        name: userData.name,
        email: userData.email,
      });
      setUser(data);
    } catch (err) {
      // Em caso de erro, reverte para os dados anteriores
      console.error('Falha ao salvar perfil:', err);
      setUser(previousUser);
    }
  };

  const handleAvatarChange = async (file: File) => {
    if (!user) return;

    try {
      const { data } = await userProfileService.uploadAvatar(file);
      // Atualiza a URL do avatar retornada pelo backend
      setUser((prev) => (prev ? { ...prev, avatarUrl: data.avatarUrl } : prev));
    } catch (err) {
      console.error('Falha ao enviar foto de perfil:', err);
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    // Deixamos o erro propagar para que o ProfileForm exiba a mensagem
    // apropriada (ex: senha atual incorreta).
    await userProfileService.changePassword({ currentPassword, newPassword });
  };

  if (isLoading || !user) {
    return <PageLoader />;
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />

      <Box sx={{ maxWidth: 600, mx: 'auto', px: 3, pt: 4, pb: 4 }}>
        <ProfileForm
          user={user}
          onSave={handleSaveProfile}
          isEditing={isEditing}
          onEditChange={setIsEditing}
          onChangePassword={handleChangePassword}
        />
      </Box>
    </Box>
  );
}