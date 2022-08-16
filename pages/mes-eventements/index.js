import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import styles from 'styles/Home.module.css'
import { useAppContext } from 'context/AppContext'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import CardComponent from 'components/CardComponent'
import Pagination from 'components/Basics/pagination'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function MesEvenements () {
  const { state } = useAppContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)

  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${state.id}` : null, fetcher)

  const [posts, setPosts] = useState('')

  useEffect(() => {
    setPosts(data)
    console.log(posts)
  }, [data])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log(data)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = posts.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <LayoutPage>

        <div className='max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-32'>
          <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between'>
              <h2 className='text-2xl font-extrabold text-gray-900'>Associations de Rouen</h2>
            </div>
            <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-24'>
              {data.length > 0 &&
             currentEvents.map(user => {
               return (
                 <CardComponent
                   key={user._id}
                   user={user}
                 />

               )
             })}
            </div>
          </div>
          <Pagination currentPage={currentPage} totalEvents={posts} eventsPerPage={eventsPerPage} paginate={paginate} />
        </div>
      </LayoutPage>
    </div>
  )
}
