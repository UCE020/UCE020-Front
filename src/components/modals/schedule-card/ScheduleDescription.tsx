'use client';

import { Typography, Box } from '@mui/material';
import { useState } from 'react';

interface ScheduleDescriptionProps {
  description?: string;
}

export default function ScheduleDescription({
  description = '',
}: ScheduleDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const safeDescription = description ?? '';
  const shouldTruncate = safeDescription.length > 278;

  const displayedDescription =
    expanded || !shouldTruncate
      ? safeDescription
      : `${safeDescription.slice(0, 278)}...`;

  function toggleExpand() {
    setExpanded((prev) => !prev);
  }

  return (
    <Box sx={{ mt: { xs: 2.5, sm: 4 }, mb: { xs: 3, sm: 4 } }}>
      <Typography
        sx={{
          color: 'text.primary',
          fontSize: { xs: 12, sm: 12 },
          textAlign: 'justify',
          lineHeight: 1.7,
        }}
      >
        {displayedDescription}
      </Typography>

      {shouldTruncate && (
        <Typography
          component="button"
          type="button"
          onClick={toggleExpand}
          sx={{
            mt: 1,
            p: 0,
            border: 0,
            background: 'transparent',
            color: 'primary.main',
            fontSize: { xs: 12, sm: 12 },
            fontWeight: 700,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
        </Typography>
      )}
    </Box>
  );
}