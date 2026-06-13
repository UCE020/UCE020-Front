'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { ContentCard } from '@/components/layout/ContentCard';
import { presenceService } from '@/services/presenceService';
import { colorTokens } from '@/lib/colors';
import { validatePresenceScan } from '@/features/participants/presence/utils/validatePresenceScan';
import { requirePresenceContext } from '@/features/participants/presence/utils/resolvePresenceContext';
import { buildListParticipantsPath } from '@/features/participants/presence/utils/routes';
import { PresenceContextMissing } from './PresenceContextMissing';
import { QrCodeScanner } from './QrCodeScanner';
import { PresenceScanModal } from './PresenceScanModal';
import type { PresenceScanResult } from '@/types/presence';

interface ScanState {
  modalOpen: boolean;
  result: PresenceScanResult | null;
  isConfirming: boolean;
  error: string | null;
}

const INITIAL_STATE: ScanState = {
  modalOpen: false,
  result: null,
  isConfirming: false,
  error: null,
};

export function ValidatePresenceView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = requirePresenceContext(
    searchParams.get('eventId'),
    searchParams.get('activityId'),
  );

  const [state, setState] = useState<ScanState>(INITIAL_STATE);
  const [scanKey, setScanKey] = useState(0);

  // processar QR code scaneado
  const handleScan = useCallback(
    (qrCode: string) => {
      if (!context || state.modalOpen) return;

      const result = validatePresenceScan(qrCode, context);

      setState({
        modalOpen: true,
        result,
        isConfirming: false,
        error: null,
      });
    },
    [state.modalOpen, context],
  );

  // fechar modal e resetar scanner
  const closeModal = useCallback(() => {
    setState(INITIAL_STATE);
    setScanKey((prev) => prev + 1);
  }, []);

  // confirmar presença
  const handleConfirmPresence = useCallback(async () => {
    if (!state.result?.payload || !state.result.canConfirm) return;

    setState((prev) => ({ ...prev, isConfirming: true, error: null }));

    try {
      await presenceService.confirmPresence({
        participantId: state.result.payload.participantId,
        eventId: state.result.payload.eventId,
        activityId: state.result.payload.activityId,
      });
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao confirmar presença';
      setState((prev) => ({ ...prev, error: message, isConfirming: false }));
    }
  }, [state.result, closeModal]);

  if (!context) {
    return <PresenceContextMissing />;
  }

  const handleBack = () => {
    router.push(buildListParticipantsPath(context.eventId, context.activityId));
  };

  

  return (
    <AppPageContainer>
      <IconButton
        onClick={handleBack}
        aria-label="Voltar"
        sx={{ alignSelf: 'flex-start', color: colorTokens.text.primary }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>
      
      <ContentCard>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 20,
            color: colorTokens.text.primary,
          }}
        >
          Validação de presença
        </Typography>

        <Typography
          sx={{
            fontSize: 'clamp(10px, 3vw, 14px)',
            color: colorTokens.text.secondary,
          }}
        >
          Evento: <strong>{context.eventName}</strong>
        </Typography>

        <Typography
          sx={{
            fontSize: 'clamp(10px, 3vw, 14px)',
            color: colorTokens.text.secondary,
            mb: 3,
          }}
        >
          Atividade: <strong>{context.activityTitle}</strong>
        </Typography>

        <ContentCard sx={{ alignItems: 'center' }}>
          <QrCodeScanner onResult={handleScan} paused={state.modalOpen} scanKey={scanKey} />
        </ContentCard>
      </ContentCard>
      <PresenceScanModal
        open={state.modalOpen}
        scanResult={state.result}
        onClose={closeModal}
        onConfirm={handleConfirmPresence}
        isConfirming={state.isConfirming}
        confirmError={state.error}
      />
    </AppPageContainer>
  );
}
