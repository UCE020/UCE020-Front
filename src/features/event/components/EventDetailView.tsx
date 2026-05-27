'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityModal, ScheduleCard } from '@/components/modals';
import { ContentCard } from '@/components/layout/ContentCard';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_EVENTS } from '@/mocks/event';
import { MOCK_USER } from '@/mocks/user';
import { getActivityModalVariant } from '@/features/event/utils/getActivityModalVariant';
import { EventActivitiesSection } from './EventActivitiesSection';
import { OrganizerEventActions } from './OrganizerEventActions';
import type { Activity } from '@/types/activity';

interface EventDetailViewProps {
  eventId: string;
}

export function EventDetailView({ eventId }: EventDetailViewProps) {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [enrolledActivities, setEnrolledActivities] = useState<string[]>([]);
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

  const role = MOCK_USER.role;
  const isOrganizer = role === 'organizer';
  const isActivityEnrolled = selectedActivity
    ? enrolledActivities.includes(selectedActivity.id)
    : false;

  const activityModalVariant = getActivityModalVariant(role, isActivityEnrolled);

  function handleSignup() {
    if (!selectedActivity) return;
    setEnrolledActivities((current) => [...new Set([...current, selectedActivity.id])]);
  }

  function handleCancelParticipation() {
    if (!selectedActivity) return;
    setEnrolledActivities((current) => current.filter((id) => id !== selectedActivity.id));
  }

  function handleMarkPresence() {
    if (!selectedActivity) return;
    console.log(`Marcar presença: ${selectedActivity.title}`);
  }

  function goToListParticipants() {
    if (!selectedActivity) return;
    setSelectedActivity(null);
    router.push('/list-participants');
  }

  return (
    <AppPageContainer sx={{ gap: 3 }}>
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
        onClose={() => setSelectedActivity(null)}
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
    </AppPageContainer>
  );
}
