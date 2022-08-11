
import { Card, Button } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import FilterScrollX from './FilterScrollX'

export default function Hero () {
  const refer = useRef(null)

  return (
    <div className='min-h-screen h-full w-full max-h-screen'>
      <div className='flex flex-col items-center h-full z-50 py-32 md:py-0'>
        <div className='h-full max-w-7xl'>
          <div className='h-full flex flex-col justify-items-stretch'>
            <div className='md:grid gap-x-12 grid-cols-2 h-full items-center'>
              <main>
                <div className='sm:text-center lg:text-left'>
                  <h1 className='tracking-tight font-extrabold text-gray-900 '>
                    <div className='block text-4xl sm:text-5xl md:text-6xl'>Explora Rouen</div>
                    <div className='block text-indigo-600 text-2xl sm:text-3xl md:text-4xl'>Annuaire des evenement associatif</div>
                  </h1>
                  <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.
                  </p>
                  <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                    <Button color='indigo' size='lg' className='rounded-md shadow'>
                      <Link href='/signin'>
                        <a>
                          Get started
                        </a>
                      </Link>
                    </Button>
                    <Link href='/'>
                      <a>
                        <Button color='indigo' size='lg' variant='outlined' className='mt-3 sm:mt-0 sm:ml-3'>
                          Live demo
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </main>
              <div className='w-1/2 md:w-full mx-auto'>
                <div className='relative flex justify-center'>
                  <Card className='w-full h-full md:w-3/5 md:h-auto absolute blur-sm'>
                    <Image
                      src='/images/default/6.jpg'
                      width='100%'
                      height='100%'
                      layout='responsive'
                      objectFit='contain'
                    />
                  </Card>
                  <Card className='w-full h-full md:w-3/5 md:h-auto left-8 -top-8'>
                    <Image
                      src='/images/default/6.jpg'
                      width='100%'
                      height='100%'
                      layout='responsive'
                      objectFit='contain'
                    />
                  </Card>
                </div>
              </div>
            </div>
            <div className='self-end py-12' ref={refer}>
              <FilterScrollX refer={refer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
