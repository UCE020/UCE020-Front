'use client';

import { use } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { CalendarToday, AccessTime, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { MOCK_CERTIFICATES } from '@/mocks/certificates';
import { mockUser } from '@/mocks/user';

const NAV_LINKS = [
  { label: 'Início', href: '/home' },
  { label: 'Certificados', href: '/certificados' },
  { label: 'Inscrições', href: '/inscricoes' },
  { label: 'Criar evento', href: '/criar-evento' },
  { label: 'Eventos Criados', href: '/eventos-criados' },
  { label: 'Monitoria', href: '/monitoria' },
];

const USER = { name: 'João' };

function formatCardDate(dateString: string) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export default function CertificateViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const cert = MOCK_CERTIFICATES.find((c) => c.id === id);
  const isAdmin = mockUser.role === 'admin';

  function handleEditCertificate() {
    console.log('Editar certificado:', cert?.id);
  }

  function handleDownloadCertificate() {
    console.log('Baixar certificado:', cert?.id);
  }

  if (!cert) {
    router.push('/certificados');
    return null;
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Container maxWidth="sm" sx={{ px: 3, py: 2, pb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <IconButton onClick={() => router.back()} size="small">
            <ArrowBack fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#0f172a',
            }}
          >
            Visualizar Certificado
          </Typography>
        </Box>

        <Box
          component="img"
          src={cert.imageUrl}
          alt={`Certificado - ${cert.title}`}
          sx={{
            width: '100%',
            borderRadius: '14px',
            mb: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          }}
        />

        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#0f172a',
            mb: 2,
          }}
        >
          {cert.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <CalendarToday sx={{ fontSize: 16, color: '#64748b', mt: '2px' }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.875rem',
                  color: '#0f172a',
                }}
              >
                {formatCardDate(cert.issuedDate)}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.875rem',
                  color: '#64748b',
                }}
              >
                {cert.location}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime sx={{ fontSize: 16, color: '#64748b' }} />

            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.875rem',
                color: '#0f172a',
              }}
            >
              {cert.hours} horas de carga horária
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 8, flexWrap: 'wrap' }}>
          {isAdmin && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 5, borderRadius: '50px', fontWeight: 700 }}
              onClick={handleEditCertificate}
            >
              Editar
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            sx={{ px: 6, borderRadius: '50px', fontWeight: 700 }}
            onClick={handleDownloadCertificate}
          >
            Baixar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}