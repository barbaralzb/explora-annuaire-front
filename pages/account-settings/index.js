import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'
import { Loader } from 'components/Basics/Loader'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Informations de l`association', href: '/account-settings/information-association' },
  { name: 'Modifier mot de passe', href: '/account-settings/login' },
  { name: 'Désactiver votre compte', href: '/account-settings/delete' }
]

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const i = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AccountSettings () {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  return (
    <>
      <div className='h-screen'>
        <div className='flex items-center justify-center p-12 h-full'>
          <div className='max-w-7xl mx-auto relative'>
            <motion.ul
              className='space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'
              variants={container}
              initial='hidden'
              animate='visible'
            >
              {navigation.map(item => (
                <motion.li key={item.name} variants={i}>
                  <Link href={item.href}>
                    <a>
                      <div className='bg-white h-full p-8 space-y-3 border-2 group-hover:opacity-75 rounded-xl'>

                        <h1 className='text-2xl font-semibold text-gray-700 capitalize'>{item.name}</h1>

                        <p className='text-gray-500 dark:text-gray-300'>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                        </p>
                      </div>
                    </a>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </>
  )
}
