"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Search,
  Menu,
  Close,
  Home,
  Description,
  Assignment,
  AddCircle,
  CalendarMonth,
  BarChart,
  Person,
} from "@mui/icons-material";
import Header from "@/components/ui/Header";

// ── Tema ───────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary:    { main: "#1a2744" },
    secondary:  { main: "#3dd6c8" },
    background: { default: "#ffffff", paper: "#f4f6f9" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // ✅ Poppins global
    h5: { fontWeight: 700 },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a2744 !important",
          color: "#ffffff",
          width: 280,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontFamily: "'Poppins', sans-serif" },
      },
    },
  },
});

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  time: string;
  imageUrl: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 2h até 15h",
    imageUrl: "https://placehold.co/60x60/4ecdc4/1a2744?text=E1",
  },
  {
    id: "2",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 8h até 15h",
    imageUrl: "https://placehold.co/60x60/1a2744/4ecdc4?text=E2",
  },
];

const NAV_ITEMS = [
  { icon: <Home />,          label: "Início"          },
  { icon: <Description />,   label: "Certificados"    },
  { icon: <Assignment />,    label: "Inscrições"      },
  { icon: <AddCircle />,     label: "Criar evento"    },
  { icon: <CalendarMonth />, label: "Eventos Criados" },
  { icon: <BarChart />,      label: "Monitoria"       },
];

const QUICK_ACTIONS = [
  { line1: "criar novo",  line2: "evento",       variant: "navy" },
  { line1: "meus",        line2: "certificados", variant: "teal" },
  { line1: "eventos",     line2: "criados",      variant: "teal" },
  { line1: "monitoria",   line2: "de eventos",   variant: "navy" },
] as const;

function EventCard({ event }: { event: Event }) {
  return (
    <Card
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 3,
        cursor: "pointer",
        transition: "transform .15s, box-shadow .15s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <Box
        component="img"
        src={event.imageUrl}
        alt={event.name}
        sx={{ width: 60, height: 60, borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
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

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const userName = "João"; // 👈 substitua pela sua fonte de dados

  const filtered = mockEvents.filter(
    (e) => search === "" || e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      {/* ✅ Apenas Poppins, todos os pesos necessários */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>

        {/* Header - Exemplo com usuário autenticado */}
        <Header user={{ name: "João" }} />

        {/* Drawer */}
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 2.5,
              borderBottom: "1px solid rgba(255,255,255,.07)",
            }}
          >
            <Typography sx={{ color: '#3dd6c8', letterSpacing: '-.5px', fontSize: 17, fontWeight: 800 }}
            >
              Kauan
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
              <Close />
            </IconButton>
          </Box>

          <List sx={{ pt: 1.5 }}>
            {NAV_ITEMS.map((item, i) => (
              <ListItem
                key={item.label}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: "0 50px 50px 0",
                  mr: 2,
                  cursor: "pointer",
                  bgcolor: i === 0 ? "rgba(61,214,200,.18)" : "transparent",
                  color: i === 0 ? "#3dd6c8" : "rgba(255,255,255,0.85)",
                  "&:hover": { bgcolor: "rgba(61,214,200,.12)", color: "#3dd6c8" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 600,
                        fontSize: 14,
                      },
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Conteúdo */}
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>

          {/* Search */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 50,
              bgcolor: "#f0f2f5",
              mt: 1,
            }}
          >
            <Search sx={{ color: "text.secondary", fontSize: 18 }} />
            <InputBase
              placeholder="procurar evento"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Paper>

          {/* Saudação */}
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', py: 3, fontWeight: 700, lineHeight: 1.5 }}
          >
            Olá, {userName}! O que temos para{" "}
            <Box component="span" sx={{ color: "#3dd6c8" }}>
              hoje?
            </Box>
          </Typography>

          {/* Ações rápidas */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 140px)",
              gap: 1,
              justifyContent: "center",
              mb: 1,
            }}
          >
            {QUICK_ACTIONS.map((action) => (
              <Box
                key={action.line2}
                component="button"
                sx={{
                  width: 140,
                  height: 122,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  bgcolor: action.variant === "navy" ? "#1a2744" : "#3dd6c8",
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  textAlign: "center",
                  p: "10px 8px",
                  transition: "filter .15s, transform .15s",
                  "&:hover": { filter: "brightness(0.9)", transform: "translateY(-1px)" },
                }}
              >
                {action.line1}<br />{action.line2}
              </Box>
            ))}
          </Box>

          {/* Título seção */}
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
            Eventos inscritos
          </Typography>

          {/* Lista de eventos */}
          <Grid container spacing={1.5} sx={{ pb: 5 }}>
            {filtered.map((event) => (
              <Grid key={event.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>

        </Box>
      </Box>
    </ThemeProvider>
  );
}