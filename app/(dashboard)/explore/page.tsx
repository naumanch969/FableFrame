"use client"

import React from 'react'
import { useGetPublicStories } from '@/features/story/api/useGetPublicStories'
import Stories from '@/components/Stories'

const ExplorePage = () => {

  const { isLoading, data } = useGetPublicStories()

  return (
    <div className='min-h-screen px-8' >
      <Stories data={data} isLoading={isLoading} />
    </div>
  )
}

export default ExplorePage