import { useRouter } from 'next/router'
import Footer from './footer'
import Navbar from './Navbar'

export default function Layout ({ children }) {
  const router = useRouter()

  const insite = router.pathname !== '/signin' && router.pathname !== '/signup'

  return (
    <>
      {insite && <Navbar />}
      <main className='relative'>
        {!insite && <div className='absolute inset-0 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] bg-squares bg-cover bg-no-repeat' />}
        {/* <div className='min-h-screen flex content-between justify-center'> */}
        <div className='min-h-screen h-full w-full'>
          {children}
        </div>
      </main>
      {insite && <Footer />}
    </>
  )
}
