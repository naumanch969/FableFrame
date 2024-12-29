"use client"

import React from 'react'
import { useGetPublicStories } from '@/features/story/api/useGetPublicStories'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/LoadingScreen'

const Stories = dynamic(() => import('@/components/Stories'), {
  ssr: false,
  loading: () => <LoadingScreen text="Stories for you" className='w-full' />
})

const ExplorePage = () => {

  const { isLoading, data } = useGetPublicStories()

  return (
    <div className='min-h-screen px-8' >
      <Stories data={data} isLoading={isLoading} />
    </div>
  )
}

export default ExplorePage