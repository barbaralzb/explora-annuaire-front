import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function Footer () {
  return (
    <>
      <div className='bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20'>
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
              <FaInstagram className='text-2xl cursor-pointer hover:text-yellow-600' />
              <FaTwitter className='text-2xl cursor-pointer hover:text-blue-600' />
              <FaLinkedin className='text-2xl cursor-pointer hover:text-blue-600' />
              <FaYoutube className='text-2xl cursor-pointer hover:text-red-600' />
            </div>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>Evenements</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Stocks
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Futures & Options
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Mutual Funds
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Fixed deposits
            </li>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>Associations</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              About
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Products
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Pricing
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Careers
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Press & Media
            </li>
          </ul>
        </div>
        <div className='p-5'>
          <ul>
            <p className='text-gray-800 font-bold text-2xl pb-4'>Contact</p>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Contact
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Support Portals
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              List Of Charges
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Downloads & Resources
            </li>
            <li className='text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer'>
              Videos
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center text-center  p-5 bg-gray-50'>
        <h1 className=' text-gray-800 font-semibold'>
          © 2021-2022 All rights reserved | Build with ❤ by{' '}
          <span className='hover:text-secondary font-semibold cursor-pointer'>
            <Link passHref href='https://www.linkedin.com/in/barbara-lizama-869880200/'>
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
