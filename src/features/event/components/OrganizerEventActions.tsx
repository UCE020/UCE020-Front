'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { Box } from '@mui/material';
import { Button } from '@/components/ui';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { eventService } from '@/services/eventService';

const actionButtonSx = {
  height: 36,
  fontSize: 'clamp(10px, 3vw, 12px)',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  flex: 1
} as const;

interface OrganizerEventActionsProps {
  eventId: number;
  isFinalized?: boolean;
  onFinalized?: () => void;
  onFinalizeError?: (message: string) => void;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error) && typeof error.response?.data?.message === 'string') {
    return error.response.data.message;
  }
  return fallback;
}

export function OrganizerEventActions({ eventId, isFinalized = false, onFinalized, onFinalizeError }: OrganizerEventActionsProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  function onManageMembers() {
    router.push('/manage-users');
  }

  function onEditEvent() {
    router.push('/event/edit');
  }

  async function onFinalizeEvent() {
    setIsFinalizing(true);
    try {
      await eventService.finalize(eventId);
      onFinalized?.();
      router.push(`/certificate/generated/${eventId}`);
    } catch (error) {
      onFinalizeError?.(extractErrorMessage(error, 'Não foi possível finalizar o evento'));
    } finally {
      setIsFinalizing(false);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={onManageMembers}
        sx={{ ...actionButtonSx }}
      >
        Gerenciar Membros
      </Button>
      {!isFinalized && (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={onEditEvent}
          sx={{ ...actionButtonSx }}
        >
          Editar
        </Button>
      )}
      {!isFinalized && (
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => setIsConfirmOpen(true)}
          sx={{ ...actionButtonSx }}
        >
          Finalizar
        </Button>
      )}

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message="Tem certeza que deseja finalizar este evento?"
        emphasisEndText="Essa ação não pode ser desfeita."
        confirmText="Finalizar"
        cancelText="Cancelar"
        isLoading={isFinalizing}
        onConfirm={onFinalizeEvent}
        type="warning"
      />
    </Box>
  );
}
