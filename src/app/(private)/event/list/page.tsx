'use client';

import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { EventList } from '@/components/event/EventList';
import { eventService } from '@/services/eventService';
import type { Event } from '@/types/event';

export default function EventCreatedPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.findOrganizerEvents()
      .then(setEvents)
      .catch((error) => console.error('Erro ao carregar eventos:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Container sx={{ py: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 2 }}>
          <EventList events={events} title="Eventos Criados" home={false} />
        </Box>
      </Container>
    </Box>
  );
}
