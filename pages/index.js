import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import { getSortedPostsData } from 'lib/posts'
import { useRef, useState } from 'react'
import Pagination from 'components/Basics/pagination'
import CardComponent from 'components/CardComponent'
import { domainList } from 'utils/utils'
import FilterScrollX from 'components/FilterScrollX'
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

  // const menuItems = [...new Set(posts.map((Val) => Val.domain[0]))]

  const filterItem = (curcat) => {
    console.log(curcat)
    const newItem = posts.filter((newVal) => {
      return newVal.domain[0] === curcat
    })
    setItem(newItem)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <LayoutPage>
        <Hero />
        {/* <div className='py-12' ref={refer}>
          <FilterScrollX refer={refer} setItem={setItem} filterItem={filterItem} />
        </div> */}
        <div className='max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-32'>
          <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between'>
              <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
            </div>
            <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
              {item.length > 0 &&
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
          <Pagination currentPage={currentPage} totalEvents={item} eventsPerPage={eventsPerPage} paginate={paginate} />
        </div>
      </LayoutPage>
    </div>
  )
}
