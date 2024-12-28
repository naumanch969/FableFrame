"use client"

import { Button } from '@/components/ui/button'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import { useCreateStripeCheckout } from '@/features/subscriptions/api/useCreateStripeUrl'
import { useGetMySubscription } from '@/features/subscriptions/api/useGetMySubscription'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const Billing = () => {

    const { data: profile } = useCurrentProfile()
    const { data: subscription } = useGetMySubscription()
    const { mutate, isPending, error } = useCreateStripeCheckout()
    const isPro = !!subscription?.is_active

    useEffect(() => {
        console.log('error', error)
    }, [error])

    const onUpgrade = () => {
        console.log("Upgrade to premium")

        mutate({ profile_id: profile?._id!, email: profile?.email! }, {
            onSuccess: (payload: { checkoutUrl: string }) => {
                if (payload) {
                    window.location.href = payload.checkoutUrl
                }
            },
            onError: (error: Error) => {
                toast.error("Error upgrading to premium")
                console.error("Error upgrading to premium", error)
            }
        })
    }


    return (
        <div className='h-[80vh] w-full flex justify-center items-center' >

            {isPending && <span>"Loading..."</span>}
            <Button
                variant='gradient'
                disabled={isPro || isPending}
                onClick={onUpgrade}
            >
                {isPro ? "Premium Member" : "Upgrade to Premium"}
            </Button>

        </div>
    )
}

export default Billing