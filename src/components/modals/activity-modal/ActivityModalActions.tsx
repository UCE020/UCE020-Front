import { Box } from '@mui/material';
import { Button } from '@/components/ui';
import type { ActivityModalProps } from '@/types/activity';

type ActivityModalActionsProps = Pick<
  ActivityModalProps,
  | 'variant'
  | 'onSignup'
  | 'onCancelParticipation'
  | 'onMarkPresence'
  | 'onValidatePresences'
  | 'onListParticipants'
>;

const actionButtonSx = {
  height: 40,
  fontSize: 'clamp(12px, 3vw, 14px)',
  minWidth: 160,
} as const;

export function ActivityModalActions({
  variant,
  onSignup,
  onCancelParticipation,
  onMarkPresence,
  onValidatePresences,
  onListParticipants,
}: ActivityModalActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        mt: 2,
        justifyContent: 'flex-end',
      }}
    >
      {variant === 'signup' && (
        <Button sx={actionButtonSx} onClick={onSignup}>
          Inscrever-se
        </Button>
      )}

      {variant === 'manage' && (
        <>
          <Button
            sx={actionButtonSx}
            variant="outlined"
            onClick={onCancelParticipation}
          >
            Cancelar participação
          </Button>

          <Button sx={actionButtonSx} onClick={onMarkPresence}>
            Marcar Presença
          </Button>
        </>
      )}

      {variant === 'monitor' && (
        <Button sx={actionButtonSx} onClick={onValidatePresences}>
          Validar Presenças
        </Button>
      )}

      {variant === 'organizer' && (
        <Button sx={actionButtonSx} onClick={onListParticipants}>
          Participantes
        </Button>
      )}
    </Box>
  );
}