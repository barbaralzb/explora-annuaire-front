import { useRouter } from 'next/router'
import Footer from './footer'
import Navbar from './Navbar'

export default function Layout ({ children }) {
  const router = useRouter()

  const show = router.pathname !== '/signin' && router.pathname !== '/signup'

  return (
    <>
      {show && <Navbar />}
      <main className='relative'>
        {!show && <div className='absolute inset-0 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] bg-squares bg-cover bg-no-repeat' />}
        <div className={show ? 'h-min-screen min-h-screen  bg-hero-pattern bg-cover bg-no-repeat bg-[right_top_-80rem]' : 'h-min-screen min-h-screen flex content-between justify-center'}>
          <div className={show ? 'relative z-50 h-fit py-20 lg:py-32' : ''}>
            <div className='container mx-auto'>
              {children}
            </div>
          </div>
        </div>
      </main>
      {show && <Footer />}
    </>
  )
}
