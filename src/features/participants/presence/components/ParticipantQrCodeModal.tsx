'use client';

import { Box, Typography } from '@mui/material';
import { ModalContainer, CloseButton } from '@/components/modals';
import QRCode from 'react-qr-code';
import { buildPresenceQrPayload } from '@/features/participants/presence/utils/presenceQr';

interface ParticipantQrCodeModalProps {
  open: boolean;
  onClose: () => void;
  participantId: string;
  participantName: string;
  activityId: string;
  activityTitle: string;
  eventId: string;
}

export function ParticipantQrCodeModal({
  open,
  onClose,
  participantId,
  participantName,
  activityId,
  activityTitle,
  eventId,
}: ParticipantQrCodeModalProps) {
  const qrPayload = buildPresenceQrPayload({
    participantId,
    participantName,
    activityId,
    activityTitle,
    eventId,
  });

  return (
    <ModalContainer open={open} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <Box sx={{ px: 3, pb: 3 }}>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: 'clamp(14px, 4vw, 16px)',
            mb: 1,
            textAlign: 'center',
          }}
        >
          Mostre este QR Code ao monitor para confirmar sua presença em
        </Typography>
        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: 'clamp(18px, 5vw, 22px)',
            mb: 3,
            textAlign: 'center',
          }}
        >
          {activityTitle}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <QRCode value={qrPayload} size={260} level="H" style={{ borderRadius: '12px' }} />
        </Box>
      </Box>
    </ModalContainer>
  );
}
