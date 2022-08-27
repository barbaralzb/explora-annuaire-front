import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { domainList } from 'utils/utils'
import Pagination from './Basics/pagination'
import CardComponent from './CardComponent'

export default function Section ({ currentEvents, totalEvents, eventsPerPage }) {
  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
          <div className='w-full flex justify-between'>
            <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
          </div>
          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
            {totalEvents.length > 0 &&
             currentEvents.map(post => {
               let Color = ''
               domainList.filter(domain => domain?.label === post.domain[0]).map(filteredDomain => {
                 const color = filteredDomain.color
                 // const bgColor = `bg-${color}-500`
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
        <Pagination totalEvents={totalEvents} eventsPerPage={eventsPerPage} paginate={paginate} />
      </div>
    </>
  )
}
