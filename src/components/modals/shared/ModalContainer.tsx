'use client';

import { Dialog, SxProps, Theme } from '@mui/material'; // <-- 1. Importe SxProps e Theme
import type { ReactNode } from 'react';

interface ModalContainerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  sx?: SxProps<Theme>; // <-- 2. Adicione a propriedade opcional aqui
}

export default function ModalContainer({ open, onClose, children, sx }: ModalContainerProps) { // <-- 3. Receba o sx aqui
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={sx} // <-- 4. Repasse o sx para a raiz do Dialog
      slotProps={{
        paper: {
          sx: {
            // ── Dimensões ──
            width: '100%',
            // ... todo o resto do seu código de estilização continua igual aqui
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}