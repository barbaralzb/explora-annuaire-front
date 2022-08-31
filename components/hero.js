
import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import { useRef } from 'react'
import FilterScrollX from './FilterScrollX'

export default function Hero ({ filterItem, setItem, menuItems, ResetFilter, heroAssos = false, posts }) {
  const refer = useRef(null)

  return (

    <div className='h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center bg-square-indigo'>
      <div className='shrink relative'>
        <div className='absolute top-0 hidden xl:block'>
          <Image
            className='hover:scale-125 transition ease-in-out delay-150'
            src='/images/iconos/3.svg'
            width='200'
            height='100'
          />
        </div>
        <div className='hidden xl:block absolute top-1/3 left-10 scale-125 hover:scale-150 transition ease-in-out delay-150'>
          <Image
            src='/images/iconos/dashed.svg'
            width='200'
            height='100'
          />
        </div>
        <div className='absolute top-1/2 right-4'>
          <Image
            className='hover:scale-125 transition ease-in-out delay-150'
            src='/images/iconos/7.svg'
            width='150'
            height='150'
          />
        </div>
        {/* <div className='flex flex-col h-full shrink'>
          <div className='grow max-w-7xl justify-center items-center flex mx-auto'>
            <div className='flex flex-wrap gap-4 justify-center'>
              <div className='tracking-tight font-extrabold text-gray-900 font-body text-6xl lg:text-8xl leading-snug text-center border-r-4 border-black pr-6'>
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

                <span className='tracking-tight font-extrabold text-gray-900 font-body text-6xl lg:text-8xl'>
                  Rouen
                </span>

              </div>

              <span className='tracking-tight font-extrabold text-gray-900 font-body text-6xl lg:text-8xl leading-snug text-center'>
                Lorem ipsum dolor sit amet,
              </span>
            </div>
          </div> */}

        <div className='xl:pb-40'>
          <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            <main className='mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Explora</span>{' '}
                  <span className='block text-deep-purple-600 xl:inline'>Bénévolats Rouen</span>
                </h1>
                <p className='mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>
                  Explora est un annuaire en ligne pour encourager la participation aux événements associatifs.
                </p>
              </div>
            </main>
            <div className='hidden aspect-w-3 aspect-h-4 rounded-xl overflow-hidden lg:block'>
              <Image
                src='/images/default/5.jpg'
                alt='aider benevolts'
                objectFit='cover'
                layout='fill'
                width='100'
                height='100%'
              />
            </div>
            <div className='grid grid-cols-2 gap-x-8 m-8 lg:m-0 lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-w-3 aspect-h-2 rounded-xl overflow-hidden'>
                <Image
                  src='/images/default/1.jpg'
                  alt='aider benevolts'
                  objectFit='cover'
                  layout='fill'
                  width='100'
                  height='100%'
                />
              </div>
              <div className='aspect-w-3 aspect-h-2 rounded-xl overflow-hidden'>
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
          </div>
          <div className='grow-0 min-h-32 hidden xl:flex' ref={refer}>
            <FilterScrollX refer={refer} menuItems={menuItems} setItem={setItem} filterItem={filterItem} ResetFilter={ResetFilter} posts={posts} />
          </div>
        </div>
      </div>
    </div>
  )
}
