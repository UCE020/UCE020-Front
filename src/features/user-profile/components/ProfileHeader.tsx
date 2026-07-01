'use client';

import { Box, Avatar, Typography } from '@mui/material';
import type { UserProfile } from '@/types/userProfile';

interface ProfileHeaderProps {
  user: UserProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box
      sx={{
        background: '#0F1D35',
        position: 'relative',
        pb: 8,
        pt: 2,
        overflow: 'hidden',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar
          alt={user.name}
          sx={{
            width: 100,
            height: 100,
            border: '4px solid rgba(255, 255, 255, 0.3)',
            mb: 2,
            bgcolor: '#76E3BC',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1a2744',
          }}
        >
          {initials}
        </Avatar>

        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '1.5rem',
          }}
        >
          {user.name}
        </Typography>
      </Box>

      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          height: '120px',
        }}
      >
        <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="#EDEDED" />
      </svg>
    </Box>
  );
}
