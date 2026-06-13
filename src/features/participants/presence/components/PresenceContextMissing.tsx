'use client';

import { AppPageContainer } from '@/components/layout/AppPageContainer';

export function PresenceContextMissing() {
  return (
    <AppPageContainer
      sx={{
        borderRadius: '28px',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
       <p>Atividade não especificada</p>
      <p>
        Acesse o <strong>Evento</strong>, selecione a <strong>Atividade</strong> correspondente<br />
        e clique em: <strong>Validar presenças</strong> ou <strong>Listar participantes</strong>
      </p>
    </AppPageContainer>
  );
}
