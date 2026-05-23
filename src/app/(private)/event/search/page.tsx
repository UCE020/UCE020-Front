"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { Event } from "@/types/event";

import { Searchbar } from "@/components/ui";
import { ActivityModal } from "@/components/modals";
import { EventCard } from "@/components/event/EventCard";

// Mock — substitua pela chamada real em services/api.ts
async function fetchEventByCode(code: string): Promise<Event | null> {
  const MOCK: Record<string, Event> = {
    "EVT001": {
      id: "1",
      name: "NOME DO EVENTO",
      startDate: "13/05/2026",
      endDate: "17/05/2026",
      time: "Das 8h até 15h",
      imageUrl: "https://placehold.co/80x80/4ecdc4/1a2744?text=E1",
    },
  };
  return MOCK[code.toUpperCase()] ?? null;
}

export default function EventSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  const [code, setCode] = useState(initialCode);
  const [event, setEvent] = useState<Event | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!initialCode) return;
    setEvent(null);
    setNotFound(false);

    fetchEventByCode(initialCode).then((result) => {
      if (result) setEvent(result);
      else setNotFound(true);
    });
  }, [initialCode]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/event/search?code=${encodeURIComponent(code.trim())}`);
    }
  }

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 3 }}>

        {/* Searchbar — mesmo da home */}
        <form onSubmit={handleSubmit}>
          <Searchbar
            value={code}
            onChange={setCode}
            placeholder="cód. do evento"
          />
        </form>

        {/* Evento encontrado */}
        {event && (
          <Box sx={{ mt: 3 }}>
            <EventCard
              event={event}
              onClick={(e) => setSelectedEvent(e)}
            />
          </Box>
        )}

        {/* Evento não encontrado */}
        {notFound && (
          <Typography
            sx={{
              mt: 8,
              textAlign: "center",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Evento não encontrado...
          </Typography>
        )}
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
