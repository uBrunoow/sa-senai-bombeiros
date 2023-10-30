import React from 'react'
import { Box } from 'native-base'
import NOARLogo from '@src/public/logo-noar.svg'
export default function Footer() {
  return (
    <Box className="w-full bg-[#A00E00] px-10 py-5">
      <NOARLogo height={70} width={70} />
    </Box>
  )
}
