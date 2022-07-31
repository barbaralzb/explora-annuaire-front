import Link from 'next/link'
import { ServerUrl } from 'utils/utils'

export default function Section ({ posts }) {
  console.log(ServerUrl + posts[0].images[0].lien)
  return (
    <>
      <div className='flex justify-center'>
        <div className='max-w-7xl w-full'>
          <div className='grid grid-cols-3 gap-4 mb-32'>
            <Link href='/signin'>
              <a className='inline-flex justify-center rounded-lg text-lg font-semibold py-3 px-4 text-black hover:bg-indigo-100 bg-indigo-100/80'>
                <span className='font-bold'>Connexion →</span>
              </a>
            </Link>
            <Link href='/signin'>
              <a className='inline-flex justify-center rounded-lg text-lg font-semibold py-3 px-4 text-black hover:bg-indigo-100 bg-indigo-100/80'>
                <span className='font-bold'>Connexion →</span>
              </a>
            </Link>
            <Link href='/signin'>
              <a className='inline-flex justify-center rounded-lg text-lg font-semibold py-3 px-4 text-black hover:bg-indigo-100 bg-indigo-100/80'>
                <span className='font-bold'>Connexion →</span>
              </a>
            </Link>
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
          <div className='grid grid-cols-2 gap-x-6 gap-y-12'>
            {posts.map((post) => (
              <div key={post._id}>
                <Link href={`/evenements/${post._id}`}>
                  <a>
                    <div className='group relative'>
                      <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                        <img
                          src={post.images ? ServerUrl + post.images[0].lien : './../public/images/proj'}
                          /* alt={post.imageAlt} */
                          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                        />
                      </div>
                      <div className='mt-4 flex justify-between'>
                        <div>
                          <h3 className='text-sm text-gray-700'>
                            <a href={post.href}>
                              <span aria-hidden='true' className='absolute inset-0' />
                              {post.name}
                            </a>
                          </h3>
                          <p className='mt-1 text-sm text-gray-500'>{post.domain}</p>
                        </div>
                        <p className='text-sm font-medium text-gray-900'>{post.ageRange}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
