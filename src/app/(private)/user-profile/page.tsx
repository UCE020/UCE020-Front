'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { ProfileHeader, ProfileForm } from '@/features/user-profile';
import { Sidebar, type NavLink } from '@/components/ui';
import type { UserProfile } from '@/types/userProfile';
import { Home, Description, Assignment, AddCircle, CalendarMonth, BarChart } from '@mui/icons-material';

const MOCK_USER: UserProfile = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  password: '••••••••'
};

const NAV_LINKS: NavLink[] = [
  { icon: <Home />, label: 'Início', href: '/home' },
  { icon: <Description />, label: 'Certificados', href: '/certificados' },
  { icon: <Assignment />, label: 'Inscrições', href: '/inscricoes' },
  { icon: <AddCircle />, label: 'Criar evento', href: '/criar-evento' },
  { icon: <CalendarMonth />, label: 'Eventos Criados', href: '/eventos-criados' },
  { icon: <BarChart />, label: 'Monitoria', href: '/monitoria' },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSaveProfile = (userData: UserProfile) => {
    setUser(userData);
    console.log('Perfil atualizado:', userData);
  };

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navLinks={NAV_LINKS}
        user={{ name: user.name }}
        onLogout={() => console.log('logout')}
      />
      <ProfileHeader
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
        onEditClick={() => setIsEditing(true)}
      />

      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          px: 3,
          pb: 4,
        }}
      >
        <ProfileForm
          user={user}
          onSave={handleSaveProfile}
          isEditing={isEditing}
          onEditChange={setIsEditing}
        />
      </Box>
    </Box>
  );
}
