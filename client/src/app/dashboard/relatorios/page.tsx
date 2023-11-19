import Header from '@/app/components/Header/Header'
import { Box } from '@mui/material'
import React from 'react'

function page() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Box
        sx={{
          maxWidth: '1700px',
          width: '100%',
          margin: '0 auto',
          padding: '10px',
        }}
      >
        relatorios
      </Box>
    </Box>
  )
}

export default page
