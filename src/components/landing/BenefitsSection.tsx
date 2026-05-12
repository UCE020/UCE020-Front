'use client';

import Image from 'next/image';

import { Box, Typography, Container } from '@mui/material';

const cards = [
  {
    icon: 'images/icons/clock.svg',
    title: 'Economize Tempo',
    description: 'Valide presença e emita certificados — tudo em um só lugar.',
    color: '#6ED7B4',
  },
  {
    icon: 'images/icons/universitario.svg',
    title: 'Eventos Universitários',
    description: 'Desenvolvido para simplificar a organização de eventos acadêmicos.',
    color: '#35A384',
  },
  {
    icon: 'images/icons/check.svg',
    title: 'Fácil e Intuitivo',
    description: 'Nossa interface torna o processo simples e sem complicações.',
    color: '#6ED7B4',
  },
  {
    icon: 'images/icons/qrcode.svg',
    title: 'Check-in com QR Code',
    description: 'Valide presença dos participantes em segundos usando QR Code.',
    color: '#35A384',
  },
  {
    icon: 'images/icons/certificado.svg',
    title: 'Certificados Automáticos',
    description: 'Gere certificados automaticamente após o evento.',
    color: '#6ED7B4',
  },
];

export function BenefitsSection() {
  return (
    <Box
      sx={{
        width: '100%',

        py: {
          xs: 6,
          md: 10,
        },

        overflow: 'hidden',

        backgroundColor: '#fff',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: {
              xs: '1.8rem',
              md: '3rem',
            },

            fontWeight: 700,

            textAlign: 'center',

            color: '#13284D',

            mb: 1,
          }}
        >
          Tudo que você precisa
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',

            color: '#5B6470',

            maxWidth: '700px',

            mx: 'auto',

            mb: 5,

            fontSize: {
              xs: '0.95rem',
              md: '1.05rem',
            },
          }}
        >
          Uma plataforma moderna para gerenciar eventos universitários de ponta a ponta.
        </Typography>

        <Box
          sx={{
            display: 'flex',

            gap: {
              xs: 2,
              md: 3,
            },

            overflowX: 'auto',

            scrollSnapType: 'x mandatory',

            pb: 2,

            px: {
              xs: 1,
              md: 0,
            },

            '&::-webkit-scrollbar': {
              height: '8px',
            },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D1D5DB',
              borderRadius: '999px',
            },
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.title}
              sx={{
                minWidth: {
                  xs: '210px',
                  sm: '260px',
                  md: '300px',
                },

                maxWidth: {
                  xs: '220px',
                  sm: '280px',
                  md: '320px',
                },

                flexShrink: 0,

                scrollSnapAlign: 'start',

                backgroundColor: card.color,

                borderRadius: {
                  xs: '22px',
                  md: '28px',
                },

                px: {
                  xs: 2.5,
                  sm: 3,
                  md: 4,
                },

                py: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },

                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
                justifyContent: 'center',

                textAlign: 'center',

                transition: '0.3s ease',

                cursor: 'grab',

                '&:hover': {
                  transform: 'translateY(-6px)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',

                  width: {
                    xs: 52,
                    md: 70,
                  },

                  height: {
                    xs: 52,
                    md: 70,
                  },

                  mb: {
                    xs: 2,
                    md: 3,
                  },
                }}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  color: '#fff',

                  fontWeight: 700,

                  lineHeight: 1.2,

                  mb: 1.5,

                  fontSize: {
                    xs: '1.1rem',
                    sm: '1.3rem',
                    md: '1.5rem',
                  },
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  color: '#F4F7FA',

                  lineHeight: 1.5,

                  maxWidth: '240px',

                  fontSize: {
                    xs: '0.8rem',
                    md: '0.95rem',
                  },
                }}
              >
                {card.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
