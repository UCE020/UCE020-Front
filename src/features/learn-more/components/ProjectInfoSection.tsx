'use client';

import { Box, Typography, Container } from '@mui/material';

const cards = [
  {
    title: 'Surgimento',
    description:
      'Surgiu através de um projeto de extensão (UCE020) do curso de Engenharia de Computação da universidade estadual de Feira de Santana.',
    color: '#43A68D',
  },
  {
    title: 'Sobre a UCE',
    description:
      'As UCEs (Unidades Curriculares de Extensão) fazem parte da chamada curricularização da extensão, uma regra do MEC que obriga os cursos de graduação a terem parte da carga horária voltada para atividades que conectem a universidade com a sociedade.',
    color: '#9EE7CF',
    textColor: '#FFFFFF',
  },
  {
    title: 'Problema e Desenvolvimento',
    description:
      'A UCE020 teve como objetivo mitigar um problema muito comum em eventos universitários: confirmação da presença, contabilização de carga horária e geração dos certificados.\n\nAtravés desse projeto foi desenvolvido o sistema Assinê, uma plataforma completa com objetivo de resolver essa problemática.',
    color: '#43A68D',
  },
];

export function ProjectInfoSection() {
  return (
    <Box
      sx={{
        width: '100%',

        py: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',

            flexDirection: 'column',

            gap: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.title}
              sx={{
                backgroundColor: card.color,

                borderRadius: {
                  xs: '26px',
                  md: '32px',
                },

                px: {
                  xs: 3,
                  md: 5,
                },

                py: {
                  xs: 3,
                  md: 4,
                },

                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.06)',

                transition: 'all 0.3s ease',

                '&:hover': {
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Typography
                sx={{
                  color:
                    card.textColor || '#FFFFFF',

                  fontWeight: 800,

                  textAlign: 'center',

                  fontSize: {
                    xs: '1.05rem',
                    md: '1.45rem',
                  },

                  mb: {
                    xs: 1.2,
                    md: 2,
                  },
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  color:
                    card.textColor ||
                    'rgba(255,255,255,0.92)',

                  fontSize: {
                    xs: '0.92rem',
                    md: '1.05rem',
                  },

                  lineHeight: {
                    xs: 1.45,
                    md: 1.6,
                  },

                  textAlign: 'justify',

                  whiteSpace: 'pre-line',
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