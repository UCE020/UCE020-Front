import { Box, Typography } from '@mui/material';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { formatActivityDate } from '@/utils/format';
import type { ScheduleDetailsProps } from '@/types/scheduleCard';
import { LabelChip } from '@/components';

const labelSx = {
  fontSize: 'clamp(8px, 3vw, 11px)',
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

export default function ScheduleDetails({
  startDate,
  endDate,
  location,
  hours,
  participantsCount,
  status,
}: ScheduleDetailsProps) {
  return (
    <Box sx={{ width: '50%', aspectRatio: '1/1', position: 'relative', flexShrink: 0 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          minWidth: 0,
          px: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
          <Box sx={detailRowSx}>
            <CalendarTodayRoundedIcon sx={iconSx} />
            <Typography sx={labelSx}>{formatActivityDate(startDate, endDate)}</Typography>
          </Box>

          <Box sx={detailRowSx}>
            <PlaceOutlinedIcon sx={iconSx} />
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

        <LabelChip status={status} />
      </Box>
    </Box>
  );
}