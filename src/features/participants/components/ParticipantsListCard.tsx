import type { Participant, PresenceFilter } from '@/types/participant';
import { ManagementListCard } from '@/features/management/components/ManagementListCard';
import { ParticipantsSearchBar } from './ParticipantsSearchBar';
import { ParticipantRow } from './ParticipantRow';

interface ParticipantsListCardProps {
  participants: Participant[];
  search: string;
  presenceFilter: PresenceFilter;
  showQrAction: boolean;
  showEditAction: boolean;
  onSearchChange: (value: string) => void;
  onFilterToggle: (filter: Exclude<PresenceFilter, 'all'>) => void;
  onValidateParticipant?: (participantId: string) => void;
  onEditPresence?: (participantId: string) => void;
}

export function ParticipantsListCard({
  participants,
  search,
  presenceFilter,
  showQrAction,
  showEditAction,
  onSearchChange,
  onFilterToggle,
  onValidateParticipant,
  onEditPresence,
}: ParticipantsListCardProps) {
  return (
    <ManagementListCard
      title="Participantes"
      searchRow={
        <ParticipantsSearchBar
          search={search}
          presenceFilter={presenceFilter}
          onSearchChange={onSearchChange}
          onFilterToggle={onFilterToggle}
        />
      }
      isEmpty={participants.length === 0}
      emptyMessage="Nenhum participante encontrado"
    >
      {participants.map((participant) => (
        <ParticipantRow
          key={participant.id}
          participant={participant}
          showQrAction={showQrAction}
          showEditAction={showEditAction}
          onValidateParticipant={onValidateParticipant}
          onEditPresence={onEditPresence}
        />
      ))}
    </ManagementListCard>
  );
}
