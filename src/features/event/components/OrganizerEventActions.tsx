import { Box } from '@mui/material';
import { Button } from '@/components/ui';

export function OrganizerEventActions() {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ fontWeight: 700, borderRadius: 2, height: 36 }}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ fontWeight: 700, borderRadius: 2, height: 36 }}
      >
        Finalizar
      </Button>
    </Box>
  );
}
