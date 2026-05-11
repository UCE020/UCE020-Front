'use client';

import { Dialog } from '@mui/material';
import type { ReactNode } from 'react';

interface ModalContainerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalContainer({ open, onClose, children }: ModalContainerProps) {
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
      {children}
    </Dialog>
  );
}