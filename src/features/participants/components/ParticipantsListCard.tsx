import { Box, Typography } from '@mui/material';
import { ContentCard } from '@/components/layout/ContentCard';
import { colorTokens } from '@/lib/colors';
import type { Participant, PresenceFilter } from '@/types/participant';
import { ParticipantsSearchBar } from './ParticipantsSearchBar';
import { ParticipantRow } from './ParticipantRow';

interface ParticipantsListCardProps {
  participants: Participant[];
  search: string;
  presenceFilter: PresenceFilter;
  isMonitor: boolean;
  onSearchChange: (value: string) => void;
  onFilterToggle: (filter: Exclude<PresenceFilter, 'all'>) => void;
  onValidateParticipant?: (participantId: string) => void;
}

export function ParticipantsListCard({
  participants,
  search,
  presenceFilter,
  isMonitor,
  onSearchChange,
  onFilterToggle,
  onValidateParticipant,
}: ParticipantsListCardProps) {
  return (
    <ContentCard>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 20,
          color: colorTokens.navigation.default,
        }}
      >
        Participantes
      </Typography>

      <ParticipantsSearchBar
        search={search}
        presenceFilter={presenceFilter}
        onSearchChange={onSearchChange}
        onFilterToggle={onFilterToggle}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {participants.length === 0 ? (
          <Typography
            sx={{ fontSize: 14, color: colorTokens.neutral.gray500, py: 2, textAlign: 'center' }}
          >
            Nenhum participante encontrado
          </Typography>
        ) : (
          participants.map((participant) => (
            <ParticipantRow
              key={participant.id}
              participant={participant}
              showQrAction={isMonitor}
              onValidateParticipant={onValidateParticipant}
            />
          ))
        )}
      </Box>
    </ContentCard>
  );
}
