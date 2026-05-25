import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import type { ScheduleDescriptionProps } from '@/types/scheduleCard';

export default function ScheduleDescription({ description }: ScheduleDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography
        onClick={toggleExpand}
        sx={{
          color: 'text.primary',
          fontSize: 'clamp(10px, 3vw, 12px)',
          textAlign: 'justify',
          cursor: 'pointer',
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {description}
      </Typography>
      {description.length > 278 && (
        <Typography
          component="span"
          onClick={toggleExpand}
          sx={{
            display: 'inline-block',
            mt: 1,
            fontSize: '8px',
            color: 'text.secondary',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          {isExpanded ? 'Ver menos' : 'Ver mais'}
        </Typography>
      )}
    </Box>
  );
}
