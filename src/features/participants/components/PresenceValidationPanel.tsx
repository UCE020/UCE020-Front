import { Box, Typography } from '@mui/material';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import { ContentCard } from '@/components/layout/ContentCard';
import { colorTokens } from '@/lib/colors';

interface PresenceValidationPanelProps {
  onScan?: () => void;
}

export function PresenceValidationPanel({ onScan }: PresenceValidationPanelProps) {
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 20,
          color: colorTokens.text.primary,
          textAlign: 'center',
        }}
      >
        Validação de presença
      </Typography>

      <ContentCard sx={{ alignItems: 'center' }}>
        <Typography
          sx={{
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: colorTokens.neutral.gray500,
            textAlign: 'center',
          }}
        >
          Aponte a câmera para o QR Code do participante para validar a presença
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={onScan}
          aria-label="Clique para simular a leitura do QR Code"
          sx={{
            width: '100%',
            aspectRatio: '1',
            maxWidth: 280,
            borderRadius: '12px',
            border: `2px dashed ${colorTokens.neutral.border}`,
            bgcolor: colorTokens.surface.background,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 2,
            cursor: onScan ? 'pointer' : 'default',
            p: 0,
            '&:hover': onScan ? { bgcolor: colorTokens.neutral.gray300 } : undefined,
          }}
        >
          <QrCodeScannerRoundedIcon
            sx={{ fontSize: 64, color: colorTokens.navigation.default, opacity: 0.6 }}
          />
          <Typography
            sx={{ fontSize: 12, color: colorTokens.neutral.gray500, px: 2, textAlign: 'center' }}
          >
            Área do leitor do QR Code
          </Typography>
        </Box>
      </ContentCard>
    </>
  );
}
