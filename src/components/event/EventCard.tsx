import { Box, Card, CardContent, Typography } from "@mui/material";
import { EventCardProps } from "@/types/event";

export function EventCard({ event, onClick }: EventCardProps) {
  const dataInicio = new Date(event.dataInicio).toLocaleDateString("pt-BR");
  const dataFim = new Date(event.dataFim).toLocaleDateString("pt-BR");

  return (
    <Card
      onClick={onClick ? () => onClick(event) : undefined}
      elevation={1}
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 8,
        bgcolor: "#FFF",
        cursor: "pointer",
        transition: "transform .15s, box-shadow .15s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <Box
        component="img"
        src={event.foto ?? "https://placehold.co/80x80/4ecdc4/1a2744?text=E"}
        alt={event.nome}
        sx={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
      />
      <CardContent sx={{ p: "0 !important", flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Typography noWrap sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>
          {event.nome}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Data:{" "}
          </Box>
          {dataInicio} a {dataFim}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Local:{" "}
          </Box>
          {event.localizacao}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.6 }}>
          <Box component="span" color="text.primary" sx={{ fontWeight: 600 }}>
            Carga horária:{" "}
          </Box>
          {event.cargaHoraria}h
        </Typography>
      </CardContent>
    </Card>
  );
}
