import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'
import { Loader } from 'components/Basics/Loader'
import Image from 'next/image'
import { Button, Card, CardBody } from '@material-tailwind/react'
import { CgWebsite } from 'react-icons/cg'
import EventScreen from 'components/EventsScreen'
import Link from 'next/link'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AccountSettings () {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  console.log(data)

  function getFormattedDate (date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return day + ' / ' + month + ' / ' + year
  }
  console.log(data)
  return (
    <div className='bg-white grid lg:grid-cols-8 gap-x-6 h-full min-h-screen'>
      <div className='lg:col-span-2 bg-gradient-to-t from-indigo-50/50 via-indigo-50/70 to-deep-indigo-50/50 lg:py-32 xl:py-40 px-8'>
        <div className='min-w-full w-full h-full flex flex-col items-center px-8'>
          <div className='sticky top-24 first-letter:w-full'>
            <h2 className='text-2xl font-bold text-gray-900 my-8 '>Profile</h2>
            <Card className='w-full'>
              <CardBody className='flex flex-col gap-y-6'>
                <div>
                  <div className='flex flex-col items-center justify-center'>
                    <Image
                      className='rounded-xl'
                      width='70'
                      height='70'
                      objectFit='cover'
                      src={data.image?.url || '/images/default/6.jpg'}
                    />
                    <div className='font-bold text-2xl tetx-center mt-4'>{data.username}</div>
                    <div className='text-xs text-gray-500'>
                      {data.email}
                    </div>
                  </div>
                  <div className='w-full mt-5'>
                    <div className='text-xs text-gray-500 mt-2 flex justify-between'>Création du compte : <span className='font-semibold'>{getFormattedDate(new Date(data.creationdate))}</span></div>
                  </div>
                </div>
                <div>
                  <div className='uppercase font-bold text-xs text-gray-700 mb-3'>Description</div>
                  <div className='text-gray-500 text-xs leading-6'>
                    {data.description}
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className='mt-6 flex gap-x-8'>
              <Link href={`/associations/${data._id}`}>
                <a>
                  <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                    <CgWebsite size='16' className='mb-2' />
                    <div className='text-xs capitalize font-semibold tracking-wide'>Afficher</div>
                  </Button>
                </a>
              </Link>
              <Link href='/mon-compte/information-association'>
                <a>
                  <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                    <FiEdit size='16' className='mb-2' />
                    <div className='text-xs capitalize font-semibold tracking-wide'>Editer</div>
                  </Button>
                </a>
              </Link>
              <Link href='#'>
                <a>
                  <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                    <FiTrash2 size='16' className='mb-2' />
                    <div className='text-xs capitalize font-semibold tracking-wide'>Effacer</div>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:col-span-6 py-20 lg:py-32 xl:py-40 px-8'>

        <EventScreen posts={data.posts} title='Mes événements' ableToModifie />
      </div>
    </div>

  )
}
