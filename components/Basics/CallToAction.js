import { Button } from '@material-tailwind/react'
import Link from 'next/link'

/* This example requires Tailwind CSS v2.0+ */
export default function CallToAction () {
  return (
    <div className='bg-gray-50'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          <span className='block'>Etez-vous un association ?</span>
          <span className='block text-deep-purple-500'>Publie vos evenements pour rancontrer des benevolats</span>
        </h2>
        <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
          <div className='inline-flex'>
            <Button color='deep-purple' variant='outlined'>
              <Link href='/signup'>
                <a>
                  connexion
                </a>
              </Link>
            </Button>
          </div>
          <div className='ml-3 inline-flex'>
            <Button color='deep-purple'>
              <Link href='/signin'>
                <a>
                  Enregistrer
                </a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
