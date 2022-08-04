import Link from 'next/link'
import { domainList } from 'utils/utils'
import Pagination from './Basics/pagination'
import Card from './Card'

export default function Section ({ posts }) {
  return (
    <div>
      <div className='flex justify-center bg-hero-pattern bg-no-repeat bg-[right_top_-20rem]'>
        <div className='max-w-7xl'>
          <div className='grid grid-cols-8 gap-4 my-20'>
            {domainList.map((item) => (
              <Link href='/signin' key={item.id}>
                <a className='text-xs flex flex-col justify-center rounded-lg py-3 px-4 text-black hover:bg-white hover:shadow-lg hover:shadow-secondary/10 bg-white/60 items-center'>
                  {item.icon}
                  <span className='font-bold text-center'>{item.label}</span>
                </a>
              </Link>
            )
            )}
          </div>
          <div className='flex justify-between'>
            <h1 className='font-extabold text-2xl'>Most Recent Post</h1>
            <Link href='/signup'>
              <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-white text-blackring-1 hove:ring-secondary hover:bg-white/25 hover:ring-slate-900/15 hover:text-secondary'>
                <span>More →</span>
              </a>
            </Link>
          </div>
          <div className='hidden sm:block' aria-hidden='true'>
            <div className='py-5'>
              <div className='border-t border-gray-200' />
            </div>
          </div>
          {/* // aca empieza mi lista de eventos */}
          <div className='grid grid-cols-3 gap-20 my-20'>
            {posts.map((post, index) => (
              <Card key={index} post={post} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}
