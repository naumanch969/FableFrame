"use client"

import React from 'react'
import UserStories from './_components/UserStories'
import { useGetPublicStories } from '@/features/story/api/useGetPublicStories'
import Loader from '@/components/Loader'
import Stories from '@/components/Stories'

const DashboardPage = () => {

  const { isLoading, data } = useGetPublicStories()

  return (
    <div className='min-h-screen px-8' >

      {
        isLoading
          ?
          <div className="min-h-[90vh] flex justify-center items-center ">
            <Loader src='/loader_book.gif' title='Loading stories...' />
          </div>
          :
          <Stories data={data} />
      }
      {/* <UserStories /> */}


    </div>
  )
}

export default DashboardPage