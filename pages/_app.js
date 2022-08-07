import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Navbar from 'components/Navbar'
import Footer from 'components/footer'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  const showHeader = router.pathname !== '/signin' && router.pathname !== '/signup'
  return (
    <>
      <AppWrapper>
        {showHeader && <Navbar />}
        <Component {...pageProps} />
        <Footer />
      </AppWrapper>
    </>
  )
}

export default MyApp
