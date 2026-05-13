'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

import { AppDrawer, TopBar } from '@/components/layout';
import { ProfileHeader, ProfileForm } from '@/features/perfil';
import type { UserProfile } from '@/types/userProfile';

const MOCK_USER: UserProfile = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  cpf: '123.456.789-00',
  password: '••••••••'
};

export default function ProfilePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const pathname = usePathname();

  const handleSaveProfile = (userData: UserProfile) => {
    setUser(userData);
    console.log('Perfil atualizado:', userData);
  };

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeHref={pathname}
      />

      <ProfileHeader
        user={user}
        onMenuClick={() => setDrawerOpen(true)}
        onEditClick={() => setIsEditing(true)}
      />

      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          px: 3,
          pb: 4,
          mt: -6,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <ProfileForm
          user={user}
          onSave={handleSaveProfile}
          isEditing={isEditing}
          onEditChange={setIsEditing}
        />
      </Box>
    </Box>
  );
}
