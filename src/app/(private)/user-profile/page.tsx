'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { ProfileHeader, ProfileForm } from '@/features/user-profile';
import type { UserProfile } from '@/types/userProfile';

const MOCK_USER: UserProfile = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  password: '••••••••'
};


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  const handleSaveProfile = (userData: UserProfile) => {
    setUser(userData);
  };

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <ProfileHeader
        user={user}
      />

      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          px: 3,
          pb: 4,
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
