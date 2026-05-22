'use client';

import Image from 'next/image';

import {
  Box,
  Typography,
  Container,
} from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

import { Button } from '@/components/ui';

export function AboutSection() {
  return (
    <Box
      id="about-section"
      sx={{
        width: '100%',

        py: {
          xs: 5,
          md: 12,
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

            mb: 1.5,

            letterSpacing: '-1px',

            lineHeight: 1.1,

            fontSize: {
              xs: '2.3rem',
              md: '3.6rem',
            },
          }}
        >
          Sobre
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',

            color: '#5B6470',

            maxWidth: '680px',

            mx: 'auto',

            mb: {
              xs: 5,
              md: 7,
            },

            lineHeight: 1.7,

            fontSize: {
              xs: '1rem',
              md: '1.08rem',
            },
          }}
        >
          Entenda como o Assinaê nasceu e quais seus objetivos.
        </Typography>

        <Box
          sx={{
            width: '100%',

            maxWidth: {
              xs: '360px',
              sm: '560px',
              md: '760px',
            },

            mx: 'auto',

            background:
              'linear-gradient(180deg, #F8FAFC 0%, #F3F4F6 100%)',

            borderRadius: {
              xs: '38px',
              md: '55px',
            },

            border: '1px solid #E5E7EB',

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

            boxShadow:
              '0 20px 45px rgba(15, 23, 42, 0.06)',
          }}
        >
          <Box
            sx={{
              position: 'relative',

              width: {
                xs: '200px',
                sm: '240px',
                md: '300px',
              },

              height: {
                xs: '250px',
                sm: '320px',
                md: '380px',
              },

              borderRadius: {
                xs: '28px',
                md: '36px',
              },

              overflow: 'hidden',

              mb: {
                xs: 4,
                md: 5,
              },

              boxShadow:
                '0 18px 40px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src="/images/aboutImage.jpg"
              alt="Evento universitário"
              fill
              priority
              sizes="
                (max-width:600px) 200px,
                (max-width:900px) 240px,
                300px
              "
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>

          <Typography
            sx={{
              color: '#1F2937',

              lineHeight: 1.6,

              fontWeight: 400,

              maxWidth: '620px',

              mb: 3,

              fontSize: {
                xs: '1.05rem',
                sm: '1.15rem',
                md: '1.32rem',
              },
            }}
          >
            O{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 800,
                color: '#111827',
              }}
            >
              Assinaê
            </Box>{' '}
            é uma plataforma desenvolvida através de um
            projeto de extensão do curso de Engenharia de
            Computação. 
          </Typography>
<Typography
            sx={{
              color: '#1F2937',

              lineHeight: 1.6,

              fontWeight: 400,

              maxWidth: '620px',

              mb: 3,

              fontSize: {
                xs: '1.05rem',
                sm: '1.15rem',
                md: '1.32rem',
              },
            }}
          >
            Seu principal objetivo é simplificar a gestão
            de eventos universitários, automatizando o
            controle de presença, a contabilização de carga
            horária e a emissão de certificados. 
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              backgroundColor: '#059669',

              color: '#fff',

              borderRadius: '999px',

              px: {
                xs: 4,
                md: 5,
              },

              py: 1.3,

              fontWeight: 700,

              fontSize: {
                xs: '1rem',
                md: '1.05rem',
              },

              textTransform: 'none',

              boxShadow:
                '0 10px 25px rgba(5,150,105,0.22)',

              transition: '0.25s ease',

              '&:hover': {
                backgroundColor: '#047857',

                transform: 'translateY(-2px)',
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