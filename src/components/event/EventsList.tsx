import { Box, Typography } from '@mui/material';
import { Event } from '@/types/event';
import { EventCard } from '@/components/event/EventCard';

interface EventsListProps {
  events: Event[];
  title?: string;
  noEventsMessage?: string;
  onEventClick?: (event: Event) => void;
}

export function EventsList({
  events,
  title = ' ',
  noEventsMessage = 'Nenhum evento encontrado.',
  onEventClick,
}: EventsListProps) {
  return (
    <Box>
      <Typography
        sx={{
          mb: 2,
          fontSize: 16,
          color: '#0F1D35',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </Typography>

      {events.length === 0 ? (
        <Typography sx={{ fontSize: 14, color: 'text.secondary', py: 4, textAlign: 'center' }}>
          {noEventsMessage}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 2,
            width: '100%',
            px: { xs: 1.5, md: 0 },
          }}
        >
          {events.map((event) => (
            <Box key={event.id}>
              <EventCard event={event} onClick={onEventClick} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
