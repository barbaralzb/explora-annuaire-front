
import Image from 'next/image'
import { useRef } from 'react'
import FilterScrollX from './FilterScrollX'

export default function HeroAssociations ({ filterItem, setItem, menuItems, posts }) {
  const refer = useRef(null)

  return (

    <div className='min-h-screen h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center bg-square-orange'>
      <div className='shrink relative'>
        <div className='flex flex-col h-full shrink'>
          <div className='grow max-w-7xl justify-center items-center flex mx-auto'>
            <div className='grid lg:grid-cols-2 gap-4 justify-center'>
              <main className='mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
                <div className='sm:text-center lg:text-left'>
                  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                    <span className='block xl:inline'>Explora</span>{' '}
                    <span className='block text-orange-700 xl:inline'>Espace de rencontre et de découverte</span>
                  </h1>
                  <p className='mt-3 text-base text-gray-700 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>
                    Choisissez une catégorie et découvrez les associations recherchant des bénévoles
                  </p>
                </div>
              </main>
              <div className='grid grid-cols-2 grid-rows-2 gap-8 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col relative h-full w-full rounded-2xl shadow-2xl'>
                  <Image
                    src='/images/default/2.jpg'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </div>
                <div className='flex flex-col relative h-full w-full rounded-2xl shadow-2xl'>
                  <Image
                    src='/images/default/3.jpg'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </div>
                <div className='flex flex-col relative h-full w-full rounded-2xl shadow-2xl'>
                  <Image
                    src='/images/default/4.jpg'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </div>
                <div className='flex flex-col relative h-full w-full rounded-2xl shadow-2xl'>
                  <Image
                    src='/images/default/5.jpg'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='grow-0 min-h-32 hidden xl:flex' ref={refer}>
            <FilterScrollX refer={refer} menuItems={menuItems} setItem={setItem} filterItem={filterItem} posts={posts} pageAssos />
          </div>
        </div>
      </div>
    </div>
  )
}
