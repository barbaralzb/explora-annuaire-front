import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, IconButton, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsCalendarCheck, BsPinMap } from 'react-icons/bs'
import { FaBusinessTime, FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { TbMapPin, TbWorld } from 'react-icons/tb'
import Dropdown from './Basics/Dropdown'
import FormEvent from './Basics/formEvent'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { domainList } from 'utils/utils'
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

  const bgcolor = (e) => {
    const find = domainList.find(domain => domain.label === e)
    if (find) {
      return find.color
    }
  }
  return (
    <Card>
      <div className='relative w-full px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:pt-16 lg:max-w-7xl lg:px-8 lg:grid-cols-5'>
        {/* <Dropdown setEditEvent={setEditEvent} id={_id} setIsLoading={setIsLoading} /> */}
        <div className='self-start lg:col-span-3'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{formData.title}</h2>
          <div className='flex justify-between'>
            <Chip variant='gradient' color={bgcolor(formData.domain) ? bgcolor(formData.domain) : 'deep-purple'} value={formData.domain || 'Domaine'} />
            <span className='text-xs font-bold uppercase text-deep-purple-500'>{formData.ageRange || 'Public cible'}</span>
          </div>
          <p className='mt-4 text-gray-500'>{formData.description}</p>

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
          <Image
              // aca tengo que ver como mostrar la foto cuando estoy en add o en visualizer
            src={imagesPreview[0] ? imagesPreview[0] : formData.images[0] ? formData.images[0].url : '/images/default/1.jpg'}
            alt='Explora'
            className='rounded-xl'
            width='100%'
            height='100%'
            layout='responsive'
            objectFit='cover'
            priority
          />
        </div>
      </div>
      <CardFooter className='border-t'>
        <div className='flex'>
          <Link href={`/users/${forNewEvent ? user.id : data.user.id}`} className='pointer'>
            <a className='avatar flex items-center'>
              <Avatar
                src={user.image.url || 'https://demos.creative-tim.com/material-kit-pro/assets/img/marie.jpg'}
              />
              <div className='ml-3'>
                <span className='text-blue-gray-700 mb-0 font-bold'>{user.username}</span>
              </div>
            </a>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
