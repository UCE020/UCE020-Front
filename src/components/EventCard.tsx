import { Box, Card, CardContent, Typography } from "@mui/material";
import { EventCardProps } from "@/types/event";

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <Card
      onClick={onClick ? () => onClick(event) : undefined}
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 8,
        bgcolor: "#e8eaed",
        cursor: "pointer",
        transition: "transform .15s, box-shadow .15s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <Box
        component="img"
        src={event.imageUrl}
        alt={event.name}
        sx={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
      />
      <CardContent sx={{ p: '0 !important', flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>
          {event.name}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Data: 
          </Box>
          {event.startDate} a {event.endDate}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Horário: 
          </Box>
          {event.time}
        </Typography>
      </CardContent>
    </Card>
  );
}
