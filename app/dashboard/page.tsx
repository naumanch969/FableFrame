"use client"

import React from 'react'
import DashboardHeader from './_components/DashboardHeader'
import UserStories from './_components/UserStories'

const DashboardPage = () => {
  return (
    <div className='min-h-screen' >

      <DashboardHeader />
      <UserStories />

    </div>
  )
}

export default DashboardPage