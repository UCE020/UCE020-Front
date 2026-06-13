'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityModal, ScheduleCard } from '@/components/modals';
import { ContentCard } from '@/components/layout/ContentCard';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_EVENTS } from '@/mocks/event';
import { buildListParticipantsPath } from '@/features/participants/presence/utils/routes';
import { useMockUser } from '@/mocks/useMockUser';
import { registrationService } from '@/services/registrationService';
import { getActivityModalVariant } from '@/features/event/utils/getActivityModalVariant';
import { ParticipantQrCodeModal } from '@/features/participants/presence/components/ParticipantQrCodeModal';
import { EventActivitiesSection } from './EventActivitiesSection';
import { OrganizerEventActions } from './OrganizerEventActions';
import type { Activity } from '@/types/activity';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { colorTokens } from '@/lib/colors';

interface EventDetailViewProps {
  eventId: string;
}

export function EventDetailView({ eventId }: EventDetailViewProps) {
  const router = useRouter();
  const mockUser = useMockUser();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [registrationUpdate, setRegistrationUpdate] = useState(0);
  const event = MOCK_EVENTS[eventId as keyof typeof MOCK_EVENTS];

  if (!event) {
    return (
      <AppPageContainer
        sx={{
          borderRadius: '28px',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <p>Evento não encontrado</p>
      </AppPageContainer>
    );
  }

  const role = mockUser.role;
  const isOrganizer = role === 'organizer';
  const isActivityEnrolled = selectedActivity
    ? registrationService.isRegistered(eventId, selectedActivity.id, mockUser.id)
    : false;

  const activityModalVariant = getActivityModalVariant(role, isActivityEnrolled);

  function handleSignup() {
    if (!selectedActivity) return;
    registrationService.register(eventId, selectedActivity.id, mockUser.id);
    setRegistrationUpdate((prev) => prev + 1);
  }

  function handleCancelParticipation() {
    if (!selectedActivity) return;
    registrationService.unregister(eventId, selectedActivity.id, mockUser.id);
    setRegistrationUpdate((prev) => prev + 1);
  }

  function handleMarkPresence() {
    if (!selectedActivity) return;
    setIsQrModalOpen(true);
  }

  function goToListParticipants() {
    if (!selectedActivity) return;
    setSelectedActivity(null);
    setIsQrModalOpen(false);
    router.push(buildListParticipantsPath(eventId, selectedActivity.id));
  }

  const handleBack = () => {
    router.push('/home');
  };
  
  return (
    <AppPageContainer sx={{ gap: 3 }}>
      <IconButton
        onClick={handleBack}
        aria-label="Voltar"
        sx={{ alignSelf: 'flex-start', color: colorTokens.text.primary }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <ContentCard sx={{ borderRadius: '28px', gap: 0 }}>
        <ScheduleCard
          title={event.name}
          image={event.imageUrl}
          startDate={event.startDate}
          endDate={event.endDate}
          location={event.location}
          hours={event.hours}
          participantsCount={event.participantsCount}
          status={event.status}
          description={event.description}
        />

        {isOrganizer && <OrganizerEventActions />}

        <EventActivitiesSection
          activities={event.activities}
          onSelectActivity={setSelectedActivity}
        />
      </ContentCard>

      <ActivityModal
        open={!!selectedActivity}
        onClose={() => {
          setSelectedActivity(null);
          setIsQrModalOpen(false);
        }}
        title={selectedActivity?.title ?? ''}
        image={event.imageUrl}
        startDate={selectedActivity?.startDate ?? ''}
        endDate={selectedActivity?.endDate ?? ''}
        location={event.location}
        hours={event.hours}
        participantsCount={event.participantsCount}
        status={selectedActivity?.status ?? ''}
        description={selectedActivity?.description ?? ''}
        variant={activityModalVariant}
        onSignup={handleSignup}
        onCancelParticipation={handleCancelParticipation}
        onMarkPresence={handleMarkPresence}
        onValidatePresences={goToListParticipants}
        onListParticipants={goToListParticipants}
      />

      {selectedActivity && (
        <ParticipantQrCodeModal
          open={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          participantId={mockUser.id}
          participantName={mockUser.name}
          activityId={selectedActivity.id}
          activityTitle={selectedActivity.title}
          eventId={eventId}
        />
      )}
    </AppPageContainer>
  );
}
