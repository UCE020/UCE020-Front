import { Box, Typography, IconButton } from '@mui/material';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import { colorTokens } from '@/lib/colors';
import type { Participant } from '@/types/participant';
import { PresenceStatusIcon } from './PresenceStatusIcon';

interface ParticipantRowProps {
  participant: Participant;
  showQrAction?: boolean;
  onValidateParticipant?: (participantId: string) => void;
}

export function ParticipantRow({
  participant,
  showQrAction = false,
  onValidateParticipant,
}: ParticipantRowProps) {
  return (
    <Box
      sx={{
        bgcolor: colorTokens.neutral.white,
        borderRadius: '12px',
        p: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        border: `1px solid ${colorTokens.neutral.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <Typography
        sx={{
          flex: 1,
          fontWeight: 500,
          fontSize: 'clamp(12px, 3vw, 14px)',
          color: colorTokens.text.primary,
        }}
      >
        {participant.name}
      </Typography>

      {showQrAction && participant.presenceStatus === 'pending' && (
        <IconButton
          onClick={() => onValidateParticipant?.(participant.id)}
          aria-label={`Validar presença de ${participant.name}`}
          sx={{ p: 0 }}
        >
          <QrCode2RoundedIcon sx={{ fontSize: 20, color: colorTokens.navigation.default }} />
        </IconButton>
      )}

      <PresenceStatusIcon status={participant.presenceStatus} />
    </Box>
  );
}
