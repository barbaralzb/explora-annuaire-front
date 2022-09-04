import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import { getSortedPostsData } from 'lib/posts'
import { useRef, useState } from 'react'
import Pagination from 'components/Basics/pagination'
import CardComponent from 'components/CardComponent'
import PopoverComponent from 'components/Basics/PopoverComponent'
export async function getServerSideProps () {
  const posts = getSortedPostsData()
  return posts
}
export default function Home ({ posts }) {
  const refer = useRef(null)

  const [item, setItem] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = item.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const filterItem = (curcat) => {
    const newItem = posts.filter((newVal) => {
      return newVal.domain?.label === curcat
    })
    setItem(newItem)
  }

  const ResetFilter = () => {
    setItem(posts)
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel='shortcut icon' href='images/logo/logo-explora.png' />
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <LayoutPage>
        <Hero
          setItem={setItem}
          filterItem={filterItem}
          ResetFilter={ResetFilter}
          posts={posts}
        />

        <div className='w-full max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-32 pt-20 lg:pt-32 xl:pt-40 px-8'>
          <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between'>
              <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
              <div className='xl:hidden'>
                <PopoverComponent posts={posts} />
              </div>
            </div>
            <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
              {item.length > 0 &&
             currentEvents.map(post => (
               <CardComponent
                 key={post._id}
                 post={post}
                 ableToModifie={false}
               />
             )
             )}
            </div>
          </div>
          <Pagination currentPage={currentPage} totalEvents={item} eventsPerPage={eventsPerPage} paginate={paginate} />
        </div>

      </LayoutPage>
    </div>
  )
}
