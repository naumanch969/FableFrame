"use client";

import { Modal } from '@/components/Modal'
import Image from 'next/image'
import React from 'react'

const CustomLoader = ({ open, onClose }: { open: boolean, onClose: () => void }) => {


  return (
    <Modal
      description=''
      title=''
      open={open}
      onClose={onClose}
      showCloseButton={false}
    >
      <div className="w-full flex justify-center items-center p-10 bg-card rounded-3xl ">
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