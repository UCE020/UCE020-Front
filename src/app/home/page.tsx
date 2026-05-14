"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { Event } from "@/types/event";

import { Header } from "@/components/ui/Header";
import { ActivityModal } from "@/components/modals";
import {
  SearchBar,
  GreetingSection,
  QuickActions,
  EventList,
  useHomeEvents,
} from "@/features/home";

const NAV_LINKS = [
  { label: "Início",          href: "/home"            },
  { label: "Certificados",    href: "/certificados"    },
  { label: "Inscrições",      href: "/inscricoes"      },
  { label: "Criar evento",    href: "/criar-evento"    },
  { label: "Eventos Criados", href: "/eventos-criados" },
  { label: "Monitoria",       href: "/monitoria"       },
];

// Substitua pela fonte real: contexto de auth, session, etc.
const USER = { name: "João" };

export default function HomePage() {
  const { search, setSearch, filteredEvents } = useHomeEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  function handleEventClick(event: Event) {
    setSelectedEvent(event);
  }

  function handleCloseModal() {
    setSelectedEvent(null);
  }

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Header
        user={USER}
        navLinks={NAV_LINKS}
        onLogout={() => console.log("logout")}
      />

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <SearchBar value={search} onChange={setSearch} />
        <GreetingSection userName={USER.name} />
        <QuickActions />
        <EventList
          events={filteredEvents}
          onEventClick={handleEventClick}
        />
      </Box>

      {selectedEvent && (
        <ActivityModal
          open={!!selectedEvent}
          onClose={handleCloseModal}
          // Campos que existem no Event
          title={selectedEvent.name}
          image={selectedEvent.imageUrl}
          startDate={selectedEvent.startDate}
          endDate={selectedEvent.endDate}
          // TODO: substituir pelos dados reais da API
          location="A definir"
          hours={0}
          participantsCount={0}
          status="active"
          description=""
          variant="signup"
          onSignup={() => console.log("Inscrever:", selectedEvent.id)}
        />
      )}
    </Box>
  );
}
