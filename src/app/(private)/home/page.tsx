'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Event } from '@/types/event';
import { Searchbar } from '@/components/ui';
import { GreetingSection, QuickActions, EventList, useHomeEvents } from '@/features/home';

// Substitua pela fonte real: contexto de auth, session, etc.
const USER = { name: 'João' };

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const { filteredEvents } = useHomeEvents();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/event/search?code=${encodeURIComponent(code.trim())}`);
    }
  }

  function handleEventClick(event: Event) {
    router.push(`/event/${event.id}`);
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
        {/* form captura o Enter nativamente */}
        <form onSubmit={handleSubmit}>
          <Searchbar value={code} onChange={setCode} placeholder="cód. do evento" />
        </form>

        <GreetingSection userName={USER.name} />
        <QuickActions />
        <EventList
          events={filteredEvents}
          onEventClick={handleEventClick}
        />
      </Box>
    </Box>
  );
}
