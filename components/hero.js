
import Image from 'next/image'
import { useRef } from 'react'
import FilterScrollX from './FilterScrollX'

export default function Hero ({ filterItem, setItem, menuItems, ResetFilter, heroAssos = false }) {
  const refer = useRef(null)

  return (

    <div className='min-h-screen h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center bg-square-indigo'>
      <div className='shrink relative'>
        <div className='absolute top-0'>
          <Image
            className='hover:scale-125 transition ease-in-out delay-150'
            src='/images/iconos/3.svg'
            width='200'
            height='100'
          />
        </div>
        <div className='absolute top-1/3 left-10 scale-125 hover:scale-150 transition ease-in-out delay-150'>
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

              <span className='tracking-tight font-extrabold text-gray-900 font-body text-8xl leading-snug text-center'>
                Lorem ipsum dolor sit amet,
              </span>
            </div>
          </div>
          <div className='grow-0 min-h-32' ref={refer}>
            <FilterScrollX refer={refer} menuItems={menuItems} setItem={setItem} filterItem={filterItem} ResetFilter={ResetFilter} />
          </div>
        </div>
      </div>
    </div>
  )
}
