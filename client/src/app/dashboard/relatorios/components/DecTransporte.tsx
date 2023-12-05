import React from 'react'
import {
  MoodBad,
  Mood,
  SentimentVeryDissatisfied,
  SentimentSatisfied,
} from '@mui/icons-material'
import { Box } from '@mui/material'

type DecTransportProps = {
  decTransport: string
}

function DecTransporte({ decTransport }: DecTransportProps) {
  return (
    <>
      {decTransport === 'critico' && (
        <Box sx={{ background: '#ff000032', p: 1, borderRadius: '5px' }}>
          <MoodBad fontSize="large" color="error" />
        </Box>
      )}
      {decTransport === 'instavel' && (
        <Box sx={{ background: '#ff730030', p: 1, borderRadius: '5px' }}>
          <SentimentVeryDissatisfied fontSize="large" color="warning" />
        </Box>
      )}
      {decTransport === 'possivelmente estavel' && (
        <Box sx={{ background: '#e5ff002f', p: 1, borderRadius: '5px' }}>
          <SentimentSatisfied fontSize="large" color="warning" />
        </Box>
      )}
      {decTransport === 'estavel' && (
        <Box sx={{ background: '#1eff002e', p: 1, borderRadius: '5px' }}>
          <Mood fontSize="large" color="success" />
        </Box>
      )}
    </>
  )
}

export default DecTransporte
