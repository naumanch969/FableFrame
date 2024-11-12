import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2' >
      <div className="col-span-1">
        <img src='/login.png' alt='Login' className='max-h-screen w-full' />
      </div>
      <div className="col-span-1 flex justify-center items-center h-full order-first md:order-last">
        <SignUp />
      </div>
    </div>
  )
}