import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import Section from 'components/section'
import { getSortedPostsData } from 'lib/posts'
import { useState } from 'react'
import Pagination from 'components/Basics/pagination'
import CardComponent from 'components/CardComponent'
import { domainList } from 'utils/utils'
export async function getServerSideProps () {
  const posts = getSortedPostsData()
  return posts
}
export default function Home ({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)

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
        <Hero />
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between'>
              <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
            </div>
            <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
              {posts.length > 0 &&
             currentEvents.map(post => {
               let Color = ''
               domainList.filter(domain => domain.label === post.domain[0]).map(filteredDomain => {
                 const color = filteredDomain.color
                 return (Color = color)
               })
               return (
                 <CardComponent
                   key={post._id}
                   post={post}
                   bgColor={Color}
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
