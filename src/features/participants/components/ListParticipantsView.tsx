'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { useMockUser } from '@/mocks/useMockUser';
import { unconfirmParticipantForActivity } from '@/mocks/participants-storage';
import { requirePresenceContext } from '@/features/participants/presence/utils/resolvePresenceContext';
import { getParticipantsForActivity } from '@/features/participants/presence/utils/getParticipantsForActivity';
import { buildValidatePresencePath } from '@/features/participants/presence/utils/routes';
import { PresenceContextMissing } from '@/features/participants/presence/components/PresenceContextMissing';
import { ParticipantsListCard } from '@/features/participants/components/ParticipantsListCard';
import { PresenceActionModals } from '@/features/participants/presence/components/PresenceActionModals';
import { ValidatePresencesButton } from '@/features/participants/components/ValidatePresencesButton';
import { filterParticipants, togglePresenceFilter } from '@/features/participants/utils/filterParticipants';
import type { Participant, PresenceFilter } from '@/types/participant';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { colorTokens } from '@/lib/colors';

export function ListParticipantsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mockUser = useMockUser();
  const context = requirePresenceContext(
    searchParams.get('eventId'),
    searchParams.get('activityId'),
  );

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState('');
  const [presenceFilter, setPresenceFilter] = useState<PresenceFilter>('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  useEffect(() => {
    if (!context) {
      return;
    }

    const { eventId, activityId } = context;

    function refresh() {
      setParticipants(getParticipantsForActivity(eventId, activityId));
    }

    refresh();
    window.addEventListener('pageshow', refresh);
    return () => window.removeEventListener('pageshow', refresh);
  }, [context?.eventId, context?.activityId]);

  if (!context) {
    return <PresenceContextMissing />;
  }

  const { eventId, activityId, activityTitle } = context;
  const isMonitor = mockUser.role === 'monitor';
  const canEditPresence = isMonitor || mockUser.role === 'organizer';
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
    setRemoveModalOpen(true);
  }

  function closeRemoveModal() {
    setRemoveModalOpen(false);
    setSelectedParticipant(null);
  }

  async function handleRemovePresence() {
    if (!selectedParticipant) return;

    unconfirmParticipantForActivity(eventId, activityId, selectedParticipant.id);
    setParticipants(getParticipantsForActivity(eventId, activityId));
    closeRemoveModal();
  }

  const handleBack = () => {
    router.push(`/event/${eventId}`);
  };
  
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

      <ParticipantsListCard
        participants={filteredParticipants}
        search={search}
        presenceFilter={presenceFilter}
        showQrAction={isMonitor}
        showEditAction={canEditPresence}
        onSearchChange={setSearch}
        onFilterToggle={handleFilterToggle}
        onValidateParticipant={isMonitor ? goToValidatePresence : undefined}
        onEditPresence={canEditPresence ? openRemoveModal : undefined}
      />

      <PresenceActionModals
        participantName={selectedParticipant?.name ?? null}
        activityTitle={activityTitle}
        confirmOpen={false}
        removeOpen={removeModalOpen}
        onCloseConfirm={() => undefined}
        onCloseRemove={closeRemoveModal}
        onConfirmPresence={() => undefined}
        onRemovePresence={handleRemovePresence}
      />
    </AppPageContainer>
  );
}
