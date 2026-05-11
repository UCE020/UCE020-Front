"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar, type NavLink } from "@/components/ui/Sidebar";
import {
  Home,
  Person,
} from "@mui/icons-material";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  name: string;
}

interface HeaderProps {
  /** Usuário autenticado. null → tema claro (landing). Com user → tema escuro + sidebar. */
  user?: User | null;
  /** Links exibidos na Sidebar (apenas quando logado) */
  navLinks?: NavLink[];
  /** Callback acionado ao clicar em "Sair" */
  onLogout?: () => void;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ isDark }: { isDark: boolean }) {
  return (
    <Link href="/" aria-label="Ir para a página inicial">
        <Image
            src={isDark ? "/logo.svg" : "/logo_white.svg"}
            alt="Logo"
            width={32}
            height={32}
        />
    </Link>
  );
}

// ─── Ícone Hamburger ──────────────────────────────────────────────────────────

function HamburgerIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ─── Header principal ─────────────────────────────────────────────────────────

const DEFAULT_NAV_LINKS: NavLink[] = [
  { icon: <Home />,          label: "Início",          href: "/" },
  { icon: <Person />,        label: "Sobre",           href: "/sobre" },
];

export function Header({
  user = null,
  navLinks = DEFAULT_NAV_LINKS,
  onLogout = () => {},
}: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = !!user;

  // ── Logado: header dark com hamburger + logo centralizado ──────────────────
  if (isLoggedIn) {
    return (
      <>
        <header className="w-full bg-[#0F1D35] px-4 sm:px-6">
          <div className="mx-auto max-w-7xl flex items-center h-16 relative">

            {/* Hamburger — esquerda */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={sidebarOpen}
              className="text-white hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EC4A0] rounded"
            >
              <HamburgerIcon color="white" />
            </button>

            {/* Logo — centralizado via absolute */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo isDark />
            </div>

          </div>
        </header>

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          navLinks={navLinks}
          user={user}
          onLogout={onLogout}
        />
      </>
    );
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16">

        <Logo isDark={false} />

        {/* Links centrais — visíveis só no desktop */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
          {DEFAULT_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#0F1D35] text-[14px] font-medium hover:text-[#2EC4A0] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botões de ação */}
        <div className="flex items-center gap-3">
          <Link
            href="/entrar"
            className="px-5 py-2 text-[14px] font-semibold rounded-lg bg-[#2EC4A0] text-white hover:bg-[#27b090] transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/criar-conta"
            className="px-5 py-2 text-[14px] font-semibold rounded-lg border-2 border-[#0F1D35] text-[#0F1D35] hover:bg-gray-50 transition-colors"
          >
            Criar Conta
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;