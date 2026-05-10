import { Box, Button } from '@mui/material';
import type { ActivityActionsProps } from '@/types/activity';

const buttonStyleProps = {
  height: 36,
  fontSize: 'clamp(10px, 3vw, 12px)',
};

export function ActivityActions({
  variant,
  onSignup,
  onCancelParticipation,
  onMarkPresence,
}: ActivityActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 1,
        width: '100%',
        mt: 'auto',
      }}
    >
      {variant === 'signup' ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={onSignup}
          fullWidth
          sx={{
            ...buttonStyleProps,
            maxWidth: 160,
          }}
        >
          Inscrever-se
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancelParticipation}
            sx={{
              ...buttonStyleProps,
              flex: 1,
            }}
          >
            Cancelar participação
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onMarkPresence}
            sx={{
              ...buttonStyleProps,
              flex: 1,
            }}
          >
            Marcar Presença
          </Button>
        </>
      )}
    </Box>
  );
}
