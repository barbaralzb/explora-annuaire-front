import { Card, Chip, IconButton } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa'
import { TbMapPin, TbWorld } from 'react-icons/tb'

export default function LayoutAsso ({ data, imagePreview }) {
  const formData = {
    username: data.username || 'Nom de l\'association',
    email: data.email,
    description: data.description,
    address: data.address || 'adress',
    city: data.city || 'ville',
    postalCode: data.postalCode || 'code postale',
    domain: data.domain,
    website: data.website,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    image: data.image
  }
  const image = data.image || '/images/default/6.jpg'

  return (
    <Card>
      <div className='relative w-full px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:py-16 lg:max-w-7xl lg:px-8 lg:grid-cols-5'>
        <div className='flex flex-col gap-4 lg:col-span-2'>
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
        <div className='self-start lg:col-span-3 h-full grid grid-cols-1'>
          <div>
            <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-6'>{formData.username}</h2>
            <Chip className='mb-6' variant='gradient' color={formData.domain ? formData.domain.color : 'deep-purple'} value={formData.domain ? formData.domain.label : 'Domaine'} />
          </div>

          <p className='mb-6 text-gray-500'>{formData.description}</p>
          <div className='font-medium text-gray-900 flex items-center mb-6'><TbMapPin size='18' className='mr-2' />{`${formData.address} ${formData.city} ${formData.postalCode}`}</div>

          <div className='flex gap-6 self-end'>
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
            {formData.twitter &&
              <Link href={formData?.twitter}>
                <a target='_blank'>
                  <IconButton variant='gradient'>
                    <FaTwitter size='16' />
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

      </div>
    </Card>
  )
}
