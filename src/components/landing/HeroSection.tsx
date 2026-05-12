'use client';

import Image from 'next/image';

import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import { Button } from '@/components/ui';

export function HeroSection() {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, var(--color-navbar) 0%, #13284D 100%)',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: {
            xs: 'auto',
            md: '100vh',
          },

          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'space-between',

          gap: {
            xs: 1,
            sm: 3,
            md: 6,
          },

          pt: {
            xs: 10,
            md: 0,
          },

          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: {
              xs: 1.5,
              md: 1,
            },

            minWidth: 0,

            display: 'flex',
            flexDirection: 'column',

            alignItems: 'flex-start',
            textAlign: 'left',

            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: 'var(--color-white)',

              fontWeight: 700,

              lineHeight: 1.05,

              maxWidth: '650px',

              fontSize: {
                xs: '1.1rem',
                sm: '2.8rem',
                md: '4.3rem',
              },
            }}
          >
            Da presença ao certificado em{' '}
            <Box
              component="span"
              sx={{
                color: 'var(--color-primary)',
              }}
            >
              segundos!
            </Box>
          </Typography>

          <Typography
            sx={{
              color: '#D7E0EA',

              mt: 2,

              maxWidth: '520px',

              lineHeight: 1.4,

              fontWeight: 400,

              fontSize: {
                xs: '0.7rem',
                sm: '0.9rem',
                md: '1rem',
              },
            }}
          >
            O {' '}
            <Box
              component="span"
              sx={{
                color: 'var(--color-primary)',
              }}
            >
              Assinaê
            </Box>{' '}
            é uma plataforma completa para gestão de
            carga horária e emissão de certificados
            para eventos universitários.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,

              fontSize: {
                xs: '0.75rem',
                md: '1rem',
              },

              minWidth: 'auto',

              px: {
                xs: 2,
                sm: 4,
                md: 5,
              },

              py: 0.8,

              borderRadius: '999px',
            }}
          >
            Começar Agora
          </Button>
        </Box>

        <Box
          sx={{
            flex: {
                xs: 2,
                md: 1,
            },
            minWidth: 0,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'relative',

              width: {
                xs: '300px',
                sm: '700px',
                md: '900px',
              },

              height: {
                xs: '280px',
                sm: '700px',
                md: '900px',
              },
            }}
          >
            <Image
              src="/images/certificadoVariacao2.png"
              alt="Certificado"
              fill
              priority
              style={{
                objectFit: 'contain',
              }}
                sizes="(max-width: 600px) 260px,
                (max-width: 900px) 700px,
                900px"
            />
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
            width: '100%',
            lineHeight: 0,
            overflow: 'hidden',
            marginTop: {
            xs: '-40px',
            md: '-80px',
            },
            marginBottom: '-5px',
        }}
        >
        <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{
            display: 'block',
            width: '100%',
            height: '120px',
            }}
        >
            <path
            fill="#FFFFFF"
            d="
                M0,224
                C120,180 240,180 360,208
                C480,236 600,292 720,282
                C840,272 960,196 1080,186
                C1200,176 1320,224 1440,250
                L1440,320
                L0,320
                Z
            "
            />
        </svg>
        </Box>
    </Box>
  );
}