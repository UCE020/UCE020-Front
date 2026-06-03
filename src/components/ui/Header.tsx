'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar, type NavLink } from '@/components/ui/Sidebar';
import { Home, Article, Event, PostAdd, FindInPage, DocumentScanner } from '@mui/icons-material';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Button } from '@/components/ui';

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

const DEFAULT_NAV_LINKS: NavLink[] = [
  { icon: <Home />, label: 'Início', href: '/' },
  { icon: <Article />, label: 'Certificados', href: '/certificados' },
  { icon: <Event />, label: 'Inscrições', href: '/inscricoes' },
  { icon: <PostAdd />, label: 'Criar evento', href: '/criar-evento' },
  { icon: <FindInPage />, label: 'Eventos Criados', href: '/eventos-criados' },
  { icon: <DocumentScanner />, label: 'Monitoria', href: '/monitoria' },
];

export function Header({
  user = null,
  navLinks = DEFAULT_NAV_LINKS,
  onLogout = () => {},
}: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = !!user;
  const pathname = usePathname();
  const isPageLearnMore = pathname.includes('/landing-page/learn-more');

  // ── Logado: header dark com hamburger ──────────────────
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

  // ── Não Logado: header white com login/register ──────────────────
  // Verifica se ta no saiba mais
  if (isPageLearnMore) {
    return (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: '#111',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: '1500px',

            margin: '0 auto',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: 1.5,

            gap: 2,

            minHeight: '80px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Image src="/images/logos/logo1.png" alt="Logo" width={40} height={40} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',

              gap: {
                xs: 0.5,
                sm: 1,
                md: 2,
              },

              flexWrap: 'wrap',

              justifyContent: 'flex-end',
            }}
          >
            <Button
              component={Link}
              href="/login"
              variant="contained"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 3,
                },
              }}
            >
              Entrar
            </Button>

            <Button
              component={Link}
              href="/register"
              variant="outlined"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 3,
                },
              }}
            >
              Criar Conta
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: '#111',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: '1500px',

            margin: '0 auto',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: 1.5,

            gap: 2,

            minHeight: '80px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Image src="/images/logos/logo1.png" alt="Logo" width={40} height={40} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',

              gap: {
                xs: 0.5,
                sm: 1,
                md: 2,
              },

              flexWrap: 'wrap',

              justifyContent: 'flex-end',
            }}
          >
            <Button
              component={Link}
              href="#hero-section"
              variant="text"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1,
                  sm: 1.5,
                  md: 2,
                },
              }}
            >
              Início
            </Button>

            <Button
              component={Link}
              href="#about-section"
              variant="text"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1,
                  sm: 1.5,
                  md: 2,
                },
              }}
            >
              Sobre
            </Button>

            <Button
              component={Link}
              href="/login"
              variant="contained"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 3,
                },
              }}
            >
              Entrar
            </Button>

            <Button
              component={Link}
              href="/register"
              variant="outlined"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.9rem',
                },

                minWidth: 'auto',

                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 3,
                },
              }}
            >
              Criar Conta
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
