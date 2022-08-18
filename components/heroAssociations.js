
import Image from 'next/image'
import { useRef } from 'react'
import FilterScrollX from './FilterScrollX'

export default function HeroAssociations ({ filterItem, setItem, menuItems }) {
  const refer = useRef(null)

  return (

    <div className='min-h-screen h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center bg-square-orange'>
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
            <div className='grid  grid-cols-2 gap-4 justify-center'>

              <div className='tracking-tight font-extrabold text-gray-900 font-body text-8xl leading-snug text-center border-r-4 border-black pr-6'>
                Explora,
                Lorem ipsum dolor sit amet,
              </div>

              <div className='flex flex-col relative h-full' />

            </div>
          </div>
          <div className='grow-0 min-h-32' ref={refer}>
            <FilterScrollX refer={refer} menuItems={menuItems} setItem={setItem} filterItem={filterItem} />
          </div>
        </div>
      </div>
    </div>
  )
}
