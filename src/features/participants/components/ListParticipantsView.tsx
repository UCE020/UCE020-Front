'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_ACTIVITY_CONTEXT } from '@/mocks/activity-context';
import {
  loadParticipants,
  updateParticipantStatus,
} from '@/mocks/participants-storage';
import { MOCK_USER } from '@/mocks/user';
import { ParticipantsListCard } from './ParticipantsListCard';
import { PresenceActionModals } from './PresenceActionModals';
import { ValidatePresencesButton } from './ValidatePresencesButton';
import { filterParticipants, togglePresenceFilter } from '../utils/filterParticipants';
import type { Participant, PresenceFilter } from '@/types/participant';

export function ListParticipantsView() {
  const router = useRouter();
  const isMonitor = MOCK_USER.role === 'monitor';
  const canEditPresence = isMonitor || MOCK_USER.role === 'organizer';

  const [participants, setParticipants] = useState<Participant[]>(() => loadParticipants());
  const [search, setSearch] = useState('');
  const [presenceFilter, setPresenceFilter] = useState<PresenceFilter>('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const filteredParticipants = filterParticipants(participants, search, presenceFilter);

  function handleFilterToggle(filter: Exclude<PresenceFilter, 'all'>) {
    setPresenceFilter((current) => togglePresenceFilter(current, filter));
  }

  function goToValidatePresence(participantId?: string) {
    const path = participantId
      ? `${'/list-participants/validate'}?participantId=${participantId}`
      : '/list-participants/validate';
    router.push(path);
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
    setParticipants(updateParticipantStatus(selectedParticipant.id, 'pending'));
    closeRemoveModal();
  }

  return (
    <AppPageContainer>
      {isMonitor && <ValidatePresencesButton onClick={() => goToValidatePresence()} />}

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
        activityTitle={MOCK_ACTIVITY_CONTEXT.activityTitle}
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
