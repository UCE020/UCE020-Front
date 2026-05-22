'use client';

import { ModalContainer, CloseButton } from '@/components/modals';
import { ScheduleCard } from '@/components';
import { Button } from '@/components/ui';
import type { ActivityModalProps } from '@/types/activity';
import { Box } from '@mui/material';

export default function ActivityModal({
  open,
  onClose,
  title,
  image,
  startDate,
  endDate,
  location,
  hours,
  participantsCount,
  status,
  description,
  variant,
  onSignup,
  onCancelParticipation,
  onMarkPresence,
}: ActivityModalProps) {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <ScheduleCard
        title={title}
        image={image}
        startDate={startDate}
        endDate={endDate}
        location={location}
        hours={hours}
        participantsCount={participantsCount}
        status={status}
        description={description}
      />

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
              height: 36,
              fontSize: 'clamp(10px, 3vw, 12px)',
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
                height: 36,
                fontSize: 'clamp(10px, 3vw, 12px)',
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
                height: 36,
                fontSize: 'clamp(10px, 3vw, 12px)',
                flex: 1,
              }}
            >
              Marcar Presença
            </Button>
          </>
        )}
      </Box>
    </ModalContainer>
  );
}
