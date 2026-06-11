import Link from 'next/link';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface CertificateCardProps {
  id: string;
  title: string;
  issuedDate: string;
  imageUrl?: string;
}

export function CertificateCard({ id, title, issuedDate, imageUrl }: CertificateCardProps) {
  return (
    <Card
      component={Link}
      href={`/certificate/${id}`}
      elevation={1}
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 2,
        p: 2,
        borderRadius: 8,
        bgcolor: '#FFF',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform .15s, box-shadow .15s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
      }}
    >
      <Box
        component="img"
        src={imageUrl ?? '/images/certificadoVariacao2.png'}
        alt={title}
        sx={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
      />
      <CardContent sx={{ p: '0 !important', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Typography noWrap sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Emitido em:{' '}
          </Box>
          {new Date(issuedDate).toLocaleDateString('pt-BR')}
        </Typography>
      </CardContent>
    </Card>
  );
}