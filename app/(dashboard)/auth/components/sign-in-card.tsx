import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { SignInFlow } from '@/types'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/aceternity/input'
import Hint from '@/components/Hint'

interface Props {
  setState: (state: SignInFlow) => void
}

const SignInCard = ({ setState }: Props) => {

  const { signIn } = useAuthActions()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPending(true)
    setError("")
    signIn("password", { email, password, flow: "signIn" })
      .then(() => {
        router.push('/explore')
        toast.success("Login successfully.", { position: 'top-right' })
      })
      .catch(() => setError("Invalid email or password"))
      .finally(() => setPending(false))
  }

  const onProviderSignIn = (value: 'github' | 'google') => {
    setPending(true)
    setError("")
    signIn(value).finally(() => setPending(false))
  }

  return (
    <Card style={{ padding: '3rem' }} className='w-full h-full ' >

      <CardHeader className='px-0 pt-0' >
        <CardTitle>Login to Continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      {
        !!error &&
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6' >
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      }

      <CardContent className='flex flex-col gap-5 px-0 pb-0' >
        <form onSubmit={onPasswordSignIn} className="flex flex-col gap-4">
          <Input
            id="email"
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required={true}
          />
          <Input
            id="password"
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required={true}
          />
          <Button
            type='submit'
            className='w-full'
            size='lg'
            variant='gradient'
            disabled={pending}
          >Continue</Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-2">
          <Hint label="Temporarily Unavailable" >
            <Button
              variant='outline'
              size='lg'
              className='w-full relative'
              disabled={true || pending}
              onClick={() => onProviderSignIn('google')}
            >
              <FcGoogle className='size-5 ' /> Continue with Google
            </Button>
          </Hint>
          <Hint label="Temporarily Unavailable" >
            <Button
              variant='outline'
              size='lg'
              className='w-full relative'
              disabled={true || pending}
              onClick={() => onProviderSignIn('github')}
            >
              <FaGithub className='size-5 ' /> Continue with Github
            </Button>
          </Hint>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account? <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer' >Sign Up</span>
        </p>
      </CardContent>

    </Card >
  )
}

export default SignInCard