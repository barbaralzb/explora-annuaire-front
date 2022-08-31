import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import SectionObjects from 'components/Basics/SectionObjects'
import CTA from 'components/Basics/CallToAction'
import CallToAction from 'components/Basics/CallToAction'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import HeroAbout from 'components/heroAbout'
import Hero from 'components/hero'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' }
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-deep-purple-500-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.'
    }
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' }
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true }
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton'
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'
}

export default function Example () {
  return (

    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <LayoutPage>
        <HeroAbout />
        <SectionObjects />
        <CallToAction />

        <div className='min-h-screen h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center bg-square-indigo'>
          <div className='shrink relative'>
            <div className='absolute top-0 hidden lg:block'>
              <Image
                className='hover:scale-125 transition ease-in-out delay-150'
                src='/images/iconos/3.svg'
                width='250'
                height='200'
              />
            </div>
            <div className='absolute top-1/3 -left-12 scale-125 hover:scale-150 transition ease-in-out delay-150'>
              <Image
                src='/images/iconos/dashed.svg'
                width='150'
                height='100'
              />
            </div>
            <div className='absolute bottom-0 right-4 -z-10 hidden lg:block'>
              <Image
                className='hover:scale-125 transition ease-in-out delay-150'
                src='/images/iconos/7.svg'
                width='200'
                height='250'
              />
            </div>
            <div className='flex flex-col h-full shrink'>
              <div className='grow max-w-7xl justify-center items-center flex mx-auto'>
                <div className='flex flex-wrap gap-4 justify-center'>
                  <div className='tracking-tight font-extrabold text-gray-900 font-body text-8xl leading-snug text-center border-r-4 border-black pr-6'>
                    Explora
                  </div>

                  <div className='flex flex-col relative'>

                    <div className='rounded-full w-24 h-24 shadow-lg ring-gray-900 ring-2 relative overflow-hidden mb-6'>
                      <Image
                        className='rounded-full scale-125 hover:scale-150 transition ease-in-out delay-150'
                        src='/images/rouen.jpg'
                        width='100'
                        height='100'
                        objectFit='cover'
                        layout='fill'
                      />
                    </div>
                    <div className='absolute right-0'>
                      <Image
                        className='scale-125 hover:scale-150 transition ease-in-out delay-150'
                        src='/images/iconos/arrow-dashed.svg'
                        width='200'
                        height='100%'
                      />
                    </div>

                    <span className='tracking-tight font-extrabold text-gray-900 font-body text-8xl'>
                      Rouen
                    </span>

                  </div>

                  <span className='tracking-tight font-extrabold text-gray-900 font-body lg:text-8xl leading-snug text-center'>
                    TROUVER UNE ACTIVITÉ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pb-20 lg:pb-32 xl:pb-40 px-8'>
          <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            <div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
              <Image
                src='/images/default/5.jpg'
                alt='aider benevolts'
                objectFit='cover'
                layout='fill'
                width='100'
                height='100%'
              />
            </div>
            <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
                <Image
                  src='/images/default/1.jpg'
                  alt='aider benevolts'
                  objectFit='cover'
                  layout='fill'
                  width='100'
                  height='100%'
                />
              </div>
              <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
                <Image
                  src='/images/default/3.jpg'
                  alt='aider benevolts'
                  objectFit='cover'
                  layout='fill'
                  width='100'
                  height='100%'
                />
              </div>
            </div>
            <div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
              <Image
                src='/images/default/4.jpg'
                alt='aider benevolts'
                objectFit='cover'
                layout='fill'
                width='100'
                height='100%'
              />
            </div>
          </div>
          <div className='lg:text-center  pt-20 lg:pt-32 xl:pt-40'>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Découvrez l'associatif
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              Les associations de bénévoles. Offrent un cadre assez idéal pour des rencontres amicales fructueuses. Dans les associations, les participants ont des valeurs communes de générosité et d’attention aux autres. Des qualités qui font de bons amis et facilitent les rapprochements entre ceux qui les partagent
            </p>
            <div className='pt-10 lg:pt-16 xl:pt-20 flex lg:mt-0 lg:flex-shrink-0 justify-center'>
              <div className='inline-flex'>
                <Button color='pink' size='lg' className='rounded-full'>
                  <Link href='/'>
                    <a>
                      Commencer l'aventure !
                    </a>
                  </Link>
                </Button>
              </div>
              <div className='ml-3 inline-flex'>
                <Button color='deep-purple' size='lg' className='rounded-full'>
                  <Link href='/associations'>
                    <a>
                      Connaitre les association
                    </a>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </div>
  )
}
