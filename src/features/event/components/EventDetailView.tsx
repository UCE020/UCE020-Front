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
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [, setRegistrationUpdate] = useState(0);

  useEffect(() => {
    const numericEventId = Number(eventId);
    let isMounted = true;

    if (!Number.isFinite(numericEventId)) {
      Promise.resolve().then(() => {
        if (isMounted) {
          setSelectedActivity(null);
          setIsQrModalOpen(false);
          setEvent(null);
          setLoadError('Evento nao encontrado.');
          setIsLoadingEvent(false);
        }
      });
      return;
    }

    Promise.resolve().then(() => {
      if (isMounted) {
        setSelectedActivity(null);
        setIsQrModalOpen(false);
        setIsLoadingEvent(true);
        setLoadError('');
      }
    });

    eventService
      .findOne(numericEventId)
      .then((apiEvent) => {
        if (isMounted) {
          setEvent(apiEvent);
        }
      })
      .catch(() => {
        if (isMounted) {
          setEvent(null);
          setLoadError('Nao foi possivel carregar os dados do evento.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingEvent(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const role = mockUser.role;
  const isOrganizer = role === 'organizer';
  const isActivityEnrolled = selectedActivity
    ? registrationService.isRegistered(eventId, selectedActivity.id, mockUser.id)
    : false;

  const activityModalVariant = getActivityModalVariant(role, isActivityEnrolled);
  const activities: Activity[] = [];

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

  function handleBack() {
    router.push('/home');
  }

  if (isLoadingEvent) {
    return (
      <AppPageContainer
        sx={{
          borderRadius: '28px',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </AppPageContainer>
    );
  }

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
        <Typography sx={{ color: colorTokens.text.primary, fontWeight: 600 }}>
          {loadError || 'Evento nao encontrado.'}
        </Typography>
      </AppPageContainer>
    );
  }

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

        {isOrganizer && <OrganizerEventActions />}

        <EventActivitiesSection
          activities={activities}
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
        image={event.foto ?? undefined}
        startDate={selectedActivity?.startDate ?? ''}
        endDate={selectedActivity?.endDate ?? ''}
        location={event.localizacao}
        hours={event.cargaHoraria}
        participantsCount={0}
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
          payload={{
            participantId: mockUser.id,
            participantName: mockUser.name,
            activityId: selectedActivity.id,
            activityTitle: selectedActivity.title,
            eventId,
          }}
        />
      )}
    </AppPageContainer>
  );
}
