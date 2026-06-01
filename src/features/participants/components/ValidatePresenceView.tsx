'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_ACTIVITY_CONTEXT } from '@/mocks/activity-context';
import { loadParticipants, updateParticipantStatus } from '@/mocks/participants-storage';
import { colorTokens } from '@/lib/colors';
import { PresenceValidationPanel } from './PresenceValidationPanel';
import { PresenceActionModals } from './PresenceActionModals';
import type { Participant } from '@/types/participant';

export function ValidatePresenceView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const participantId = searchParams.get('participantId');

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [scannedParticipant, setScannedParticipant] = useState<Participant | null>(null);

  function findParticipantById(id: string) {
    return loadParticipants().find((item) => item.id === id) ?? null;
  }

  function handleScan() {
    const participants = loadParticipants();
    const participant =
      (participantId && findParticipantById(participantId)) ||
      participants.find((item) => item.presenceStatus === 'pending') ||
      null;

    if (!participant) return;
    setScannedParticipant(participant);
    setConfirmModalOpen(true);
  }

  function closeConfirmModal() {
    setConfirmModalOpen(false);
    setScannedParticipant(null);
  }

  async function handleConfirmPresence() {
    if (!scannedParticipant) return;
    updateParticipantStatus(scannedParticipant.id, 'confirmed');
    closeConfirmModal();
    router.push('/list-participants');
  }

  return (
    <AppPageContainer>
      <IconButton
        onClick={() => router.push('/list-participants')}
        aria-label="Voltar"
        sx={{ alignSelf: 'flex-start', color: colorTokens.text.primary }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <PresenceValidationPanel onScan={handleScan} />

      <PresenceActionModals
        participantName={scannedParticipant?.name ?? null}
        activityTitle={MOCK_ACTIVITY_CONTEXT.activityTitle}
        confirmOpen={confirmModalOpen}
        removeOpen={false}
        onCloseConfirm={closeConfirmModal}
        onCloseRemove={() => undefined}
        onConfirmPresence={handleConfirmPresence}
        onRemovePresence={() => undefined}
      />
    </AppPageContainer>
  );
}
