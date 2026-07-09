'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton, CircularProgress, Box } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { Toast } from '@/components/ui';
import { useAuth } from '@/providers/auth-provider';
import { participationService, type TipoParticipante } from '@/services/participationService';
import { presenceService } from '@/services/presenceService';
import { ToastSeverity } from '@/types/toast';
import { requirePresenceContext } from '@/features/participants/presence/utils/resolvePresenceContext';
import { buildValidatePresencePath } from '@/features/participants/presence/utils/routes';
import { PresenceContextMissing } from '@/features/participants/presence/components/PresenceContextMissing';
import { RemovePresenceModal } from '@/features/participants/presence/components/RemovePresenceModal';
import { ParticipantsListCard } from '@/features/participants/components/ParticipantsListCard';
import { ParticipantPresenceActions } from '@/features/participants/components/ParticipantPresenceActions';
import { ValidatePresencesButton } from '@/features/participants/components/ValidatePresencesButton';
import {
  filterParticipants,
  togglePresenceFilter,
} from '@/features/participants/utils/filterParticipants';
import { colorTokens } from '@/lib/colors';
import type { Participant, PresenceFilter } from '@/types/participant';

const TIPO_TO_ROLE: Record<TipoParticipante, 'organizer' | 'monitor' | 'participant'> = {
  organizador: 'organizer',
  monitor: 'monitor',
  participante: 'participant',
};

export function ListParticipantsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const eventIdParam = searchParams.get('eventId');
  const activityIdParam = searchParams.get('activityId');

  const [context, setContext] = useState(() =>
    requirePresenceContext(eventIdParam, activityIdParam),
  );

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState('');
  const [presenceFilter, setPresenceFilter] = useState<PresenceFilter>('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(true);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [participantType, setParticipantType] = useState<TipoParticipante | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: ToastSeverity }>({
    open: false,
    message: '',
    severity: ToastSeverity.Success,
  });

  useEffect(() => {
    const fallbackContext = requirePresenceContext(eventIdParam, activityIdParam);

    let isMounted = true;

    void import('@/features/participants/presence/utils/resolvePresenceContext').then(({ fetchPresenceContext }) => {
      void fetchPresenceContext(eventIdParam, activityIdParam).then((resolvedContext) => {
        if (isMounted) {
          setContext(resolvedContext ?? fallbackContext);
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, [eventIdParam, activityIdParam]);

  // Busca o tipo de participação do usuário logado naquele evento
  useEffect(() => {
    if (!context?.eventId) return;

    const numericEventId = Number(context.eventId);
    if (!Number.isFinite(numericEventId)) return;

    let isMounted = true;

    participationService
      .getTipoParticipante(numericEventId)
      .then((tipo) => {
        if (isMounted) {
          setParticipantType(tipo);
        }
      })
      .catch(() => {
        if (isMounted) {
          setParticipantType(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingRole(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [context?.eventId, user?.id]);

  // Busca os participantes da atividade
  useEffect(() => {
    if (!context?.eventId || !context?.activityId) return;

    const numericEventId = Number(context.eventId);
    const numericActivityId = Number(context.activityId);

    if (!Number.isFinite(numericEventId) || !Number.isFinite(numericActivityId)) return;

    let isMounted = true;

    queueMicrotask(() => {
      if (isMounted) {
        setIsLoadingParticipants(true);
        setError(null);
      }
    });

    participationService
      .getActivityParticipants(numericEventId, numericActivityId)
      .then((data) => {
        if (isMounted) {
          setParticipants(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar participantes';
          setError(errorMessage);
          setParticipants([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingParticipants(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [context?.eventId, context?.activityId]);

  if (!context) {
    return <PresenceContextMissing />;
  }

  const { eventId, activityId, activityTitle } = context;
  const role = participantType ? TIPO_TO_ROLE[participantType] : 'participant';
  const isMonitor = role === 'monitor';
  const canEditPresence = isMonitor || role === 'organizer';
  const filteredParticipants = filterParticipants(participants, search, presenceFilter);

  function handleFilterToggle(filter: Exclude<PresenceFilter, 'all'>) {
    setPresenceFilter((current) => togglePresenceFilter(current, filter));
  }

  function goToValidatePresence() {
    router.push(buildValidatePresencePath(eventId, activityId));
  }

  function openRemoveModal(participantId: string) {
    const participant = participants.find((item) => item.id === participantId);

    if (!participant || participant.presenceStatus !== 'confirmed') return;

    setSelectedParticipant(participant);
  }

  function closeRemoveModal() {
    setSelectedParticipant(null);
  }

  async function handleRemovePresence() {
    if (!selectedParticipant || !context?.eventId || !context?.activityId) return;

    try {
      await presenceService.removePresence({
        participantId: selectedParticipant.id,
        eventId: context.eventId,
        activityId: context.activityId,
      });

      setParticipants((current) =>
        current.map((participant) =>
          participant.id === selectedParticipant.id
            ? { ...participant, presenceStatus: 'pending' }
            : participant,
        ),
      );
      setError(null);
      setToast({
        open: true,
        message: 'Presença removida com sucesso.',
        severity: ToastSeverity.Success,
      });
      closeRemoveModal();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover presença';
      setToast({
        open: true,
        message: errorMessage,
        severity: ToastSeverity.Error,
      });
      console.error(errorMessage);
    }
  }

  function renderParticipantActions(participant: Participant) {
    return (
      <ParticipantPresenceActions
        participant={participant}
        canValidatePresence={isMonitor}
        canEditPresence={canEditPresence}
        onValidatePresence={goToValidatePresence}
        onRemovePresence={openRemoveModal}
      />
    );
  }

  function handleBack() {
    router.push(`/event/${eventId}`);
  }

  const isLoading = isLoadingParticipants || isLoadingRole;

  return (
    <AppPageContainer>
      <IconButton
        onClick={handleBack}
        aria-label="Voltar"
        sx={{ alignSelf: 'flex-start', color: colorTokens.text.primary }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      {isMonitor && <ValidatePresencesButton onClick={goToValidatePresence} />}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ color: 'error.main', textAlign: 'center', py: 2 }}>
          {error}
        </Box>
      ) : (
        <ParticipantsListCard
          participants={filteredParticipants}
          search={search}
          presenceFilter={presenceFilter}
          onSearchChange={setSearch}
          onFilterToggle={handleFilterToggle}
          renderParticipantActions={renderParticipantActions}
        />
      )}

      <RemovePresenceModal
        open={!!selectedParticipant}
        participantName={selectedParticipant?.name ?? null}
        activityTitle={activityTitle}
        onClose={closeRemoveModal}
        onConfirm={handleRemovePresence}
      />
    </AppPageContainer>
  );
}