"use client";

import { Box } from "@mui/material";
import { Event } from "@/types/event";
import { useRouter } from 'next/navigation';
import { Searchbar, } from "@/components/ui";
import { 
  GreetingSection,
  QuickActions,
  EventList,
  useHomeEvents,
} from "@/features/home";

// Substitua pela fonte real: contexto de auth, session, etc.
const USER = { name: "João" };

export default function HomePage() {
  const router = useRouter();
  const { search, setSearch, filteredEvents } = useHomeEvents();

  function handleEventClick(event: Event) {
    router.push(`/event/${event.id}`);
  }

  return (
    <Box sx={{ minHeight: "100dvh", 
    bgcolor: "background.default" }}>

      <Box sx={{ 
        maxWidth: 1200, 
        mx: "auto", 
        px: 3,
        py: 3, 
        }}>

        <Searchbar value={search} onChange={setSearch} />
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
