import { Box, Typography, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import { colorTokens } from '@/lib/colors';
import {
  managementIconButtonSx,
  managementListNameSx,
  managementListRowSx,
} from '@/features/management/components/listRowStyles';
import type { Participant } from '@/types/participant';
import { PresenceStatusIcon } from './PresenceStatusIcon';

interface ParticipantRowProps {
  participant: Participant;
  showQrAction?: boolean;
  showEditAction?: boolean;
  onValidateParticipant?: (participantId: string) => void;
  onEditPresence?: (participantId: string) => void;
}

export function ParticipantRow({
  participant,
  showQrAction = false,
  showEditAction = false,
  onValidateParticipant,
  onEditPresence,
}: ParticipantRowProps) {
  const isConfirmed = participant.presenceStatus === 'confirmed';

  return (
    <Box sx={managementListRowSx}>
      <Typography sx={managementListNameSx}>{participant.name}</Typography>

      {showQrAction && participant.presenceStatus === 'pending' && (
        <IconButton
          onClick={() => onValidateParticipant?.(participant.id)}
          aria-label={`Validar presença de ${participant.name}`}
          sx={managementIconButtonSx}
        >
          <QrCode2RoundedIcon sx={{ fontSize: 20, color: colorTokens.navigation.default }} />
        </IconButton>
      )}

      {showEditAction && isConfirmed && (
        <IconButton
          onClick={() => onEditPresence?.(participant.id)}
          aria-label={`Remover presença de ${participant.name}`}
          sx={managementIconButtonSx}
        >
          <EditOutlinedIcon sx={{ fontSize: 20, color: colorTokens.navigation.default }} />
        </IconButton>
      )}

      <PresenceStatusIcon status={participant.presenceStatus} />
    </Box>
  );
}
