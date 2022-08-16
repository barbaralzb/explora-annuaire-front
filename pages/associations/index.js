import Head from 'next/head'
import LayoutPage from 'components/LayoutPage'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import { useState } from 'react'
import Pagination from 'components/Basics/pagination'
import { getSortedUsersData } from 'lib/users'
import CardAssociation from 'components/CardAssociation'
export async function getServerSideProps () {
  const users = getSortedUsersData()
  return users
}
export default function AssociationPage ({ users }) {
  const [item, setItem] = useState(users)
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = item.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const filterItem = (curcat) => {
    console.log(curcat)
    const newItem = users.filter((newVal) => {
      return newVal.domain.label === curcat
    })
    setItem(newItem)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Associations - Rouen</title>
        <meta name='description' content='Associations de Rouen evenements' />
      </Head>

      <LayoutPage>
        <Hero
          heroAssos
          filterItem={filterItem}
          setItem={setItem}
          // menuItems={menuItems}
        />
        <div className='max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-32'>
          <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
            <div className='w-full flex justify-between'>
              <h2 className='text-2xl font-extrabold text-gray-900'>Associations de Rouen</h2>
            </div>
            <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-24'>
              {item.length > 0 &&
             currentEvents.map(user => {
               return (
                 <CardAssociation
                   key={user.id}
                   user={user}
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
