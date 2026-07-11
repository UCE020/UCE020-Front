import type { ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';
import { colorTokens } from '@/lib/colors';

interface AppPageContainerProps extends BoxProps {
  children: ReactNode;
  maxWidth?: number | string;
}

export function AppPageContainer({ children, sx, maxWidth = 620, ...props }: AppPageContainerProps) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: colorTokens.surface.background,
        width: '100%',
        minWidth: 320,
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth,
          mx: 'auto',
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
