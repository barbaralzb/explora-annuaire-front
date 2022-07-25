import Layout from 'components/Layout'
import Image from 'next/image'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import useRouter from 'next/dist/client/router'
import Link from 'next/link'
import Button from 'components/Basics/Button'

export default function SignUp () {
  const router = useRouter

  const [ShowPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState(null)

  const [form, setform] = useState({
    username: '',
    password: '',
    email: ''
  })

  // e de evento
  const HandleChange = e => {
    // esta es una desustruracion del e.target
    const { name, value } = e.target
    setform({
      ...form,
      // si no le pongo el ...form, este no se va ir escribiendo. Entonces password es el ultimo en ejecutarse por lo que mi state sera el valor de password.
      // gracias a ...form -> user name se ejecuta y se guarda en el estado, luego al turno de email y asi
      [name]: value
    })
  }

  const HandleSubmit = e => {
    e.preventDefault()
    postData(form)
  }

  const postData = async (form) => {
    try {
      console.log('type', typeof (form))
      console.log(form)

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // parce(form) -> JSON a objeto
        // convierte el objeto form a JSON
        body: JSON.stringify(form)
      })

      const data = await res.json()
      console.log(data)
      if (!data.success) {
        console.log('Problema del servidor')
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log('error crear user', error)
    }
  }

  const HandlePassword = (Password) => {
    setShowPassword(!Password)
  }

  return (
    <Layout>
      <main className='relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bg-red/5 to-bg-white'>
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
              <label htmlFor='username' className='block text-sm font-semibold leading-6 text-gray-900'>User Name</label>
              <input
                className='mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-secondary ring-1 ring-slate-200'
                value={form.username}
                type='username'
                name='username'
                onChange={HandleChange}
                required
              />
            </div>
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
              <Link href='/signin'>
                <a>
                  <span>Inscribez-vous</span>
                </a>
              </Link>
            </button>
          </form>
        </div>
        <footer className='relative shrink-0'>
          <div className='space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4'>
            <p className='text-center sm:text-left'>Vous avez déjà un compte ?</p>
            <Button title='Connectez-vous' path='/signin' />
          </div>
        </footer>
      </main>
    </Layout>
  )
}
