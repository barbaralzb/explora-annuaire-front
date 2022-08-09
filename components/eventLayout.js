import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Dropdown from './Basics/Dropdown'
import FormEvent from './Basics/formEvent'

export default function EventLayout ({ data }) {
  const { _id } = data
  const [editEvent, setEditEvent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formData = {
    title: data.title,
    description: data.description,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    fullDay: data.fullDay,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    ageRange: data.ageRange,
    domain: data.domain,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    images: data.images
  }
  return (
    <>
      {
        editEvent
          ? <div className='flex justify-center p-12'>
            <div className='max-w-7xl'>
              <FormEvent
                formData={formData}
                forNewEvent={false}
                id={_id}
                setIsLoading={setIsLoading}
              />
            </div>
            </div>
          : <div className='bg-white'>
            <div className='relative shadow max-w-2xl mx-auto my-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2 rounded-md'>
              <Dropdown setEditEvent={setEditEvent} id={_id} setIsLoading={setIsLoading} />
              <div>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{data.title}</h2>
                <p className='mt-4 text-gray-500'>{data.description}</p>

                <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
                  <div className='border-t border-gray-200 pt-4'>
                    <div className='font-medium text-gray-900'>Heure</div>
                    <dd className='mt-2 text-sm text-gray-500'>{`${data.fullDay ? data.fullDay : data.timeStart + data.timeEnd}`}</dd>
                  </div>
                  <div className='border-t border-gray-200 pt-4'>
                    <dt className='font-medium text-gray-900'>Date</dt>
                    <dd className='mt-2 text-sm text-gray-500'>{data.dateStart}{data.dateEnd}</dd>
                  </div>
                  <div className='border-t border-gray-200 pt-4'>
                    <dt className='font-medium text-gray-900'>Adress</dt>
                    <dd className='mt-2 text-sm text-gray-500'>{data.address}{data.city}{data.postalCode}</dd>
                  </div>
                  <div className='border-t border-gray-200 pt-4'>
                    <dt className='font-medium text-gray-900'>Contact</dt>
                    <dd className='mt-2 text-sm text-gray-500'>{data.email}</dd>
                  </div>
                </dl>
              </div>
              <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8  w-full h-full'>
                {data.images.map((image) => (
                  <div key={image.id} className='relative w-auto h-full'>
                    <Link passHref href={`/${image.url}`}>
                      <a target='_blank' rel='noopener noreferrer'>
                        <div className='relative w-full h-full'>
                          <Image
                            src={image.url}
                            alt={image.name}
                            className='bg-gray-100 rounded-lg'
                            layout='fill'
                            objectFit='cover'
                            priority
                          />
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}

              </div>
            </div>
            </div>
}
    </>
  )
}
