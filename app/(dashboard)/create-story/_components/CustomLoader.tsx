"use client";

import { Modal } from '@/components/Modal'
import Image from 'next/image'
import React from 'react'

const CustomLoader = ({ loading, onClose }: { loading: string, onClose: () => void }) => {


  return (
    <Modal
      description=''
      title=''
      open={loading?.length > 0}
      onClose={onClose}
      showCloseButton={false}
    >
      <div className="w-full flex flex-col justify-center items-center gap-10 p-4 bg-surface rounded-3xl ">
        <p className='text-muted-foreground font-medium text-lg text-center w-full' >{loading}</p>
        <Image
          src='/loader.gif'
          alt='Loading...'
          width={100}
          height={100}
          className='h-[200px] w-[200px]'
        />
      </div>
    </Modal>
  )
}

export default CustomLoader