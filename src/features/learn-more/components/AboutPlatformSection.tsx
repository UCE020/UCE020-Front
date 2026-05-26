'use client';

import Image from 'next/image';

import { Box, Typography, Container, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export function AboutPlatformSection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: '100%',

        mt: 14,
        mb: 3,
        px: 2,

        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={() => router.back()}
        size="small"
        sx={{
          color: 'text.secondary',
          '&:hover': { bgcolor: 'background.default' },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',

              width: {
                xs: 180,
                md: 340,
              },

              height: {
                xs: 120,
                md: 260,
              },

              mb: 2,
            }}
          >
            <Image
              src="/images/logo-assinae.png"
              alt="Logo Assinaê"
              fill
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </Box>

          <Typography
            sx={{
              color: 'text.primary',

              maxWidth: '640px',

              fontSize: {
                xs: '1rem',
                md: '1.15rem',
              },

              lineHeight: 1.8,

              fontWeight: 400,
            }}
          >
            O <strong>Assinaê</strong> é uma plataforma que nasceu com o objetivo de auxiliar
            eventos universitários.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
