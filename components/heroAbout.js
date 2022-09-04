
import { useRef } from 'react'
import YouTube from 'react-youtube'

export default function HeroAbout ({ filterItem, setItem, menuItems, heroAssos = false }) {
  const refer = useRef(null)

  const opts = {
    height: '290',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  const _onReady = (event) => {
    event.target.pauseVideo()
  }

  return (

    <div className='w-full max-h-screen pt-20 lg:pt-32 xl:pt-40 flex-1 flex bg-no-repeat justify-center px-8'>
      <div className='shrink relative'>
        <div className='flex flex-col h-full shrink'>
          <div className='grow justify-center items-center flex mx-auto'>
            <div className='flex flex-wrap gap-4 justify-center'>
              <main className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8'>
                <div className='sm:text-center lg:text-left relative'>
                  <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                    <span className='block xl:inline'>Explora</span>{' '}
                    <div className='block text-deep-purple-600 uppercase'>BÉNÉVOLATS rouen</div>
                  </h1>
                  <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                    Explora est un annuaire en ligne pour encourager la participation aux événements associatifs.
                  </p>
                </div>
                <div className='rounded-xl'>
                  <YouTube
                    videoId='xLvrRqvNgyg'
                    opts={opts} onReady={_onReady}
                    iframeClassName='rounded-xl shadow-xl'
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
