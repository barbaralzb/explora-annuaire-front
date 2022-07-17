import Layout from 'components/Layout'
import Image from 'next/image'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

export default function login () {
  const [ShowPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [numeroTelephone, setNumeroTelephone] = useState('')

  const HandlePassword = (Password) => {
    setShowPassword(!Password)
  }

  return (
    <Layout>
      <main className='relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]'>
          <svg className='absolute inset-0 h-full w-full' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='grid-bg' width='32' height='32' patternUnits='userSpaceOnUse' x='100%' patternTransform='translate(0 -1)'>
                <path d='M0 32V.5H32' fill='none' stroke='rgba(99, 102, 241, 0.1)' />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid-bg)' />
          </svg>
        </div>
        <div className='relative flex flex-1 flex-col items-center justify-center pt-12 pb-16'>
          <Image
            priority
            src='/../public/images/proj.jpeg'
            className='rounded-full'
            height={124}
            width={124}
            alt='explora'
          />
          <h1 className='sr-only'>Log in to your Tailwind UI account</h1>
          <form action='/login' className='w-full max-w-sm'>
            <div className='mb-6'>
              <label for='email' className='block text-sm font-semibold leading-6 text-gray-900'>Email address</label>
              <input type='email' id='email' className='mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400 ring-1 ring-slate-200' required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='mb-6'>
              <label for='password' className='block text-sm font-semibold leading-6 text-gray-900'>Password</label>
              <div className='relative'>
                <input type={ShowPassword ? 'text' : 'password'} id='password' placeholder='*********' value={password} onChange={e => setPassword(e.target.value)} className=' mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400 ring-1 ring-slate-200' required />

                <div className='absolute right-3 top-1/3 hover:cursor-pointer' onClick={() => HandlePassword(ShowPassword)}>
                  {ShowPassword
                    ? <EyeIcon className='h-5 w-5 text-orange-600' />
                    : <EyeOffIcon className='h-5 w-5' />}
                </div>
              </div>
            </div>
            <button type='submit' className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-orange-600 text-white hover:bg-orange-500 w-full'>
              <span>Sign in to account</span>
            </button>
            <p className='mt-8 text-center'>
              <a href='/password/reset' className='text-sm hover:underline'>Forgot password?</a>
            </p>
          </form>
        </div>
        <footer className='relative shrink-0'>
          <div className='space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4'>
            <p className='text-center sm:text-left'>Don't have an account?</p>
            <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-orange-600/10 hover:ring-orange-600/20' href='/all-access'>
              <span>Get access <span aria-hidden='true'>→</span></span>
            </a>
          </div>
        </footer>
      </main>
    </Layout>
  )
}
