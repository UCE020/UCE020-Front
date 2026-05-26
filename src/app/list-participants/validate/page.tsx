'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { PresenceValidationPanel } from '@/features/participants';
import { colorTokens } from '@/lib/colors';


export default function ValidatePresencePage() {
  const router = useRouter();

  return (
    <AppPageContainer>
      <IconButton
        onClick={() => router.push('/list-participants')}
        aria-label="Voltar"
        sx={{ alignSelf: 'flex-start', color: colorTokens.text.primary }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <PresenceValidationPanel />
    </AppPageContainer>
  );
}
