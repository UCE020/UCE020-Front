'use client';

import React, { useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDownRef.current = true;
    const el = containerRef.current;
    if (!el) return;
    el.style.cursor = 'grabbing';
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const endDrag = () => {
    isDownRef.current = false;
    const el = containerRef.current;
    if (el) el.style.cursor = 'grab';
  };
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
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
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

            cursor: 'grab',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              display: 'none',
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

                cursor: 'default',
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
