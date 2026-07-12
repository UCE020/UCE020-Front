'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Button } from '@/components/ui';

const actionButtonSx = {
  height: 36,
  fontSize: 'clamp(10px, 3vw, 12px)',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  flex: 1,
} as const;

interface OrganizerEventActionsProps {
  eventId: number | string;
}

export function OrganizerEventActions({ eventId }: OrganizerEventActionsProps) {
  const router = useRouter();

  function onManageMembers() {
    router.push(`/event/${eventId}/manage-users`);
  }

  function onEditEvent() {
    router.push(`/event/${eventId}/edit`);
  }

  function onFinalizeEvent() {
    console.log('Finalizar evento');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        px: { xs: 2, sm: 3 },
        py: 2,
        justifyContent: 'flex-start',
      }}
    >
      <Button
        onClick={onManageMembers}
        variant="contained"
        color="secondary"
        sx={{ ...actionButtonSx, minWidth: 160, textTransform: 'none', borderRadius: '10px' }}
      >
        Gerenciar usuários
      </Button>

      <Button
        onClick={onEditEvent}
        variant="outlined"
        color="secondary"
        sx={{ ...actionButtonSx, minWidth: 160, textTransform: 'none', borderRadius: '10px' }}
      >
        Editar evento
      </Button>

      <Button
        onClick={onFinalizeEvent}
        variant="outlined"
        color="secondary"
        sx={{ ...actionButtonSx, minWidth: 160, textTransform: 'none', borderRadius: '10px' }}
      >
        Finalizar evento
      </Button>
    </Box>
  );
}