"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { Event } from "@/types/event";

import { Searchbar } from "@/components/ui";
import { ActivityModal } from "@/components/modals";
import {
  GreetingSection,
  QuickActions,
  EventList,
  useHomeEvents,
} from "@/features/home";

// Substitua pela fonte real: contexto de auth, session, etc.
const USER = { name: "João" };

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { filteredEvents } = useHomeEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/event/search?code=${encodeURIComponent(code.trim())}`);
    }
  }

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 3 }}>

        {/* form captura o Enter nativamente */}
        <form onSubmit={handleSubmit}>
          <Searchbar
            value={code}
            onChange={setCode}
            placeholder="cód. do evento"
          />
        </form>

        <GreetingSection userName={USER.name} />
        <QuickActions />
        <EventList
          events={filteredEvents}
          onEventClick={setSelectedEvent}
        />
      </Box>

      {selectedEvent && (
        <ActivityModal
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.name}
          image={selectedEvent.imageUrl}
          startDate={selectedEvent.startDate}
          endDate={selectedEvent.endDate}
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
