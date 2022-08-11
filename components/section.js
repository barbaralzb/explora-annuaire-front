import { domainList } from 'utils/utils'
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
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-32 lg:max-w-none'>
          <div className='w-full flex justify-between'>
            <h2 className='text-2xl font-extrabold text-gray-900'>Evénements</h2>
          </div>
          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
            {posts.length > 0 &&
            posts.map(post => {
              let Color = ''
              domainList.filter(domain => domain.label === post.domain[0]).map(filteredDomain => {
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
      </div>
    </>
  )
}
