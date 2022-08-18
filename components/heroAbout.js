
import Image from 'next/image'
import { useRef } from 'react'

export default function HeroAbout ({ filterItem, setItem, menuItems, heroAssos = false }) {
  const refer = useRef(null)

  return (

    <div className='min-h-screen h-full w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center'>
      <div className='shrink relative'>
        <div className='absolute top-0 hover:scale-150 scale-125 transition ease-in-out delay-150'>
          <Image
            src='/images/iconos/6.svg'
            width='200'
            height='100'
          />
        </div>
        <div className='absolute right-4 hover:scale-125 transition ease-in-out delay-150'>
          <Image
            src='/images/iconos/9.svg'
            width='150'
            height='150'
          />
        </div>
        <div className='flex flex-col h-full shrink'>
          <div className='grow justify-center items-center flex mx-auto'>
            <div className='flex flex-wrap gap-4 justify-center'>
              <main className='max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className='sm:text-center lg:text-left relative'>
                  <div className='absolute rotate-90 -bottom-1/3 right-0 hover:scale-150 scale-125 transition ease-in-out delay-150'>
                    <Image
                      src='/images/iconos/dashed.svg'
                      width='200'
                      height='100'
                    />
                  </div>
                  <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                    <span className='block xl:inline'>Data to enrich your</span>{' '}
                    <span className='block text-secondary xl:inline'>online business</span>
                  </h1>
                  <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.
                  </p>
                </div>

                <div>
                  <Image
                    src='/images/vectors/2-girls-colored.svg'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='contain'
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
