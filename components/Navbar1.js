/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { useRouter } from 'next/router'
import { initialState } from 'context/AppReducer'
import { RiUser6Line } from 'react-icons/ri'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}
// const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Navbar () {
  const { state, dispatch } = useAppContext()
  const router = useRouter()
  const [user, setUser] = useState(state)
  const [currentPath, setCurrentPath] = useState('')

  // const { data, error } = useSWR(user ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.id}` : null, fetcher)

  const navigation = [
    { name: 'Evénements', href: '/' },
    { name: 'Associations', href: '/associations' },
    { name: 'A props', href: '/about' }
  ]
  const path = router.pathname

  useEffect(() => {
    setUser(state)
  }, [state, currentPath])

  const handlerLogOut = () => {
    window.localStorage.removeItem('loggedUser', JSON.stringify(state))
    dispatch({
      type: 'init_stored',
      value: initialState
    })
    router.push('/')
  }
  // if (error) return <div>Failed to load</div>
  // if (!data) return <Loader />

  return (
    <Disclosure as='nav' className='sticky top-0 z-10 bg-white/90 shadow-lg shadow-secondary/5 backdrop-blur-sm'>
      {({ open }) => (
        <>
          <div className='max-w-7xl relative mx-auto'>
            <div className='relative flex items-center justify-between h-24'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open
                    ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                      )
                    : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                      )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-16 w-auto'
                    src='images/logo/logo-explora.png'
                    alt='Explora'
                  />
                  <img
                    className='hidden lg:block h-16 w-auto'
                    src='/images/logo/logo-explora.png'
                    alt='Explora'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='contain'
                  />
                </div>
                <div className='hidden sm:block sm:ml-16'>
                  <div className='flex space-x-4 h-full items-center'>
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          onClick={() => setCurrentPath(item.href)}
                          className={classNames(
                            item.href === path ? 'text-black' : 'text-black/70 hover:text-black',
                            'px-3 py-2 rounded-md font-semibold '
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    )
                    )}
                  </div>
                </div>
              </div>
              {user !== null
                ? <div className='flex gap-4'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div className='selection:h-full rounded-full bg-gradient-to-r from-secondary via-secondary/90 to-secondary shadow-lg shadow-secondary/20'>
                      <Menu.Button className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary/50 focus:ring-secondary'>
                        <span className='sr-only'>Open user menu</span>
                        {/* <Image
                          className='h-10 w-10 rounded-full'
                          src='/images/ffflux.svg'
                          alt=''
                          width='34'
                          height='34'
                        /> */}
                        <RiUser6Line size='35' className='p-2 text-white' />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>

                          {({ active }) => (
                            <div
                              className={classNames(active ? 'bg-gray-100' : '')}
                            >
                              <Link href='/account-settings'>
                                <a className='block px-4 py-2 text-sm text-gray-700'>Mon compte</a>
                              </Link>
                            </div>
                          )}

                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (

                            <div
                              className={classNames(active ? 'bg-gray-100' : '')}
                            >
                              <Link href='/mes-eventements'>
                                <a className='block px-4 py-2 text-sm text-gray-700'>Mes evenement</a>
                              </Link>

                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={handlerLogOut}
                              className={classNames(active ? 'bg-gray-100' : '')}
                            >
                              <a className='block px-4 py-2 text-sm text-gray-700'>Déconnexion</a>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Link href='/evenements/add'>
                    <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 text-white hover:bg-secondary bg-secondary/90 shadow-lg shadow-secondary/20'>
                      <span className='font-bold'>Crée evenement →</span>
                    </a>
                  </Link>
                  </div>
                : <div className='flex gap-4 items-center'>
                  <span>Vous etes une association ?</span>
                  <Link href='/signup'>
                    <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-white text-blackring-1 hove:ring-secondary hover:bg-white/25 hover:ring-slate-900/15 hover:text-secondary'>
                      <span>Enregistrer →</span>
                    </a>
                  </Link>
                  <Link href='/signin'>
                    <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 text-white hover:bg-secondary bg-secondary/80'>
                      <span className='font-bold'>Connexion →</span>
                    </a>
                  </Link>
                  </div>}

            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
