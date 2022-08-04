import Layout from 'components/Layout'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import useRouter from 'next/dist/client/router'
import { useAppContext } from 'context/AppContext'
import Link from 'next/link'
import LoadingSpinner from 'components/loadingSpinner'

export default function SignIn () {
  const router = useRouter
  const [isLoading, setIsLoading] = useState(true)
  const { state } = useAppContext()

  useEffect(() => {
    if (state) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  })

  const [ShowPassword, setShowPassword] = useState(false)
  // const { token } = user

  const [form, setform] = useState({
    password: '',
    email: ''
  })

  const HandleChange = e => {
    const { name, value } = e.target
    setform({
      ...form,
      [name]: value
    })
  }

  const HandleSubmit = e => {
    e.preventDefault()
    postData(form)
  }

  const postData = async (form) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // parce(form) -> JSON a objeto
        // convierte el objeto form a JSON
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (res.ok === false) {
        console.log('Error al connectarse')
      } else {
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(data)
        )
        router.push('/')
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const HandlePassword = (Password) => {
    setShowPassword(!Password)
  }

  return (
    <Layout>
      {isLoading
        ? <LoadingSpinner />
        : <main className='relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bg-red/5 to-bg-white'>
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
              className='rounded-full ring-secondary shadow'
              height={124}
              width={124}
              alt='explora'
            />
            <h1 className='sr-only'>Log in to your Tailwind UI account</h1>
            <form className='w-full max-w-sm' onSubmit={HandleSubmit}>
              <div className='mb-6'>
                <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>Email address</label>
                <input
                  className='mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-secondary ring-1 ring-slate-200'
                  value={form.email}
                  name='email'
                  type='email'
                  onChange={HandleChange}
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='password' className='block text-sm font-semibold leading-6 text-gray-900'>Password</label>
                <div className='relative'>
                  <input
                    className=' mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-secondary ring-1 ring-slate-200'
                    value={form.password}
                    name='password'
                    placeholder='*********'
                    type={ShowPassword ? 'text' : 'password'}
                    onChange={HandleChange}
                    required
                  />

                  <div className='absolute right-3 top-1/3 hover:cursor-pointer' onClick={() => HandlePassword(ShowPassword)}>
                    {ShowPassword
                      ? <EyeIcon className='h-5 w-5 text-secondary' />
                      : <EyeOffIcon className='h-5 w-5' />}
                  </div>
                </div>
              </div>
              <button type='submit' className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-secondary/80 text-white hover:bg-secondary w-full'>
                <span>Connectez-vous</span>
              </button>
              <p className='mt-8 text-center'>
                <Link href='/password/reset'>
                  <a className='text-sm hover:underline'>Forgot password?</a>
                </Link>
              </p>
            </form>
          </div>
          <footer className='relative shrink-0'>
            <div className='space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4'>
              <p className='text-center sm:text-left'>Vous n'avez pas de compte ?</p>
              <Link href='/signup'>
                <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-secondary/80 hover:ring-secondary' href='/all-access'>
                  <span>Inscribez-vous <span aria-hidden='true'>→</span></span>
                </a>
              </Link>
            </div>
          </footer>
        </main>}
    </Layout>
  )
}
