import { Typography } from '@mui/material';
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
    <>
      <Typography>
        {displayedDescription}
      </Typography>

      {shouldTruncate && (
        <Typography component="span" onClick={toggleExpand}>
          {expanded ? ' Ver menos' : ' Ver mais'}
        </Typography>
      )}
    </>
  );
}