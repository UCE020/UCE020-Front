'use client';

import { Dialog, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ActivityImage, ActivityDetails, ActivityDescription, ActivityActions } from '@/components/modals/activity';
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
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '402px',
            minWidth: '300px',
            borderRadius: '32px',
            p: 2,
            m: 1,
            maxHeight: '90vh',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'primary.contrastText',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'action.disabled',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

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
    </Dialog>
  );
}
