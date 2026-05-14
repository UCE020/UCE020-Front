"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

import { AppDrawer, TopBar } from "@/components/layout";
import {
  SearchBar,
  GreetingSection,
  QuickActions,
  EventList,
  useHomeEvents,
} from "@/features/home";

// Substitua pela fonte real: contexto de auth, session, etc.
const USER_NAME = "João";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { search, setSearch, filteredEvents } = useHomeEvents();

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeHref={pathname}
      />

      <TopBar onMenuClick={() => setDrawerOpen(true)} />

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <SearchBar value={search} onChange={setSearch} />
        <GreetingSection userName={USER_NAME} />
        <QuickActions />
        <EventList
          events={filteredEvents}
          onEventClick={(e) => console.log("Evento clicado:", e.id)}
        />
      </Box>
    </Box>
  );
}
