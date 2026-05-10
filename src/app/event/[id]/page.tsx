"use client";

import { Box } from "@mui/material";
import { ActivityList } from "@/components/activityList";

// TODO: substituir por dados reais da API
const mockActivities = [
  { id: "1", title: "Atividade 1" },
  { id: "2", title: "Atividade 2" },
  { id: "3", title: "Atividade 3" },
  { id: "4", title: "Atividade 4" },
];

export default function EventDetailPage() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 3 }}>

      {/* TODO: adicionar informações do evento (imagem, datas, descrição) */}

      <ActivityList
        activities={mockActivities}
        onSelectActivity={(activity) => console.log("Selecionada:", activity)}
      />

    </Box>
  );
}