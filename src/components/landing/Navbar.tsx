'use client';

import Image from 'next/image';

import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';

import { Button } from '@/components/ui';

export function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        color: '#111',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '1280px',

          margin: '0 auto',

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: 1.5,

          gap: 2,

          minHeight: '80px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/logos/logo1.png"
            alt="Logo"
            width={40}
            height={40}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',

            gap: {
              xs: 0.5,
              sm: 1,
              md: 2,
            },

            flexWrap: 'wrap',

            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="text"
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                md: '0.9rem',
              },

              minWidth: 'auto',

              px: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },
            }}
          >
            Início
          </Button>

          <Button
            variant="text"
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                md: '0.9rem',
              },

              minWidth: 'auto',

              px: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },
            }}
          >
            Sobre
          </Button>

          <Button
            variant="contained"
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                md: '0.9rem',
              },

              minWidth: 'auto',

              px: {
                xs: 1.5,
                sm: 2,
                md: 3,
              },
            }}
          >
            Entrar
          </Button>

          <Button
            variant="outlined"
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                md: '0.9rem',
              },

              minWidth: 'auto',

              px: {
                xs: 1.5,
                sm: 2,
                md: 3,
              },
            }}
          >
            Criar Conta
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}