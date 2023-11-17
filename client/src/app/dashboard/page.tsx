import Image from 'next/image'
import React from 'react'
import logoPequena from '@/public/logo_pequena 3.png'

function Dashboard() {
  return (
    <div>
      <header>
        <Image src={logoPequena} alt="" />
      </header>
    </div>
  )
}

export default Dashboard
