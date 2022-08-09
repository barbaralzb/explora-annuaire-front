import { useEffect } from 'react'
import { domainList } from 'utils/utils'
import Pagination from './Basics/pagination'
import PopoverComponent from './Basics/PopoverComponent'
import CardComponent from './CardComponent'

const fakeData = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#'
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#'
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#'
  }
]
export default function Section ({ posts }) {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none'>
          <div className='w-full flex justify-between'>
            <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
            <PopoverComponent />
          </div>
          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
            {posts.length > 0 &&
            posts.map(post => {
              let e = ''
              domainList.filter(domain => domain.label === post.domain[0]).map(filteredDomain => {
                const color = filteredDomain.color
                const bgColor = `bg-${color}-500`
                return (e = bgColor)
              })
              return (
                <CardComponent
                  key={post._id}
                  post={post}
                  bgColor={e}
                />

              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
