'use client';

import Image from 'next/image';

import { Box, Typography, Container } from '@mui/material';

import { Button } from '@/components/ui';

export function AboutSection() {
  return (
    <Box
      sx={{
        width: '100%',

        py: {
          xs: 6,
          md: 10,
        },

        backgroundColor: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            textAlign: 'center',

            fontWeight: 800,

            color: '#13284D',

            mb: 4,

            letterSpacing: '1px',

            fontSize: {
              xs: '2rem',
              md: '3rem',
            },
          }}
        >
          Sobre
        </Typography>

        <Box
          sx={{
            width: '100%',

            maxWidth: {
              xs: '360px',
              sm: '500px',
              md: '650px',
            },

            mx: 'auto',

            backgroundColor: '#F5F5F5',

            borderRadius: {
              xs: '40px',
              md: '55px',
            },

            px: {
              xs: 3,
              sm: 5,
              md: 7,
            },

            py: {
              xs: 4,
              md: 6,
            },

            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',

            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',

              width: {
                xs: '180px',
                sm: '220px',
                md: '280px',
              },

              height: {
                xs: '240px',
                sm: '280px',
                md: '340px',
              },

              borderRadius: '40px',

              overflow: 'hidden',

              mb: 4,
            }}
          >
            <Image
              src="/images/aboutImage.jpg"
              alt="Evento universitário"
              fill
              sizes="(max-width:600px) 180px, (max-width:900px) 220px, 280px"
              loading="eager"
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>

          <Typography
            sx={{
              color: '#222',

              lineHeight: 1.15,

              fontWeight: 400,

              maxWidth: '520px',

              mb: 3,

              fontSize: {
                xs: '1.05rem',
                sm: '1.2rem',
                md: '1.45rem',
              },
            }}
          >
            O{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: '#000',
              }}
            >
              Assinaê
            </Box>{' '}
            é uma plataforma que foi desenvolvida através de um projeto de extensão do curso de
            engenharia de computação.
          </Typography>

          <Typography
            sx={{
              color: '#222',

              lineHeight: 1.15,

              fontWeight: 400,

              maxWidth: '560px',

              mb: 4,

              fontSize: {
                xs: '1.05rem',
                sm: '1.2rem',
                md: '1.45rem',
              },
            }}
          >
            O seu objetivo central é simplificar a gestão de eventos universitários, focando no
            controle de carga horária e na emissão de certificados.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#059669',

              color: '#fff',

              borderRadius: '999px',

              px: {
                xs: 4,
                md: 5,
              },

              py: 1.2,

              fontWeight: 700,

              fontSize: {
                xs: '1rem',
                md: '1.1rem',
              },

              textTransform: 'none',

              '&:hover': {
                backgroundColor: '#047857',
              },
            }}
          >
            Saiba Mais
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
