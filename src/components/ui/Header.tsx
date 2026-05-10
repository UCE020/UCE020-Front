"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
//import LogoSvg from "@/assets/logo_white.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface User {
  name: string;
}

interface HeaderProps {
  /** Links de navegação exibidos no desktop e no drawer mobile */
  navLinks?: NavLink[];
  /** Usuário autenticado. Se null/undefined, exibe os botões Entrar / Criar Conta */
  user?: User | null;
  /** Callback acionado ao clicar em "Sair" */
  onLogout?: () => void;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
    return (
        <Link href="/" aria-label="Ir para a página inicial">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        </Link>
    );
}

// ─── Avatar + Dropdown ────────────────────────────────────────────────────────

interface AvatarMenuProps {
  user: User;
  onLogout: () => void;
}

function AvatarMenu({ user, onLogout }: AvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  // Fecha ao pressionar Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Menu do usuário"
        className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#2EC4A0] text-white hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EC4A0]"
      >
        {/* Ícone de pessoa */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-50 min-w-[160px] rounded-lg bg-white shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Nome */}
          <div className="px-4 py-2.5 text-[13px] font-semibold text-[#0F1D35] border-b border-gray-100">
            {user.name}
          </div>

          {/* Meu Perfil */}
          <Link
            href="/perfil"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-[13px] font-medium text-white bg-[#2EC4A0] hover:bg-[#27b090] transition-colors text-center"
          >
            Meu Perfil
          </Link>

          {/* Sair */}
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full px-4 py-2 text-[13px] text-[#0F1D35] hover:bg-gray-50 transition-colors text-center border-t border-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Drawer mobile ────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

function MobileDrawer({ open, navLinks, onClose }: MobileDrawerProps) {
  // Impede scroll no body enquanto o drawer estiver aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel lateral */}
      <nav
        aria-label="Menu mobile"
        className="fixed top-0 left-0 z-50 h-full w-64 bg-[#0F1D35] shadow-xl flex flex-col pt-20 px-6 gap-4"
      >
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-white text-[15px] font-medium hover:text-[#2EC4A0] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

// ─── Header principal ─────────────────────────────────────────────────────────

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
];

export function Header({
  navLinks = DEFAULT_NAV_LINKS,
  user = null,
  onLogout = () => {},
}: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#0F1D35] px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between h-16">

          {/* ── Mobile ── */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={drawerOpen}
              className="text-white hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EC4A0] rounded"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Avatar ou espaço vazio */}
            {user ? (
              <AvatarMenu user={user} onLogout={onLogout} />
            ) : (
              <div className="w-9" aria-hidden="true" />
            )}
          </div>

          {/* ── Desktop ── */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Logo />

            {/* Links de navegação */}
            <nav aria-label="Navegação principal" className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-[14px] font-medium hover:text-[#2EC4A0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-3">
              {user ? (
                <AvatarMenu user={user} onLogout={onLogout} />
              ) : (
                <>
                  <Link
                    href="/entrar"
                    className="px-5 py-2 text-[14px] font-semibold rounded-lg bg-[#2EC4A0] text-white hover:bg-[#27b090] transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/criar-conta"
                    className="px-5 py-2 text-[14px] font-semibold rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors"
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Drawer mobile */}
      <MobileDrawer
        open={drawerOpen}
        navLinks={navLinks}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

export default Header;