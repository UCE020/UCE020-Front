"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Sidebar, NavLink } from "@/components/ui/Sidebar";
import { AppPageContainer } from "@/components/layout/AppPageContainer";
import { Event } from "@/types/event";
import { MonitoriaCard } from "./components/MonitoriaCard";
import { MonitoriaEmptyState } from "./components/MonitoriaEmptyState";

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  {
    label: "Início",
    href: "/home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Eventos",
    href: "/events",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Monitorias",
    href: "/monitorias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: "Certificados",
    href: "/certificates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    label: "Meu Perfil",
    href: "/user-profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_USER = { name: "Zezinho da Silva" };

const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    nome: "Oficina de CD",
    codigo: "",
    descricao: "",
    localizacao: "LEDS",
    responsavel: "Monitor de CD",
    cargaHoraria: 8,
    dataInicio: "2027-07-01",
    dataFim: "2027-07-15",
    status: "ativa",
    foto: null,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 2,
    nome: "Palestra AERI",
    codigo: "",
    descricao: "Apresentação do projeto AERI para os alunos do curso de Ciência da Computação.",
    localizacao: "Auditorio Módulo 4",
    responsavel: "Fulana de Tal",
    cargaHoraria: 2,
    dataInicio: "2024-03-01",
    dataFim: "2024-07-15",
    status: "ativa",
    foto: null,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 3,
    nome: "Apresentação ECOMPjr",
    codigo: "",
    descricao: "-",
    localizacao: "PAT38",
    responsavel: "Ciclaninho de Tal",
    cargaHoraria: 2,
    dataInicio: "2024-08-05",
    dataFim: "2024-12-10",
    status: "pendente",
    foto: null,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 4,
    nome: "Apresentação da IEEE",
    codigo: "",
    descricao: "Apresentação do projeto da IEEE para os alunos do curso de Ciência da Computação.",
    localizacao: "MP55",
    responsavel: "Beltrano de Tal",
    cargaHoraria: 2,
    dataInicio: "2023-08-01",
    dataFim: "2023-12-20",
    status: "finalizada",
    foto: null,
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
  {
    id: 5,
    nome: "Apresentação do DAECOMP",
    codigo: "",
    descricao: "Apresentação do DAECOMP para os alunos do curso de Ciência da Computação.",
    localizacao: "PAT35",
    responsavel: "JOAZINHO DE TAL",
    cargaHoraria: 2,
    dataInicio: "2023-03-06",
    dataFim: "2023-07-14",
    status: "finalizada",
    foto: null,
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
];

// ─── View ─────────────────────────────────────────────────────────────────────

export function MonitoriaView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    console.log("logout");
  }

  function handleEventClick(event: Event) {
    console.log("event clicked", event.id);
  }

  return (
    <AppPageContainer>
      {/* Header */}
      <Header user={MOCK_USER} onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navLinks={NAV_LINKS}
        user={MOCK_USER}
        onLogout={handleLogout}
      />

      {/* Conteúdo principal */}
      <main className="pt-16">
        {/* Cabeçalho da seção */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/home"
            aria-label="Voltar"
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#0F1D35] hover:text-[#2EC4A0] hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="text-[20px] sm:text-[22px] font-bold text-[#0F1D35]">
            Minhas Monitorias
          </h1>
        </div>

        {/* Contador */}
        <p className="text-xs text-gray-400 mb-3 px-1">
          {MOCK_EVENTS.length} monitoria
          {MOCK_EVENTS.length !== 1 ? "s" : ""}
        </p>

        {/* Lista de monitorias */}
        {MOCK_EVENTS.length === 0 ? (
          <MonitoriaEmptyState
            hasFilters={false}
            onClearFilters={() => {}}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {MOCK_EVENTS.map((event) => (
              <MonitoriaCard
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        )}
      </main>
    </AppPageContainer>
  );
}