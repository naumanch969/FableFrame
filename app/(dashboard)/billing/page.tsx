"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/LoadingScreen'

const Plans = dynamic(() => import('@/components/Plans'), {
  ssr: false,
  loading: () => <LoadingScreen text="Plans for you" className='w-full' />
})

const Billing = () => {



  return (
    <div className='' >
      <Plans />
    </div>
  )
}

export default Billing