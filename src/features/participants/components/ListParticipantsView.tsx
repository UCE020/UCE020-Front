'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { ROUTES } from '@/constants/routes';
import { MOCK_PARTICIPANTS } from '@/mocks/participants';
import { MOCK_USER } from '@/mocks/user';
import { ParticipantsListCard } from './ParticipantsListCard';
import { ValidatePresencesButton } from './ValidatePresencesButton';
import { filterParticipants, togglePresenceFilter } from '../utils/filterParticipants';
import type { PresenceFilter } from '@/types/participant';

export function ListParticipantsView() {
  const router = useRouter();
  const isMonitor = MOCK_USER.role === 'monitor';

  const [search, setSearch] = useState('');
  const [presenceFilter, setPresenceFilter] = useState<PresenceFilter>('all');

  const filteredParticipants = filterParticipants(MOCK_PARTICIPANTS, search, presenceFilter);

  function handleFilterToggle(filter: Exclude<PresenceFilter, 'all'>) {
    setPresenceFilter((current) => togglePresenceFilter(current, filter));
  }

  function goToValidatePresence() {
    router.push('/list-participants/validate');
  }

  return (
    <AppPageContainer>
      {isMonitor && <ValidatePresencesButton onClick={goToValidatePresence} />}

      <ParticipantsListCard
        participants={filteredParticipants}
        search={search}
        presenceFilter={presenceFilter}
        isMonitor={isMonitor}
        onSearchChange={setSearch}
        onFilterToggle={handleFilterToggle}
        onValidateParticipant={isMonitor ? goToValidatePresence : undefined}
      />
    </AppPageContainer>
  );
}
