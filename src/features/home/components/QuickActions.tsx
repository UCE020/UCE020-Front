'use client';

import Link from 'next/link';

import { Box, Typography, alpha } from '@mui/material';

const QUICK_ACTIONS = [
  { line1: 'Criar novo', line2: 'evento', variant: 'navy', href: '/event/register' },
  { line1: 'Meus', line2: 'certificados', variant: 'teal', href: '/certificate/list' },
  { line1: 'Eventos', line2: 'criados', variant: 'teal', href: '/event/list' },
  { line1: 'Monitoria', line2: 'de eventos', variant: 'navy', href: '/monitoria' },
] as const;

const COLORS = {
  navy: {
    background: 'linear-gradient(135deg, #1A2744 0%, #253B68 100%)',
    shadow: alpha('#1A2744', 0.35),
  },

  teal: {
    background: 'linear-gradient(135deg, #6ED7B4 0%, #43C79C 100%)',
    shadow: alpha('#43C79C', 0.3),
  },
};

export function QuickActions() {
  return (
    <Box
      sx={{
        width: '100%',

        display: 'grid',

        gridTemplateColumns: {
          xs: 'repeat(2, minmax(140px, 1fr))',
          sm: 'repeat(2, 170px)',
        },

        gap: {
          xs: 1.5,
          sm: 2,
        },

        justifyContent: 'center',

        px: 2,
        py: 1,
      }}
    >
      {QUICK_ACTIONS.map((action) => {
        const theme = COLORS[action.variant];

        return (
          <Box
            key={action.href}
            component={Link}
            href={action.href}
            sx={{
              position: 'relative',

              minHeight: {
                xs: 122,
                sm: 136,
              },

              borderRadius: '24px',

              background: theme.background,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              textDecoration: 'none',

              overflow: 'hidden',

              boxShadow: `0 10px 25px ${theme.shadow}`,

              transition: 'transform .22s ease, box-shadow .22s ease, filter .22s ease',

              '&:hover': {
                transform: 'translateY(-4px)',
                filter: 'brightness(1.03)',
                boxShadow: `0 16px 34px ${theme.shadow}`,
              },

              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                textAlign: 'center',

                px: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: '#fff',

                  fontSize: {
                    xs: 18,
                    sm: 20,
                  },

                  fontWeight: 800,

                  lineHeight: 1.15,

                  letterSpacing: '-0.03em',

                  textTransform: 'lowercase',
                }}
              >
                {action.line1}
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.92)',

                  fontSize: {
                    xs: 16,
                    sm: 17,
                  },

                  fontWeight: 600,

                  lineHeight: 1.2,

                  mt: 0.3,

                  letterSpacing: '-0.02em',
                }}
              >
                {action.line2}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
