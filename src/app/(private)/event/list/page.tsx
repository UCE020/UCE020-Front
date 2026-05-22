import { Box, Container, Typography, IconButton } from '@mui/material';

import Header from '@/components/ui/Header';
import { EventsList } from '@/components/event/EventsList';
import { Event } from '@/types/event';
import { ArrowBack } from '@mui/icons-material';

const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'Fórum de Tecnologia Universitária',
    startDate: '15/07/2026',
    endDate: '15/07/2026',
    time: '18:00 - 21:00',
    imageUrl: '/images/certificadoVariacao2.png',
  },
  {
    id: '2',
    name: 'Palestra de Inovação',
    startDate: '20/07/2026',
    endDate: '20/07/2026',
    time: '19:00 - 22:00',
    imageUrl: '/images/certificadoVariacao2.png',
  },
  {
    id: '3',
    name: 'Hackathon de Desenvolvimento',
    startDate: '25/07/2026',
    endDate: '26/07/2026',
    time: '09:00 - 18:00',
    imageUrl: '/images/certificadoVariacao2.png',
  },
  {
    id: '4',
    name: 'Siecomp 2026',
    startDate: '25/07/2026',
    endDate: '26/07/2026',
    time: '09:00 - 18:00',
    imageUrl: '/images/certificadoVariacao2.png',
  },
  {
    id: '5',
    name: 'Eleições DA ECOMP 2026',
    startDate: '25/07/2026',
    endDate: '26/07/2026',
    time: '09:00 - 18:00',
    imageUrl: '/images/certificadoVariacao2.png',
  },
];

export default function EventCreatedPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <IconButton
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'background.default' },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Eventos Criados
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          {/* Lista de eventos criados - substitua pelo mapeamento real dos seus dados */}
          <Box sx={{ width: '100%', maxWidth: 860 }}>
            <EventsList events={sampleEvents} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
