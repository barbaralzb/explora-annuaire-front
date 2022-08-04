import Link from 'next/link'
import { domainList } from 'utils/utils'

export default function Card ({ post }) {
  return (
    <>
      <Link href={`/evenements/${post._id}`}>
        <a>
          <div className='group relative'>
            <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
              <img
                src={post.images[0].url}
                          /* alt={post.imageAlt} */
                className='w-full h-full object-center object-cover lg:w-full lg:h-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>
                  <span aria-hidden='true' className='absolute inset-0' />
                  {post.title}
                </h3>
                {
                  domainList.filter(domain => domain.label === post.domain[0]).map((filteredDomain) => {
                    const color = filteredDomain.color
                    const bgColor = `bg-${color}-400`
                    return (
                      bgColor,
                        <div key={filteredDomain.id} className={`mt-1 rounded px-2 ${bgColor}`}>
                          <p className='text-sm text-gray-500'>{filteredDomain.label}</p>
                        </div>
                    )
                  }
                  )
              }
              </div>
              <p className='text-sm font-medium text-gray-900'>{post.ageRange}</p>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}
