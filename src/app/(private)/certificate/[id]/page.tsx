'use client';

import { use } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { CalendarToday, AccessTime, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { MOCK_CERTIFICATES } from '@/mocks/certificates';
import { mockUser } from '@/mocks/user';

function formatCardDate(dateString: string) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export default function CertificateViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const cert = MOCK_CERTIFICATES.find((c) => c.id === id);
  const isOrganizer = mockUser.role === 'organizer';

  if (!cert) {
    router.push('/certificados');
    return null;
  }

  const certificate = cert;

  function handleEditCertificate() {
    router.push('/certificate/edit');
  }

  function handleDownloadCertificate() {
    console.log('Baixar certificado:', certificate.id);
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
          src={certificate.imageUrl}
          alt={`Certificado - ${certificate.title}`}
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
          {certificate.title}
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
                {formatCardDate(certificate.issuedDate)}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.875rem',
                  color: '#64748b',
                }}
              >
                {certificate.location}
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
              {certificate.hours} horas de carga horária
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 8,
            flexWrap: 'wrap',
          }}
        >
          {isOrganizer && (
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