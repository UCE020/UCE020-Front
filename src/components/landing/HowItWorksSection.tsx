'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Typography,
  Container,
  IconButton,
  Button,
} from '@mui/material';

const steps = [
  {
    icon: '/images/icons/plus.svg',

    title: 'Crie o Evento',

    description:
      'Organizadores criam os eventos e suas atividades.',

    color: '#0D1B4C',
  },

  {
    icon: '/images/icons/user.svg',

    title: 'Participantes',

    description:
      'Participantes marcam presença nas atividades.',

    color: '#009966',
  },

  {
    icon: '/images/icons/check.svg',

    title: 'Confirmação',

    description:
      'Monitores confirmam a presença dos participantes.',

    color: '#64748B',
  },

  {
    icon: '/images/icons/file.svg',

    title: 'Certificados',

    description:
      'O organizador finaliza o evento e gera os certificados.',

    color: '#6ED7B4',
  },
];

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStep = () => {
    setActiveIndex((prev) =>
      prev === steps.length - 1 ? 0 : prev + 1
    );
  };

  const prevStep = () => {
    setActiveIndex((prev) =>
      prev === 0 ? steps.length - 1 : prev - 1
    );
  };

  return (
    <Box
      sx={{
        width: '100%',

        py: {
          xs: 8,
          md: 12,
        },

        overflow: 'hidden',

        background:
          'linear-gradient(to bottom, #F8FAFC, #EEF4F2)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            textAlign: 'center',

            fontWeight: 800,

            color: '#13284D',

            mb: 1,

            fontSize: {
              xs: '2.2rem',
              md: '3rem',
            },
          }}
        >
          Como Funciona?
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',

            color: '#5B6470',

            maxWidth: '700px',

            mx: 'auto',

            mb: {
              xs: 8,
              md: 10,
            },

            px: 2,

            fontSize: {
              xs: '0.95rem',
              md: '1.05rem',
            },
          }}
        >
          Um fluxo simples, moderno e intuitivo para seus
          eventos universitários.
        </Typography>

        {/* área circular */}
        <Box
          sx={{
            position: 'relative',

            width: {
              xs: 320,
              sm: 420,
              md: 560,
            },

            height: {
              xs: 420,
              sm: 420,
              md: 560,
            },

            mx: 'auto',

            mt: {
              xs: 10,
              md: 0,
            },
          }}
        >
          {/* círculo central */}
          <Box
            sx={{
              position: 'absolute',

              top: '50%',
              left: '50%',

              transform: 'translate(-50%, -50%)',

              width: {
                xs: 120,
                md: 170,
              },

              height: {
                xs: 120,
                md: 170,
              },

              borderRadius: '50%',

              background:
                'linear-gradient(135deg, #13284D, #1E3A6E)',

              display: 'flex',

              alignItems: 'center',
              justifyContent: 'center',

              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',

              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                color: '#fff',

                fontWeight: 700,

                textAlign: 'center',

                lineHeight: 1.2,

                fontSize: {
                  xs: '1rem',
                  md: '1.4rem',
                },
              }}
            >
              Fluxo do Evento
            </Typography>
          </Box>

          {/* cards */}
          {steps.map((step, index) => {
            const mobilePositions = [
              {
                top: '0%',
                left: '50%',
              },

              {
                top: '50%',
                left: '100%',
              },

              {
                top: '100%',
                left: '50%',
              },

              {
                top: '50%',
                left: '0%',
              },
            ];

            const desktopAngle =
              ((360 / steps.length) * index - 90) *
              (Math.PI / 180);

            const desktopRadius = 190;

            const desktopX =
              Math.cos(desktopAngle) * desktopRadius;

            const desktopY =
              Math.sin(desktopAngle) * desktopRadius;

            const isActive = activeIndex === index;

            return (
              <Box
                key={step.title}
                onClick={() => setActiveIndex(index)}
                sx={{
                  position: 'absolute',

                  top: {
                    xs: mobilePositions[index].top,
                    md: '50%',
                  },

                  left: {
                    xs: mobilePositions[index].left,
                    md: '50%',
                  },

                  transform: {
                    xs: `translate(-50%, -50%)
                         scale(${isActive ? 1 : 0.88})`,

                    md: `translate(${desktopX}px, ${desktopY}px)
                         translate(-50%, -50%)
                         scale(${isActive ? 1.08 : 0.9})`,
                  },

                  transition: '0.4s ease',

                  width: {
                    xs: 110,
                    md: 160,
                  },

                  height: {
                    xs: 110,
                    md: 160,
                  },

                  borderRadius: '50%',

                  background: step.color,

                  display: 'flex',

                  flexDirection: 'column',

                  alignItems: 'center',
                  justifyContent: 'center',

                  textAlign: 'center',

                  px: 2,

                  opacity: isActive ? 1 : 0.7,

                  cursor: 'pointer',

                  zIndex: isActive ? 3 : 1,

                  boxShadow: isActive
                    ? '0 18px 35px rgba(0,0,0,0.22)'
                    : '0 8px 20px rgba(0,0,0,0.12)',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',

                    width: {
                      xs: 28,
                      md: 48,
                    },

                    height: {
                      xs: 28,
                      md: 48,
                    },

                    mb: 1.2,
                  }}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
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

                    lineHeight: 1.1,

                    mb: 0.5,

                    fontSize: {
                      xs: '0.82rem',
                      md: '1rem',
                    },
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#EAF4F0',

                    lineHeight: 1.15,

                    fontSize: {
                      xs: '0.58rem',
                      md: '0.78rem',
                    },

                    maxWidth: {
                      xs: '75px',
                      md: '120px',
                    },
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* controles */}
        <Box
          sx={{
            display: 'flex',

            justifyContent: 'center',

            alignItems: 'center',

            gap: 2,

            mt: {
              xs: 6,
              md: 4,
            },
          }}
        >
          <IconButton
            onClick={prevStep}
            sx={{
              width: 52,
              height: 52,

              backgroundColor: '#13284D',

              '&:hover': {
                backgroundColor: '#1E3A6E',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',

                width: 18,
                height: 18,

                transform: 'rotate(180deg)',
              }}
            >
              <Image
                src="/images/icons/arrow.svg"
                alt="Anterior"
                fill
              />
            </Box>
          </IconButton>

          <IconButton
            onClick={nextStep}
            sx={{
              width: 52,
              height: 52,

              backgroundColor: '#009966',

              '&:hover': {
                backgroundColor: '#00B377',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',

                width: 18,
                height: 18,
              }}
            >
              <Image
                src="/images/icons/arrow.svg"
                alt="Próximo"
                fill
              />
            </Box>
          </IconButton>
        </Box>

        {/* botão */}
        <Box
          sx={{
            display: 'flex',

            justifyContent: 'center',

            mt: 5,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#13284D',

              px: 5,
              py: 1.5,

              borderRadius: '999px',

              textTransform: 'none',

              fontWeight: 700,

              fontSize: '1rem',

              boxShadow: 'none',

              '&:hover': {
                backgroundColor: '#1E3A6E',

                boxShadow: 'none',
              },
            }}
          >
            Começar Agora
          </Button>
        </Box>
      </Container>
    </Box>
  );
}