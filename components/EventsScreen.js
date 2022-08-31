import { useState } from 'react'
import Pagination from 'components/Basics/pagination'
import CardComponent from 'components/CardComponent'
import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function EventScreen ({ title }) {
  const { state } = useAppContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)
  const [DeletedPostId, setDeletedPostId] = useState(false)

  const { data, mutate, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${state.id}` : null, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = data.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  DeletedPostId && mutate()

  return (
    <>
      <div className='max-w-6xl mx-auto pb-16 sm:pb-24 lg:pb-32'>
        <div className='w-full flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-gray-900 my-8 '>{title}</h2>
          <div className='w-8 h-8 border rounded-xl flex justify-center items-center ml-4'>
            <span className='font-bold'>{data.length}</span>
          </div>
        </div>
        <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
          {data.length > 0 &&
             currentEvents.map(post => (
               <CardComponent
                 key={post._id}
                 post={post}
                 setDeletedPostId={setDeletedPostId}
               />
             )
             )}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalEvents={data} eventsPerPage={eventsPerPage} paginate={paginate} />
    </>
  )
}
