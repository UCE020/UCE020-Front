"use client";

import { useMemo } from "react";
import { Event } from "@/types/event";

// Mock — substitua pela chamada real em services/api.ts
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 2h até 15h",
    imageUrl: "https://placehold.co/60x60/76E3BC/0D1E3B?text=E1",
  },
  {
    id: "2",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 8h até 15h",
    imageUrl: "https://placehold.co/60x60/0D1E3B/76E3BC?text=E2",
  },
];

export function useHomeEvents() {
  const filteredEvents = useMemo(() => MOCK_EVENTS, []);
  return { filteredEvents };
}