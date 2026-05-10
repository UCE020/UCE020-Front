import { Box, Skeleton } from '@mui/material';
import Image from 'next/image';
import type { ActivityImageProps } from '@/types/activity';

export function ActivityImage({ title, image }: ActivityImageProps) {
  return (
    <Box
      sx={{
        width: '50%',
        aspectRatio: '1/1',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="50vw"
          className="object-cover"
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
    </Box>
  );
}