"use client"

import React from 'react'
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import { useCreateStripeCheckout } from '@/features/subscriptions/api/useCreateStripeUrl'
import { useGetMySubscription } from '@/features/subscriptions/api/useGetMySubscription'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/LoadingScreen'

const Plans = dynamic(() => import('./components/Plans'), {
  ssr: false,
  loading: () => <LoadingScreen text="Plans for you" className='w-full' />
})

const Billing = () => {

  const { data: profile } = useGetProfile()
  const { data: subscription } = useGetMySubscription()
  const { mutate, isPending, error } = useCreateStripeCheckout()
  const isPro = !!subscription?.is_active

  const plans = [
    {

    }
  ]


  return (
    <Plans />
  )
}

export default Billing