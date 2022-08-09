import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import useRouter from 'next/dist/client/router'
import Link from 'next/link'
import { Loader } from 'components/Basics/Loader'
import { useAppContext } from 'context/AppContext'
import { Input, Button } from '@material-tailwind/react'

export default function SignUp () {
  const router = useRouter
  const { state, dispatch } = useAppContext()
  const [isLoading, setIsLoading] = useState(!state)
  const [ShowPassword, setShowPassword] = useState(true)

  useEffect(() => {
    if (state) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [state])

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

      if (res.ok === false) {
        console.log('Error al connectarse')
      } else {
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(data)
        )
        dispatch({
          type: 'init_stored',
          value: JSON.parse(window.localStorage.getItem('loggedUser'))
        })
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
    <>
      {isLoading
        ? <Loader />
        : <main className='relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bg-red/5 to-bg-white'>
          <div className='relative flex flex-1 flex-col items-center justify-center pt-12 pb-16'>
            <div className='w-11/12 h-auto'>
              <Image
                priority
                src='/images/logo/logo-explora.png'
                alt='Explora'
                layout='responsive'
                objectFit='contain'
                width='100%'
                height='100%'
              />
            </div>
            <h1 className='sr-only'>Log in to your Tailwind UI account</h1>
            <form className='w-full max-w-sm' onSubmit={HandleSubmit}>
              <div className='mb-6'>
                <Input
                  label={'Nom de l\'association'}
                  value={form.username}
                  type='username'
                  name='username'
                  onChange={HandleChange}
                  color='orange'
                  required
                />
              </div>
              <div className='mb-6'>
                <Input
                  label='Email address'
                  value={form.email}
                  name='email'
                  type='email'
                  color='orange'
                  onChange={HandleChange}
                  required
                />
              </div>
              <div className='mb-6'>
                <div className='relative'>
                  <Input
                    label='Mots de passe'
                    value={form.password}
                    name='password'
                    type={ShowPassword ? 'text' : 'password'}
                    onChange={HandleChange}
                    required
                    color='orange'
                    icon={<div onClick={() => HandlePassword(ShowPassword)}>
                      {ShowPassword
                        ? <EyeIcon className='h-5 w-5 text-secondary' />
                        : <EyeOffIcon className='h-5 w-5' />}
                    </div>}
                  />
                </div>
              </div>
              <Button fullWidth color='orange' type='submit' className='normal-case text-sm font-semibold'>
                <Link href='/signin'>
                  <a>
                    <span>Inscribez-vous</span>
                  </a>
                </Link>
              </Button>
            </form>
          </div>
          <footer className='relative shrink-0'>
            <div className='space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4'>
              <p className='text-center sm:text-left'>Vous avez déjà un compte ?</p>
              <Link href='/signin'>
                <a>
                  <Button color='orange' variant='outlined' className='normal-case text-sm font-regular text-black'>
                    Connectez-vous
                  </Button>
                </a>
              </Link>
            </div>
          </footer>
          </main>}
    </>
  )
}
