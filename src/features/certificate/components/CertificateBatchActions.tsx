import { Box } from '@mui/material';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button } from '@/components/ui/Button';

interface CertificateBatchActionsProps {
  onSignBatch: () => void;
  onSendBatch: () => void;
}

export function CertificateBatchActions({ onSignBatch, onSendBatch }: CertificateBatchActionsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
      <Button
        variant="contained"
        fullWidth
        leftIcon={<DrawOutlinedIcon sx={{ fontSize: 18 }} />}
        onClick={onSignBatch}
        sx={{
          py: 1.25,
          borderRadius: '12px',
          bgcolor: '#0F1D35',
          boxShadow: '0 4px 12px rgba(15, 29, 53, 0.18)',
          '&:hover': { bgcolor: '#1a2e50', boxShadow: '0 6px 16px rgba(15, 29, 53, 0.24)' },
        }}
      >
        Assinar em lote
      </Button>
      <Button
        variant="outlined"
        fullWidth
        leftIcon={<SendOutlinedIcon sx={{ fontSize: 18 }} />}
        onClick={onSendBatch}
        sx={{
          py: 1.25,
          borderRadius: '12px',
          borderColor: '#2EC4A0',
          borderWidth: 1.5,
          color: '#2EC4A0',
          '&:hover': { borderColor: '#25a98a', borderWidth: 1.5, bgcolor: '#f0fdf9' },
        }}
      >
        Encaminhar
      </Button>
    </Box>
  );
}
