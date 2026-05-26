"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Event } from "@/types/event";

import { Searchbar } from "@/components/ui";
import { ActivityModal } from "@/components/modals";
import { EventCard } from "@/components/event/EventCard";

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

//Componente interno dentro do Suspense
function EventSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  const [code, setCode] = useState(initialCode);
  const [event, setEvent] = useState<Event | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!initialCode) return;
    fetchEventByCode(initialCode).then((result) => {
      if (result) {
        setEvent(result);
        setNotFound(false);
      } else {
        setEvent(null);
        setNotFound(true);
      }
    });
  }, [initialCode]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/event/search?code=${encodeURIComponent(code.trim())}`);
    }
  }

  const handleSelectEvent = useCallback((e: Event) => {
    setSelectedEvent(e);
  }, []);

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 3 }}>
        <form onSubmit={handleSubmit}>
          <Searchbar
            value={code}
            onChange={setCode}
            placeholder="cód. do evento"
          />
        </form>

        {event && (
          <Box sx={{ mt: 3 }}>
            <EventCard event={event} onClick={handleSelectEvent} />
          </Box>
        )}

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

//Page exportada com tudo no Suspense
export default function EventSearchPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <EventSearchContent />
    </Suspense>
  );
}