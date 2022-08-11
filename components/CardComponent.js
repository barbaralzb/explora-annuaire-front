import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip } from '@material-tailwind/react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function CardComponent ({ post, bgColor }) {
  useEffect(() => {
  }, [bgColor])

  return (
    <Card>
      <Link href={`/evenements/${post._id}`}>
        <a href='#' blur-shadow-image='true'>
          <CardHeader className='m-4'>

            <img
              className='w-auto rounded-lg'
              src='https://demos.creative-tim.com/material-kit-pro/assets/img/annie-spratt.jpg'
              alt='card image'
            />

          </CardHeader>
          <CardBody>
            <div className='flex flex-wrap items-center justify-between'>
              <Chip variant='gradient' color={bgColor} value={post.domain} />
              <span className='text-xs font-bold uppercase text-orange-500'>{post.ageRange}</span>
            </div>
            <h5 className='mt-2 font-medium text-2xl'>{post.title}</h5>
            <p className='mb-3'>
              {post.description}
            </p>
          </CardBody>
        </a>
      </Link>
      <CardFooter>
        <div className='flex'>
          <Link href={`/users/${post.user._id}`} className='pointer'>
            <a href='#' className='avatar flex'>
              <Avatar
                src={post.user.image[0] ? post.user.image[0].url : 'https://demos.creative-tim.com/material-kit-pro/assets/img/marie.jpg'}
              />
              <div className='ml-3'>
                <span className='text-blue-gray-700 mb-0 font-bold'>{post.user.username}</span>
                <p className='mb-0 text-xs'>{`${post.user.city} ${post.user.postalCode}`}</p>
              </div>
            </a>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
