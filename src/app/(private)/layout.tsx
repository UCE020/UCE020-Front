'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import { Sidebar, type NavLink } from '@/components/ui/Sidebar';
import { Home, Article, Event, PostAdd, DocumentScanner } from '@mui/icons-material';

const NAV_LINKS: NavLink[] = [
  { icon: <Home />, label: 'Início', href: '/home' },
  { icon: <PostAdd />, label: 'Criar evento', href: '/event/register' },
  { icon: <Event />, label: 'Eventos Criados', href: '/event/list' },
  { icon: <DocumentScanner />, label: 'Monitoria', href: '/monitoria' },
  { icon: <Article />, label: 'Certificados', href: '/certificate/list' },
];

const USER = { name: 'João' };

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header user={USER} onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navLinks={NAV_LINKS}
        user={USER}
        onLogout={() => console.log('logout')}
      />
      <main className="pt-16">{children}</main>
    </>
  );
}
