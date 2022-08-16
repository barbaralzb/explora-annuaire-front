import { Card, CardBody, Chip, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'

export default function CardAssociation ({ user }) {
  console.log(user)
  return (
    <Link href={`/associations/${user._id}`}>
      <a blur-shadow-image='true'>
        <Card>
          <CardBody className='grid grid-cols-2 lg:flex-row gap-x-4'>
            <Image
              className='rounded-lg'
              src={user.image.url || 'images/default/2.jpg'}
              alt={`image du profile du ${user.username}`}
              width='100%'
              height='100%'
              objectFit='cover'
            />
            <di className=''>
              <h5 className='mt-2 font-medium text-2xl'>{user.username}</h5>
              {user.domain &&
                <Chip variant='gradient' color={user.domain.color} value={user.domain.label} className='mb-3' />}
              <div className='overflow-hidden text-ellipsismax-h-72 h-72'>
                <Typography className='h-full text-ellipsis'>
                  {user.description}
                </Typography>
              </div>
            </di>
          </CardBody>
        </Card>
      </a>
    </Link>
  )
}
