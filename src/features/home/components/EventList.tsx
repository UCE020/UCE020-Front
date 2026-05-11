import { Box, Typography, Grid } from "@mui/material";
import { type Event } from "@/types";
import { EventCard } from "@/components/EventCard";


interface EventListProps {
  events: Event[];
  title?: string;
  onEventClick?: (event: Event) => void;
}

export function EventList({ events, title = "Eventos inscritos", onEventClick }: EventListProps) {
  return (
    <Box>
      <Typography
        sx={{
          pt: 2.5,
          pb: 1.5,
          fontSize: 13,
          color: "text.secondary",
          fontWeight: 600,
          letterSpacing: ".5px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      {events.length === 0 ? (
        <Typography sx={{ fontSize: 14, color: "text.secondary", textAlign: "center", py: 4 }}>
          Nenhum evento encontrado.
        </Typography>
      ) : (
        <Grid container spacing={1.5} sx={{ pb: 5 }}>
          {events.map((event) => (
            <Grid key={event.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <EventCard event={event} onClick={onEventClick} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
