'use client';

import { Typography, Box } from '@mui/material';
import { ActivityImage, ActivityDetails, ActivityDescription, ActivityActions } from '@/components/modals/ActivityModal';
import { ModalContainer, CloseButton } from '@/components/modals';
import type { ActivityModalProps } from '@/types/activity';

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

      <Typography
        variant="h3"
        sx={{
          fontSize: 'clamp(16px, 5vw, 20px)',
          color: 'primary.contrastText',
          textAlign: 'center',
          mt: 2,
          mb: 3,
          px: 4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ActivityImage title={title} image={image} />
        <ActivityDetails
          startDate={startDate}
          endDate={endDate}
          location={location}
          hours={hours}
          participantsCount={participantsCount}
          status={status}
        />
      </Box>

      <ActivityDescription description={description} />

      <ActivityActions
        variant={variant}
        onSignup={onSignup}
        onCancelParticipation={onCancelParticipation}
        onMarkPresence={onMarkPresence}
      />
    </ModalContainer>
  );
}
