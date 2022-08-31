import { Avatar, Card, CardBody, CardFooter, Chip } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './Basics/dropdown'

export default function CardComponent ({ post, ableToModifie, setDeletedPostId }) {
  const router = useRouter()
  const home = router.pathname === '/'

  console.log(post)
  return (
    <Card className='shadow-2xl shadow-gray-200'>
      <Link href={ableToModifie ? '' : `/evenements/${post._id}`}>
        <a>
          <CardBody className='p-2'>
            {ableToModifie &&
              <Dropdown id={post._id} setDeletedPostId={setDeletedPostId} />}
            <div className='max-h-40 w-full relative overflow-hidden rounded-xl'>
              <Image
                src={post.images[0]?.url || '/images/default/5.jpg'}
                alt={`image du evenement ${post.title} de l'association ${post.tile}`}
                width='100'
                height='100%'
                layout='responsive'
                objectFit='cover'
              />
            </div>
            <div className='flex flex-wrap items-center justify-between p-4'>
              <Chip variant='gradient' color={post.domain?.color} value={post.domain?.label} />
              <span className='text-xs font-bold uppercase text-deep-purple-500'>{post.ageRange}</span>
            </div>
            <h5 className='mt-2 font-medium text-2xl'>{post.title}</h5>
            <div className='mb-3 line-clamp-6'>
              <p>{post.description}</p>
            </div>
          </CardBody>
        </a>
      </Link>
      {home &&
        <CardFooter>
          <div className='flex'>
            <Link href={`/associations/${post.user?._id}`} className='pointer'>
              <a className='avatar flex'>
                <Avatar
                  src={post?.user?.image?.url || '/images/default/2.jpg'}
                />
                <div className='ml-3'>
                  <span className='text-blue-gray-700 mb-0 font-bold'>{post.user?.username}</span>
                </div>
              </a>
            </Link>
          </div>
        </CardFooter>}
    </Card>
  )
}
