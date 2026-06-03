'use client';

import { ModalContainer, CloseButton } from '@/components/modals';
import { ScheduleCard } from '@/components';
import type { ActivityModalProps } from '@/types/activity';
import { ActivityModalActions } from './ActivityModalActions';

export default function ActivityModal({
  open,
  onClose,
  title,
  image,
  startDate,
  endDate,
  location,
  hours,
  participantsCount,
  status,
  description,
  variant,
  onSignup,
  onCancelParticipation,
  onMarkPresence,
  onValidatePresences,
  onListParticipants,
}: ActivityModalProps) {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <ScheduleCard
        title={title}
        image={image}
        startDate={startDate}
        endDate={endDate}
        location={location}
        hours={hours}
        participantsCount={participantsCount}
        status={status}
        description={description}
      />

      <ActivityModalActions
        variant={variant}
        onSignup={onSignup}
        onCancelParticipation={onCancelParticipation}
        onMarkPresence={onMarkPresence}
        onValidatePresences={onValidatePresences}
        onListParticipants={onListParticipants}
      />
    </ModalContainer>
  );
}
