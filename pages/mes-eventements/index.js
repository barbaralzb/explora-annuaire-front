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
  const [deletedPostId, setDeletedPostId] = useState('')

  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${state.id}` : null, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = data.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <LayoutPage>
        <div className='max-w-7xl mx-auto my-16 sm:my-24 lg:my-32 w-full'>
          <div className='w-full mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between mt-8 sm:mt-16 lg:mt-24 mb-4 sm:mb-8 lg:mb-16'>
              <h2 className='text-3xl font-extrabold text-gray-900'>Mes événemets</h2>
            </div>
            <div className='mt-6 space-y-12 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 md:gap-y-24'>
              {data.length > 0 &&
             currentEvents.filter(post => post._id !== deletedPostId).map(post => {
               return (
                 <CardComponent
                   key={post._id}
                   post={post}
                   ableToModifie
                   setDeletedPostId={setDeletedPostId}
                 />
               )
             })}
            </div>
          </div>
          <Pagination currentPage={currentPage} totalEvents={data} eventsPerPage={eventsPerPage} paginate={paginate} />
        </div>
      </LayoutPage>
    </div>
  )
}
