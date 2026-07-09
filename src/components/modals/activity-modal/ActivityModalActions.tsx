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
  | 'isLoading'
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
  isLoading,
}: ActivityModalActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        mt: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {variant === 'signup' && (
        <Button sx={actionButtonSx} onClick={onSignup} disabled={Boolean(isLoading)}>
          Inscrever-se
        </Button>
      )}

      {variant === 'manage' && (
        <>
          <Button
            sx={actionButtonSx}
            variant="outlined"
            onClick={onCancelParticipation}
            disabled={Boolean(isLoading)}
          >
            Cancelar participação
          </Button>

          <Button sx={actionButtonSx} onClick={onMarkPresence} disabled={Boolean(isLoading)}>
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