import { Fragment, useState, useEffect } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from '@material-tailwind/react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/AppContext'
import { initialState } from 'context/AppReducer'

export default function Example () {
  const [openNav, setOpenNav] = useState(false)
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState('')
  const { state, dispatch } = useAppContext()
  const [user, setUser] = useState(state)

  useEffect(() => {
    setUser(state)
  }, [state, currentPath])

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navigation = [
    { name: 'Evénements', href: '/' },
    { name: 'Associations', href: '/associations' },
    { name: 'À propos', href: '/about' }
  ]
  function classNames (...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const path = router.pathname

  const handlerLogOut = () => {
    window.localStorage.removeItem('loggedUser', JSON.stringify(state))
    dispatch({
      type: 'init_stored',
      value: initialState
    })
    router.push('/')
  }

  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false)
      } else { // if scroll up show the navbar
        setShow(true)
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='#' className='flex items-center' />
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link href='/'>
          <a className='block px-4 py-2 text-sm text-gray-700'>Evénements</a>
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link href='/associations'>
          <a className='block px-4 py-2 text-sm text-gray-700'>Associations</a>
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link href='/about'>
          <a className='block px-4 py-2 text-sm text-gray-700'>À propos</a>
        </Link>

      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link href='/mon-compte'>
          <a className='block px-4 py-2 text-sm text-gray-700'>Mon compte</a>
        </Link>

      </Typography>
      {user !== null &&
        <>
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-normal'
          >
            <Link href='/signin'>
              <div onClick={handlerLogOut}>
                <a className='block px-4 py-2 text-sm text-gray-700'>Déconnexion</a>
              </div>
            </Link>
          </Typography>

          <Button fullWidth color='deep-purple' variant='gradient'>
            <Link href='/evenements/add'>
              <a>
                <span className='font-bold'>Créer un événement →</span>
              </a>
            </Link>
          </Button>
        </>}

      {!user &&
        <>
          <Link href='/signup'>
            <a>
              <Button fullWidth color='deep-purple' variant='outlined'>
                <span>Vous etes une association ? Enregistrer →</span>
              </Button>
            </a>
          </Link>

          <Button fullWidth color='deep-purple' variant='gradient'>
            <Link href='/signin'>
              <a>
                <span className='font-bold'>Connexion →</span>
              </a>
            </Link>
          </Button>
        </>}
    </ul>
  )

  return (
    <Transition
      show={show}
      enter='transition-opacity duration-75'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='absolute left-2/4 z-[999] flex w-full -translate-x-2/4 flex-wrap items-center lg:fixed active'>
        <Navbar fullWidth className='mx-auto w-full py-2 px-4 lg:px-8 lg:py-4 shadow-2xl shadow-gray-200/40'>
          <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
            <Link href='/'>
              <a className='mr-4 cursor-pointer py-1.5 font-normal'>
                <img
                  className='h-12 w-auto'
                  src='/images/logo/logo-explora.png'
                  alt='Explora'
                  width='100%'
                  height='100%'
                  layout='responsive'
                  objectFit='contain'
                />
              </a>
            </Link>
            <div className='hidden lg:block'>
              {navigation.map(item => (
                <Link key={item.name} href={item.href}>
                  <a
                    onClick={() => setCurrentPath(item.href)}
                    className={classNames(
                      item.href === path ? 'text-black' : 'text-black/60 hover:text-black',
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
            <div className='hidden lg:inline-block'>
              {user !== null
                ? <div className='flex gap-4'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <Menu.Button>
                      <Button variant='outlined' color='deep-purple' className='normal-case text-sm font-regular text-deep-purple-700 flex items-center'>
                        Compte
                        <AiOutlineUser size='14' className='ml-2' />
                      </Button>
                    </Menu.Button>
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
                              <Link href='/mon-compte/'>
                                <a className='block px-4 py-2 text-sm text-gray-700'>Mon compte</a>
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
                              <a className='block px-4 py-2 text-sm text-gray-700 '>Déconnexion</a>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Link href='/evenements/add'>
                    {/* <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 text-white hover:bg-deep-purple-500 bg-deep-purple-500/90 shadow-lg shadow-deep-purple-500/20'> */}
                    <a>
                      <Button color='deep-purple' className='bg-deep-purple-600 normal-case text-sm font-regular text-black'>
                        <span className='font-bold text-white'>Créer evenement →</span>
                      </Button>
                    </a>
                  </Link>
                </div>
                : <div className='flex gap-4 items-center'>
                  <span>Vous etes une association ?</span>
                  <Link href='/signup'>
                    <a>
                      <Button color='deep-purple' variant='outlined'>
                        <span>Enregistrer →</span>
                      </Button>
                    </a>
                  </Link>

                  <Button color='deep-purple' variant='gradient'>
                    <Link href='/signin'>
                      <a>
                        <span className='font-bold'>Connexion →</span>
                      </a>
                    </Link>
                  </Button>

                </div>}
            </div>
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav
                ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  )
                : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                  )}
            </IconButton>
          </div>
          <MobileNav open={openNav}>
            {navList}
          </MobileNav>
        </Navbar>
      </div>
    </Transition>
  )
}
