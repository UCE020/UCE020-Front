"use client";

import { Suspense, useState, useReducer, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { IEvent } from "@/types/event";

import { Searchbar } from "@/components/ui";
import { ActivityModal } from "@/components/modals";
import { EventCard } from "@/components/event/EventCard";
import { eventService } from "@/services/eventService";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; event: IEvent }
  | { status: "not_found" };

type SearchAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; event: IEvent }
  | { type: "FETCH_NOT_FOUND" };

function searchReducer(_: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", event: action.event };
    case "FETCH_NOT_FOUND":
      return { status: "not_found" };
  }
}

function useEventSearch(codigo: string) {
  const [state, dispatch] = useReducer(searchReducer, { status: "idle" });

  useEffect(() => {
    if (!codigo) return;

    dispatch({ type: "FETCH_START" });

    const controller = new AbortController();

    eventService
      .findByCodigo(codigo)
      .then((event) => {
        if (!controller.signal.aborted) {
          dispatch({ type: "FETCH_SUCCESS", event });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          dispatch({ type: "FETCH_NOT_FOUND" });
        }
      });

    return () => controller.abort();
  }, [codigo]);

  return state;
}

function EventSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  const [code, setCode] = useState(initialCode);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const searchState = useEventSearch(initialCode);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed) {
      router.push(`/event/search?code=${encodeURIComponent(trimmed)}`);
    }
  }

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

        {searchState.status === "loading" && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {searchState.status === "success" && (
          <Box sx={{ mt: 3 }}>
            <EventCard
              event={searchState.event}
              onClick={setSelectedEvent}
            />
          </Box>
        )}

        {searchState.status === "not_found" && (
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
          open
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.nome}
          image={selectedEvent.foto ?? undefined}
          startDate={new Date(selectedEvent.dataInicio).toLocaleDateString("pt-BR")}
          endDate={new Date(selectedEvent.dataFim).toLocaleDateString("pt-BR")}
          location={selectedEvent.localizacao}
          hours={selectedEvent.cargaHoraria}
          participantsCount={0}
          status={selectedEvent.status}
          description={selectedEvent.descricao}
          variant="signup"
          onSignup={() => console.log("Inscrever:", selectedEvent.id)}
        />
      )}
    </Box>
  );
}

export default function EventSearchPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <EventSearchContent />
    </Suspense>
  );
}