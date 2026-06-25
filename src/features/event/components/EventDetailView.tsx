'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ActivityModal, ScheduleCard } from '@/components/modals';
import { ContentCard } from '@/components/layout/ContentCard';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { buildListParticipantsPath } from '@/features/participants/presence/utils/routes';
import { useMockUser } from '@/mocks/useMockUser';
import { registrationService } from '@/services/registrationService';
import { eventService } from '@/services/eventService';
import { getActivityModalVariant } from '@/features/event/utils/getActivityModalVariant';
import { ParticipantQrCodeModal } from '@/features/participants/presence/components/ParticipantQrCodeModal';
import { colorTokens } from '@/lib/colors';
import { EventActivitiesSection } from './EventActivitiesSection';
import { OrganizerEventActions } from './OrganizerEventActions';
import type { Activity } from '@/types/activity';
import type { Event } from '@/types/event';

interface EventDetailViewProps {
  eventId: string;
}

export function EventDetailView({ eventId }: EventDetailViewProps) {
  const router = useRouter();
  const mockUser = useMockUser();

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isActivityEnrolled, setIsActivityEnrolled] = useState(false);

  const event = MOCK_EVENTS[eventId as keyof typeof MOCK_EVENTS];

  if (!event) {
    return <div>Evento não encontrado</div>;
  }

  const role = mockUser.role;
  const isOrganizer = role === 'organizer';
  const activityModalVariant = getActivityModalVariant(role, isActivityEnrolled);
  const activities: Activity[] = [];

  async function handleSignup() {
    if (!selectedActivity) return;

    try {
      await registrationService.register(eventId, selectedActivity.id, mockUser.id);
      setIsActivityEnrolled(true);
    } catch (error) {
      console.error('Erro ao realizar inscrição:', error);
    }
  }

  async function handleCancelParticipation() {
    if (!selectedActivity) return;

    try {
      await registrationService.unregister(eventId, selectedActivity.id, mockUser.id);
      setIsActivityEnrolled(false);
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
    }
  }

  function handleMarkPresence() {
    if (!selectedActivity) return;
    setIsQrModalOpen(true);
  }

  function goToListParticipants() {
    if (!selectedActivity) return;

    const activityId = selectedActivity.id;

    setSelectedActivity(null);
    setIsQrModalOpen(false);
    router.push(buildListParticipantsPath(eventId, activityId));
  }

  function handleBack() {
    router.push('/home');
  }

  function handleSelectActivity(activity: Activity) {
    setSelectedActivity(activity);
    setIsQrModalOpen(false);
    setIsActivityEnrolled(false);
  }

  function handleSelectActivity(activity: Activity) {
    setSelectedActivity(activity);
    setIsQrModalOpen(false);
    setIsActivityEnrolled(false);
  }

  return (
    <AppPageContainer>
      <ContentCard
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: colorTokens.surface,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{ alignSelf: 'flex-start' }}
          aria-label="Voltar"
        >
          <ArrowBackRoundedIcon />
        </IconButton>

        <ScheduleCard
          title={event.nome}
          image={event.foto ?? undefined}
          startDate={event.dataInicio}
          endDate={event.dataFim}
          location={event.localizacao}
          hours={event.cargaHoraria}
          participantsCount={0}
          status={event.status}
          description={event.descricao}
        />

        {isOrganizer && <OrganizerEventActions eventId={eventId} />}

        <EventActivitiesSection
<<<<<<< HEAD
          activities={event.activities}
          onSelectActivity={handleSelectActivity}
        />
      </ContentCard>

      {selectedActivity ? (
        <ActivityModal
          open
          onClose={() => {
            setSelectedActivity(null);
            setIsQrModalOpen(false);
          }}
          title={selectedActivity.title ?? ''}
          image={event.imageUrl}
          startDate={selectedActivity.startDate ?? ''}
          endDate={selectedActivity.endDate ?? selectedActivity.startDate ?? ''}
          location={event.location}
          hours={event.hours}
          participantsCount={event.participantsCount}
          status={event.status}
          description={event.description}
        />

        {isOrganizer && <OrganizerEventActions />}

        <EventActivitiesSection
          activities={event.activities}
          onSelectActivity={handleSelectActivity}
        />
      </ContentCard>

      {selectedActivity ? (
        <ActivityModal
          open
          onClose={() => {
            setSelectedActivity(null);
            setIsQrModalOpen(false);
          }}
          title={selectedActivity.title ?? ''}
          image={event.imageUrl}
          startDate={selectedActivity.startDate ?? ''}
          endDate={selectedActivity.endDate ?? selectedActivity.startDate ?? ''}
          location={event.location}
          hours={event.hours}
          participantsCount={event.participantsCount}
          status={selectedActivity.status ?? ''}
          description={selectedActivity.description ?? ''}
          variant={activityModalVariant}
          onSignup={handleSignup}
          onCancelParticipation={handleCancelParticipation}
          onMarkPresence={handleMarkPresence}
          onValidatePresences={goToListParticipants}
          onListParticipants={goToListParticipants}
        />
      ) : null}

      {selectedActivity ? (
        <ParticipantQrCodeModal
          open={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          payload={{
            participantId: mockUser.id,
            participantName: mockUser.name,
            activityId: selectedActivity.id,
            activityTitle: selectedActivity.title ?? '',
            eventId,
          }}
        />
      ) : null}
    </AppPageContainer>
  );
}