import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Navbar from 'components/Navbar'
import Footer from 'components/footer'
import { useRouter } from 'next/router'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()
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
