'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityModal } from '@/components/modals';
import { ContentCard } from '@/components/layout/ContentCard';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { ScheduleCard } from '@/components/ScheduleCard';
import { MOCK_EVENT } from '@/mocks/event';
import { MOCK_USER } from '@/mocks/user';
import {
  EventActivitiesSection,
  OrganizerEventActions,
  getActivityModalVariant,
} from '@/features/event';
import type { Activity } from '@/types/activity';


export default function EventPage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [enrolledActivities, setEnrolledActivities] = useState<string[]>([]);

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

  function handleValidatePresences() {
    if (!selectedActivity) return;
    setSelectedActivity(null);
    router.push('/list-participants');
  }

  function handleListParticipants() {
    if (!selectedActivity) return;
    setSelectedActivity(null);
    router.push('/list-participants');
  }

  return (
    <AppPageContainer sx={{ gap: 3 }}>
      <ContentCard sx={{ borderRadius: '24px', gap: 0 }}>
        <ScheduleCard
          title={MOCK_EVENT.name}
          image={MOCK_EVENT.imageUrl}
          startDate={MOCK_EVENT.startDate}
          endDate={MOCK_EVENT.endDate}
          location={MOCK_EVENT.location}
          hours={MOCK_EVENT.hours}
          participantsCount={MOCK_EVENT.participantsCount}
          status={MOCK_EVENT.status}
          description={MOCK_EVENT.description}
        />

        {isOrganizer && <OrganizerEventActions />}

        <EventActivitiesSection
          activities={MOCK_EVENT.activities}
          onSelectActivity={setSelectedActivity}
        />
      </ContentCard>

      <ActivityModal
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.title ?? ''}
        image={MOCK_EVENT.imageUrl}
        startDate={selectedActivity?.startDate ?? ''}
        endDate={selectedActivity?.endDate ?? ''}
        location={MOCK_EVENT.location}
        hours={MOCK_EVENT.hours}
        participantsCount={MOCK_EVENT.participantsCount}
        status={selectedActivity?.status ?? ''}
        description={selectedActivity?.description ?? ''}
        variant={activityModalVariant}
        onSignup={handleSignup}
        onCancelParticipation={handleCancelParticipation}
        onMarkPresence={handleMarkPresence}
        onValidatePresences={handleValidatePresences}
        onListParticipants={handleListParticipants}
      />
    </AppPageContainer>
  );
}
