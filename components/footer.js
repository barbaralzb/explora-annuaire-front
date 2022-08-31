import { IconButton } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

const navigation = [
  { icon: <FaInstagram size='16' />, href: '/' },
  { icon: <FaTwitter size='16' />, href: '/associations' },
  { icon: <FaLinkedin size='16' />, href: '/about' },
  { icon: <FaYoutube size='16' />, href: '/youtube' }
]

export default function Footer () {
  return (
    <>
      <div className='bg-white h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20'>
        <div className='p-5 '>
          <ul>
            <div>
              <Image
                className='hidden h-16 w-full lg:block'
                src='/images/logo/logo-explora.png'
                alt='Explora'
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
              />
            </div>
            <div className='flex gap-6 pb-5'>
              {navigation.map(item => (
                <Link href={item.href} key={item.href}>
                  <a>
                    <IconButton color='deep-purple' key={item.icon}>
                      {item.icon}
                    </IconButton>
                  </a>
                </Link>

              )
              )}
            </div>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>Associations</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-deep-purple-600 cursor-pointer'>
              <Link href='/associations'>
                <a>
                  Découvrir les associations
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>A propos</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-deep-purple-600 cursor-pointer'>
              <Link href='/about'>
                <a>
                  Connaître notre histoire
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center text-center  p-5 bg-deep-purple-50/70'>
        <h1 className=' text-gray-800 font-semibold'>
          © 2021-2022 All rights reserved | Build with ❤ by{' '}
          <span className='hover:text-deep-purple font-semibold cursor-pointer'>
            <Link href='https://www.linkedin.com/in/barbara-lizama-869880200/' passHref>
              <a target='_blank' rel='noopener noreferrer'>
                Barbara Lizama{' '}
              </a>
            </Link>
          </span>
        </h1>
      </div>
    </>
  )
}
