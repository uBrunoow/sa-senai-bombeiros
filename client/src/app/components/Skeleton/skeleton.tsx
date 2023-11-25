import { Box, Skeleton } from '@mui/material'
import React from 'react'
export const SkeletonBody = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          flexDirection: 'column',
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={170}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={70}
        />
      </Box>
    </>
  )
}
export const SkeletonTable = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          flexDirection: 'column',
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
          width={'100%'}
          height={50}
        />
      </Box>
    </>
  )
}
