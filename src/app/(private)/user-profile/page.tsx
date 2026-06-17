'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

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

  const handleSaveProfile = (userData: UserProfile) => {
    setUser(userData);
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
    </Box>
  );
}
