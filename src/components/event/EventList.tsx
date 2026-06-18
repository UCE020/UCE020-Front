"use client";

import { Box, Typography, IconButton } from '@mui/material';
import { Event } from '@/types/event';
import { EventCard } from '@/components/event/EventCard';
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface EventListProps {
  events: Event[];
  title?: string;
  home?: boolean;
  noEventsMessage?: string;
  onEventClick?: (event: Event) => void;
}

export function EventList({
  events,
  title = 'EVENTOS INSCRITOS',
  noEventsMessage = 'Nenhum evento encontrado.',
  home = true,
  onEventClick,

}: EventListProps) {
  const router = useRouter();

  if(home) {
     return (
      <Box sx={{ width: '100%' }}>
        <Typography
          sx={{
            mb: 2,
            mt: 6,
            fontSize: 14,
            color: '#0F1D35',
            fontWeight: 600,
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
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
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

  } else {
     return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 3.5 }}>
          <IconButton
            onClick={() => router.back()}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "background.default" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        </Box>

        {events.length === 0 ? (
          <Typography sx={{ fontSize: 14, color: 'text.secondary', py: 4, textAlign: 'center' }}>
            {noEventsMessage}
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
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
 
}
