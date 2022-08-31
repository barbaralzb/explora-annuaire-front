import { Avatar, Card, CardBody, CardFooter, Chip, IconButton } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { TbMapPin, TbWorld } from 'react-icons/tb'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'

export default function LayoutEvent ({ data, user, imagesPreview, forNewEvent = true }) {
  dayjs.locale('fr')

  const { _id } = data
  const [editEvent, setEditEvent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formData = {
    title: data.title || 'Title',
    description: data.description || 'Description',
    dateStart: data.dateStart || 'Date',
    dateEnd: data.dateEnd,
    fullDay: data.fullDay,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    address: data.address || 'Adress',
    city: data.city || 'Ville',
    postalCode: data.postalCode || 'Code Postale',
    ageRange: data.ageRange,
    domain: data.domain,
    email: data.email || 'email@exemple.com',
    website: data.website,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    images: data.images
  }

  const formatDate = (date) => (
    dayjs(date).format('dddd D MMMM YYYY')
  )

  const image = imagesPreview[0] || '/images/default/6.jpg'

  return (
    <Card className='shadow-2xl shadow-gray-300 border'>
      <CardBody>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{formData.title}</h2>
        <div className='flex justify-between'>
          <Chip variant='gradient' color={formData.domain?.color || 'deep-purple'} value={formData.domain?.label || 'Categorie'} />
          <span className='text-xs font-bold uppercase text-deep-purple-500'>{formData.ageRange || 'Public cible'}</span>
        </div>
        <p className='mt-4 text-gray-500'>{formData.description}</p>
        <div className='relative w-full grid items-center grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-5'>
          {/* <Dropdown setEditEvent={setEditEvent} id={_id} setIsLoading={setIsLoading} /> */}
          <div className='self-start lg:col-span-3'>
            <dl className='my-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
              <div>
                <div className='font-medium text-gray-900 border-b border-gray-200 flex items-center'><BiTime size='20' className='mr-2' />Heure</div>
                <div className='flex flex-col p-4'>
                  <span className='font-bold'>{formData.timeStart && formData.timeStart}{' '}</span>
                  {formData.timeEnd &&
                    <>
                      <span> jusqu'a </span>
                      <span className='font-bold'>{formData.timeEnd}</span>
                    </>}
                </div>
              </div>

              <div>
                <div className='font-medium text-gray-900 border-b border-gray-200 flex items-center'><AiOutlineCalendar size='18' className='mr-2' />Date</div>
                <div className='flex flex-col p-4'>
                  <span className='font-bold'>{formData.dateStart && formatDate(formData.dateStart)}{' '}</span>
                  {formData.dateEnd &&
                    <>
                      <span> jusqu'a </span>
                      <span className='font-bold'>{formatDate(formData.dateEnd)}</span>
                    </>}
                </div>
              </div>

              <div>
                <div className='font-medium text-gray-900 border-b border-gray-200 flex items-center'><TbMapPin size='20' className='mr-2' />Adress</div>
                <div className='flex flex-col p-4'>
                  <span className='font-bold'>{`${formData.address} ${formData.city} ${formData.postalCode}`}</span>
                </div>
              </div>

              <div>
                <div className='font-medium text-gray-900 border-b border-gray-200 flex items-center'><MdOutlineAlternateEmail size='18' className='mr-2' />Email contact</div>
                <div className='flex flex-col p-4'>
                  <span className='font-bold'>{formData.email}</span>
                </div>
              </div>

            </dl>
            <div className='flex gap-6'>
              {formData.facebook &&
                <Link href={formData?.facebook}>
                  <a target='_blank'>
                    <IconButton color='indigo' variant='gradient'>
                      <FaFacebookSquare size='16' />
                    </IconButton>
                  </a>
                </Link>}
              {formData.instagram &&
                <Link href={formData?.instagram}>
                  <a target='_blank'>
                    <IconButton color='pink' variant='gradient'>
                      <FaInstagram size='16' />
                    </IconButton>
                  </a>
                </Link>}
              {formData.website &&
                <Link href={formData?.website}>
                  <a target='_blank'>
                    <IconButton color='teal' variant='gradient'>
                      <TbWorld size='16' />
                    </IconButton>
                  </a>
                </Link>}
            </div>
          </div>
          <div className='flex flex-col gap-4 lg:col-span-2'>

            <div className='h-full w-full'>
              <Image
                src={image}
                alt='Explora'
                className='rounded-xl'
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='cover'
                priority
              />
            </div>
            {imagesPreview.length > 1 &&
              <div className='grid grid-cols-3 gap-x-4'>
                {imagesPreview.slice(1).map(img => (
                  <Image
                    key={img}
                    src={img}
                    alt='Explora'
                    className='rounded-xl'
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='cover'
                    priority
                  />
                ))}
              </div>}
          </div>

        </div>
      </CardBody>
      <CardFooter className='border-t bg-black rounded-b-xl'>
        <div className='flex'>
          <Link href={`/users/${forNewEvent ? user.id : data.user.id}`} className='pointer'>
            <a className='avatar flex items-center'>
              <Avatar
                src={user.image?.url || '/images/default.jpg'}
              />
              <div className='ml-3'>
                <span className='mb-0 font-bold text-white'>{user.username}</span>
              </div>
            </a>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
