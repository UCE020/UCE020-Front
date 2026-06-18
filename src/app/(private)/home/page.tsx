'use client';

import { useState, useEffect, useReducer, useCallback } from 'react';
import { Box } from '@mui/material';
import { Event } from '@/types/event';
import { Searchbar, Toast } from '@/components/ui';
import { EventList } from '@/components/event';
import { ToastSeverity } from '@/types/toast';
import { ActivityModal } from '@/components/modals';
import { GreetingSection, QuickActions, useHomeEvents } from '@/features/home';
import { useAuth } from '@/providers/auth-provider';
import { eventService } from '@/services/eventService';

type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; event: Event }
  | { status: 'not_found' };

type SearchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; event: Event }
  | { type: 'FETCH_NOT_FOUND' }
  | { type: 'RESET' };

function searchReducer(_: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'FETCH_START': return { status: 'loading' };
    case 'FETCH_SUCCESS': return { status: 'success', event: action.event };
    case 'FETCH_NOT_FOUND': return { status: 'not_found' };
    case 'RESET': return { status: 'idle' };
  }
}

export default function HomePage() {
  const { user } = useAuth();
  const { filteredEvents } = useHomeEvents();
  const [code, setCode] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [searchState, dispatch] = useReducer(searchReducer, { status: 'idle' });

  useEffect(() => {
    if (!searchCode) {
      dispatch({ type: 'RESET' });
      return;
    }

    dispatch({ type: 'FETCH_START' });
    const controller = new AbortController();

    eventService
      .findByCodigo(searchCode)
      .then((event) => {
        if (!controller.signal.aborted) {
          dispatch({ type: 'FETCH_SUCCESS', event });
          setModalOpen(true);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          dispatch({ type: 'FETCH_NOT_FOUND' });
          setToastOpen(true);
          setSearchCode('');
        }
      });

    return () => controller.abort();
  }, [searchCode]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed) setSearchCode(trimmed);
  }, [code]);

  function handleEventClick() {
    setModalOpen(false);
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
        <form onSubmit={handleSubmit}>
          <Searchbar value={code} onChange={setCode} placeholder="cód. do evento" />
        </form>

        <GreetingSection userName={user?.name?.split(' ')[0] || 'Usuário'} />
        <QuickActions />
        <EventList
          events={filteredEvents}
          onEventClick={handleEventClick}
        />
      </Box>

      <Toast
        open={toastOpen}
        message="Evento não encontrado. Verifique o código e tente novamente."
        severity={ToastSeverity.Warning}
        onClose={() => { setToastOpen(false); setCode(''); }}
      />

      {searchState.status === 'success' && (
        <ActivityModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setSearchCode(''); setCode(''); dispatch({ type: 'RESET' }); }}
          title={searchState.event.nome}
          image={searchState.event.foto ?? undefined}
          startDate={new Date(searchState.event.dataInicio).toLocaleDateString('pt-BR')}
          endDate={new Date(searchState.event.dataFim).toLocaleDateString('pt-BR')}
          location={searchState.event.localizacao}
          hours={searchState.event.cargaHoraria}
          participantsCount={0}
          status={searchState.event.status}
          description={searchState.event.descricao}
          variant="signup"
          onSignup={() => console.log('Inscrever:', searchState.event.id)}
        />
      )}
    </Box>
  );
}
