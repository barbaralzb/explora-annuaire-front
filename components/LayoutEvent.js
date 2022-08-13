import { Avatar, Card, CardBody, CardFooter, CardHeader, IconButton, Typography } from '@material-tailwind/react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsCalendarCheck, BsPinMap } from 'react-icons/bs'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'
import fr from 'date-fns/locale/fr'
import Dropdown from './Basics/Dropdown'
import FormEvent from './Basics/formEvent'
import { registerLocale } from 'react-datepicker'

export default function LayoutEvent ({ data, user }) {
  registerLocale('fr', fr)
  moment.locale('fr')

  const { _id } = data
  const [editEvent, setEditEvent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formData = {
    title: data.title || 'Title',
    description: data.description || 'Description',
    dateStart: data.dateStart || 'Date',
    dateEnd: data.dateEnd,
    fullDay: data.fullDay,
    timeStart: data.timeStart || 'Heure',
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
    moment.utc(date).format('dddd Do MMMM YYYY')
  )

  return (
    <Card>
      <div className='relative w-full px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:py-16 lg:max-w-7xl lg:px-8 lg:grid-cols-5'>
        {/* <Dropdown setEditEvent={setEditEvent} id={_id} setIsLoading={setIsLoading} /> */}
        <div className='self-start lg:col-span-3'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{formData.title}</h2>
          <p className='mt-4 text-gray-500'>{formData.description}</p>
          <dl className='my-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
            <div className='border-t border-gray-200 pt-4'>
              <div className='font-medium text-gray-900'>Heure</div>
              <dd className='mt-2 text-sm text-gray-500'>{`${formData.fullDay ? formData.fullDay : formData.timeStart + formData.timeEnd}`}</dd>
            </div>
            <div className='border-t border-gray-200 pt-4'>
              <dt className='font-medium text-gray-900'>Date</dt>
              <dd className='mt-2 text-sm text-gray-500'>{formatDate(formData.dateStart)}{formData.dateEnd}</dd>
            </div>
            <div className='border-t border-gray-200 pt-4'>
              <dt className='font-medium text-gray-900'>Adress</dt>
              <dd className='mt-2 text-sm text-gray-500'>{formData.address}{formData.city}{formData.postalCode}</dd>
            </div>
            <div className='border-t border-gray-200 pt-4'>
              <dt className='font-medium text-gray-900'>Contact</dt>
              <dd className='mt-2 text-sm text-gray-500'>{formData.email}</dd>
            </div>
          </dl>
          <div className='flex gap-6'>
            {formData.facebook &&
              <Link href={formData?.facebook}>
                <a target='_blank'>
                  <IconButton color='deep-purple'>
                    <FaFacebookSquare size='16' />
                  </IconButton>
                </a>
              </Link>}
            {formData.instagram &&
              <Link href={formData?.instagram}>
                <a target='_blank'>
                  <IconButton color='deep-purple'>
                    <FaInstagram size='16' />
                  </IconButton>
                </a>
              </Link>}
            {formData.website &&
              <Link href={formData?.website}>
                <a target='_blank'>
                  <IconButton color='deep-purple'>
                    <TbWorld size='16' />
                  </IconButton>
                </a>
              </Link>}
          </div>
        </div>

        <div className='flex flex-col gap-4 lg:col-span-2'>
          <Card>
            <CardHeader color='indigo'>
              <Image
                src={formData.images[0] ? formData.images[0].url : '/images/default/1.jpg'}
                alt='Explora'
                className='rounded-xl'
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='cover'
              />
            </CardHeader>
            <CardBody className='text-center'>
              <Typography variant='h5' className='mb-2 flex items-center justify-between'>
                <BsCalendarCheck />
                {formatDate(formData.dateStart)}
              </Typography>
              <div className='mb-2 flex items-center justify-between'>
                <BsPinMap size='16' />
                {`${formData.address} ${formData.city} ${formData.postalCode}`}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <CardFooter>
        <div className='flex'>
          <Link href={`/users/${user.id}`} className='pointer'>
            <a className='avatar flex items-center'>
              <Avatar
                src={user.image[0] ? user.image[0].url : 'https://demos.creative-tim.com/material-kit-pro/assets/img/marie.jpg'}
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
