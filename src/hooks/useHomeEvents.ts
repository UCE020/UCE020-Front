"use client";

import { useMemo } from "react";
import { Event } from "@/types/event";

// Mock — substitua pela chamada real em services/api.ts
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    nome: "NOME DO EVENTO",
    codigo: "MOCK1",
    descricao: "Mock description",
    localizacao: "A definir",
    responsavel: "Responsável",
    cargaHoraria: 10,
    dataInicio: "2026-01-13T00:00:00.000Z",
    dataFim: "2026-01-17T00:00:00.000Z",
    status: "ativo",
    foto: "https://placehold.co/60x60/76E3BC/0D1E3B?text=E1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    nome: "NOME DO EVENTO",
    codigo: "MOCK2",
    descricao: "Mock description",
    localizacao: "A definir",
    responsavel: "Responsável",
    cargaHoraria: 10,
    dataInicio: "2026-01-13T00:00:00.000Z",
    dataFim: "2026-01-17T00:00:00.000Z",
    status: "ativo",
    foto: "https://placehold.co/60x60/0D1E3B/76E3BC?text=E2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useHomeEvents() {
  const filteredEvents = useMemo(() => MOCK_EVENTS, []);
  return { filteredEvents };
}