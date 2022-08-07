import Link from 'next/link'
import { domainList } from 'utils/utils'
import Pagination from './Basics/pagination'
import Card from './Card'

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
    <div className='shadow-xl shadow-secondary/5'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none'>
          <h2 className='text-2xl font-extrabold text-gray-900'>Evenements</h2>
          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24'>
            {posts.map(post => (
              <div key={post._id} className='group relative'>
                <div className='relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                  <img
                    src={post.images === undefined || post.images === null || post.images.length === 0 ? 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg' : post.images[0].url}
                    alt=''
                    className='w-full h-full object-center object-cover'
                  />
                </div>
                <h3 className='mt-6 text-sm text-gray-500 flex justify-between'>
                  <Link href={`/evenements/${post._id}`}>
                    <a>
                      <span className='absolute inset-0' />
                      {post.ageRange[0].label === undefined || post.ageRange[0].label === null & post.ageRange[0].label}
                    </a>
                  </Link>
                </h3>
                <p className='text-base font-semibold text-gray-900'>{post.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  // <div>
  //   <div className='flex justify-center bg-hero-pattern bg-no-repeat bg-[right_top_-20rem]'>
  //     <div className='max-w-7xl'>

  //       <div className='flex justify-between'>
  //         <h1 className='font-extabold text-2xl'>Most Recent Post</h1>
  //         <Link href='/signup'>
  //           <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-white text-blackring-1 hove:ring-secondary hover:bg-white/25 hover:ring-slate-900/15 hover:text-secondary'>
  //             <span>More →</span>
  //           </a>
  //         </Link>
  //       </div>
  //       <div className='hidden sm:block' aria-hidden='true'>
  //         <div className='py-5'>
  //           <div className='border-t border-gray-200' />
  //         </div>
  //       </div>
  //       {/* // aca empieza mi lista de eventos */}
  //       <div className='grid grid-cols-3 gap-20 my-20'>
  //         {posts.map((post, index) => (
  //           <Card key={index} post={post} />
  //         ))}
  //       </div>
  //       <Pagination />
  //     </div>
  //   </div>
  // </div>
}
