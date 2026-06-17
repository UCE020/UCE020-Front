'use client';

import Link from 'next/link';
import { Box } from '@mui/material';
import { Button } from '@/components/ui';

interface OrganizerEventActionsProps {
  eventId: string;
}

export function OrganizerEventActions({
  eventId,
}: OrganizerEventActionsProps) {
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
        component={Link}
        href={`/event/${eventId}/activity/create`}
        variant="contained"
        color="secondary"
        sx={{
          minWidth: 180,
          textTransform: 'none',
          borderRadius: '10px',
          fontWeight: 700,
        }}
      >
        Cadastrar atividade
      </Button>

      <Button
        component={Link}
        href={`/event/${eventId}/edit`}
        variant="outlined"
        color="secondary"
        sx={{
          minWidth: 160,
          textTransform: 'none',
          borderRadius: '10px',
          fontWeight: 700,
        }}
      >
        Editar evento
      </Button>
    </Box>
  );
}