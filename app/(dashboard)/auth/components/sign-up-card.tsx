import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/aceternity/input'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { TriangleAlert } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'
import { SignInFlow } from '@/types'
import Hint from '@/components/Hint'
import { useRouter } from 'next/navigation'

interface Props {
  setState: (state: SignInFlow) => void
}

const SignUpCard = ({ setState }: Props) => {

  const router = useRouter()
  const { signIn } = useAuthActions()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password != confirmPassword) return setError("Passwords do not match")
    // TODO: Show message for password validation: convex by-default manage password validation

    setPending(true)
    const d = signIn("password", { name, email, password, flow: "signUp" })
      .then((payload) => {
        router.push('/explore')
        console.log('payload', payload)
        // creating profile
        // mutate({
        //   formData: {
        //     email: email,
        //     role: 'user',
        //     user_id: email,
        //     username: name,
        //     bio: "",
        //     date_of_birth: "",
        //     is_verified: true,
        //     location: "",
        //     notification_settings: "",
        //     preferences: "",
        //     profile_picture_url: "",
        //   }
        // })
        //   .then(() => toast.success("Profile created successfully.", { position: 'top-right' }))

      })
      .catch(() => setError("Something went wrong!"))
      .finally(() => setPending(false))
  }

  const onProviderSignUp = (value: 'github' | 'google') => {
    setPending(true)
    signIn(value).finally(() => setPending(false))
  }

  return (
    <Card style={{ padding: '3rem' }} className='w-full h-full ' >

      <CardHeader className='px-0 pt-0' >
        <CardTitle>Sign Up to Continue</CardTitle>
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
        <form onSubmit={onPasswordSignUp} className="flex flex-col gap-4">
          <Input
            id='name'
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Full name'
            type='text'
            required={true}
          />
          <Input
            id='email'
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required={true}
          />
          <Input
            id='password'
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required={true}
          />
          <Input
            id='confirmPassword'
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            type='password'
            required={true}
          />
          <Button
            variant='gradient'
            type='submit'
            className='w-full'
            size='lg'
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
              onClick={() => onProviderSignUp('google')}
            >
              <FcGoogle className='size-5' /> Continue with Google
            </Button>
          </Hint>
          <Hint label="Temporarily Unavailable" >
            <Button
              variant='outline'
              size='lg'
              className='w-full relative'
              disabled={true || pending}
              onClick={() => onProviderSignUp('github')}
            >
              <FaGithub className='size-5' /> Continue with Github
            </Button>
          </Hint>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account? <span onClick={() => setState('signIn')} className='text-sky-700 hover:underline cursor-pointer' >Sign In</span>
        </p>
      </CardContent>

    </Card >
  )
}

export default SignUpCard