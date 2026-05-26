'use client';

import Image from 'next/image';

import {
  Box,
  Typography,
  Container,
} from '@mui/material';

const teamMembers = [
  {
    name: 'João Pedro',
    role: 'Desenvolvedor Front-end',
    image:
      'https://i.pravatar.cc/300?img=1',
  },
  {
    name: 'Maria Clara',
    role: 'UX/UI Designer',
    image:
      'https://i.pravatar.cc/300?img=32',
  },
  {
    name: 'Lucas Andrade',
    role: 'Back-end Developer',
    image:
      'https://i.pravatar.cc/300?img=10',
  },
  {
    name: 'Ana Júlia',
    role: 'Product Owner',
    image:
      'https://i.pravatar.cc/300?img=47',
  },
  {
    name: 'Carlos Henrique',
    role: 'DevOps Engineer',
    image:
      'https://i.pravatar.cc/300?img=4',
  },
  {
    name: 'Fernanda Lima',
    role: 'Scrum Master',
    image:
      'https://i.pravatar.cc/300?img=25',
  },
];

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
}

function TeamMemberCard({
  name,
  role,
  image,
}: TeamMemberCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',

        borderRadius: '28px',

        overflow: 'hidden',

        minHeight: 280,

        background:
          'linear-gradient(180deg, #48B394 0%, #2C8D72 100%)',

        boxShadow:
          '0 15px 35px rgba(0,0,0,0.10)',

        transition: 'all 0.3s ease',

        '&:hover': {
          transform: 'translateY(-6px)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',

          width: '100%',

          height: 180,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: '#fff',

            fontWeight: 800,

            fontSize: '1.1rem',

            mb: 0.5,
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            color:
              'rgba(255,255,255,0.88)',

            fontSize: '0.95rem',

            lineHeight: 1.5,
          }}
        >
          {role}
        </Typography>
      </Box>
    </Box>
  );
}

export function TeamSection() {
  return (
    <Box
      sx={{
        width: '100%',

        py: {
          xs: 8,
          md: 12,
        },

      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',

            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Typography
            sx={{
              color: '#13284D',

              fontWeight: 900,

              letterSpacing: '0.04em',

              textTransform: 'uppercase',

              fontSize: {
                xs: '1.5rem',
                md: '2.2rem',
              },
            }}
          >
            Equipe Responsável
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },

            gap: {
              xs: 3,
              md: 4,
            },
          }}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}