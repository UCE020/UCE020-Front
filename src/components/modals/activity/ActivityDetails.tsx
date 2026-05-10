import { Box, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import { formatActivityDate } from '@/utils/format';
import type { ActivityDetailsProps } from '@/types/activity';

const labelSx = {
  fontSize: 'clamp(8px, 3vw, 12px)',
  color: 'text.primary',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const iconSx = {
  fontSize: 'clamp(16px, 4vw, 20px)',
  color: 'text.primary',
};

const detailRowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export function ActivityDetails({
  startDate,
  endDate,
  location,
  hours,
  participantsCount,
  status,
}: ActivityDetailsProps) {
  return (
    <Box sx={{ width: '50%', aspectRatio: '1/1', position: 'relative', flexShrink: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minWidth: 0, px: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
          <Box sx={detailRowSx}>
            <CalendarTodayOutlinedIcon sx={iconSx} />
            <Typography sx={labelSx}>{formatActivityDate(startDate, endDate)}</Typography>
          </Box>

          <Box sx={detailRowSx}>
            <PlaceOutlined sx={iconSx} />
            <Typography sx={labelSx}>{location}</Typography>
          </Box>

          <Box sx={detailRowSx}>
            <AccessTimeOutlinedIcon sx={iconSx} />
            <Typography sx={labelSx}>{hours} horas</Typography>
          </Box>

          <Box sx={detailRowSx}>
            <PersonOutlineOutlinedIcon sx={iconSx} />
            <Typography sx={labelSx}>{participantsCount} inscritos</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            px: 'clamp(8px, 2vw, 12px)',
            height: 'clamp(20px, 5vw, 22px)',
            bgcolor: 'grey.500',
            borderRadius: '99px',
            color: 'info.contrastText',
            fontSize: 'clamp(8px, 2vw, 11px)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {status}
        </Box>
      </Box>
    </Box>
  );
}