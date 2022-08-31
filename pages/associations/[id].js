import Image from 'next/image'
import { Button, Card, CardBody, Chip } from '@material-tailwind/react'
import EventScreen from 'components/EventsScreen'
import { FiMail, FiMapPin } from 'react-icons/fi'
import LayoutPage from 'components/LayoutPage'
import Head from 'next/head'
import { getAllUserIds, getUserData } from 'lib/users'
import { IoLogoFacebook } from 'react-icons/io'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { RiFlag2Line, RiGlobalLine } from 'react-icons/ri'

export default function PageAssociation ({ data }) {
  function getFormattedDate (date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return day + ' / ' + month + ' / ' + year
  }
  console.log(data)
  return (
    <LayoutPage>
      <Head>
        <title>{data.username}</title>
        <meta
          name='description'
          content={data.description}
        />
      </Head>
      <main className='w-full h-full bg-gray-50'>

        <div className='bg-white grid grid-cols-1 lg:grid-cols-12 gap-x-6 h-full min-h-screen'>
          <div className='lg:col-span-5 bg-gradient-to-t from-indigo-50/50 via-indigo-50/70 to-deep-indigo-50/50 py-32 lg:py-40 px-8 flex flex-col-reverse lg:flex-row'>
            <div className='flex lg:flex-col gap-y-12 pt-8 lg:pt-0'>
              {data.facebook &&
                <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                  <IoLogoFacebook size='16' className='mb-2' />
                  <div className='text-xs capitalize font-semibold tracking-wide'>Facebook</div>
                </Button>}
              {data.instagram &&
                <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                  <AiOutlineInstagram size='16' className='mb-2' />
                  <div className='text-xs capitalize font-semibold tracking-wide'>Instagram</div>
                </Button>}
              {data.twitter &&
                <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                  <AiOutlineTwitter size='16' className='mb-2' />
                  <div className='text-xs capitalize font-semibold tracking-wide'>Twitter</div>
                </Button>}
              {data.website &&
                <Button color='deep-purple' variant='text' className='flex flex-col items-center text-gray-600 hover:text-deep-purple-500 hover:bg-white hover:shadow-xl hover:shadow-deep-purple-50/50'>
                  <RiGlobalLine size='16' className='mb-2' />
                  <div className='text-xs capitalize font-semibold tracking-wide'>Website</div>
                </Button>}
            </div>
            <div className='w-full h-full flex flex-col items-center px-8'>
              <div className='first-letter:w-full'>
                <Card className='w-full py-6 px-4'>
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

                    <div className='flex flex-col gap-y-12'>

                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <RiFlag2Line size='16' />
                          <div className='ml-3 text-xs'>
                            Categorie
                          </div>
                        </div>
                        <Chip variant='gradient' color={data.domain?.color} value={data.domain?.label} />
                      </div>

                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <FiMail size='16' />
                          <div className='ml-3 text-xs'>
                            {data.email}
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <FiMapPin size='16' />
                          <div className='ml-3 text-xs'>
                            {`${data.address} ${data.city} ${data.postalCode}`}
                          </div>
                        </div>
                      </div>
                    </div>

                  </CardBody>
                </Card>

              </div>
            </div>
          </div>

          <div className='lg:col-span-7 py-20 lg:py-32 xl:py-40 px-8 lg:px-0'>
            <EventScreen posts={data.posts} title='Evénements' ableToModifie={false} />
          </div>
        </div>
      </main>
    </LayoutPage>

  )
}
// esta funcion va a ejecutarse solamente en el lado del servidor
export async function getStaticPaths () {
  // aqui estoy usando la funcion helper para llamar fetch
  const paths = await getAllUserIds()
  // puedo ver que path es un objeto que contiene params > id:
  // console.log('posibles paths:', typeof (paths), paths)
  return {
    paths,
    // -> fallback Midudev : Es lo que me permite hacer la pagina aunque el cliente no haya puesto el buen path/id (id por el ejemplo)
    // false : que al no encontrar el path va a devolver un 404
    // true : no devuelve 4040, generara estaticamnete la ruta solicitada
    fallback: false
  }
}

// aqui hago el llamado a la api con su respectivo id
export async function getStaticProps (context) {
  // getStaticProps tiene context como parametro pero tengo que recordar que puedo escribir cualquier cosa y eso sera considerado parametro por lo tanto sera el context
  // context es un objeto que su primera key es paramas que contiene los parametros de ruta para las pag que usan rutas dinamicas
  // mi pag dym le puse [id].js entonces mi params tengfra {id:...}
  const { params } = context
  // console.log('params es la primera key du context, que es context :', context)
  const data = getUserData(params.id)
  // console.log('que es params:', params)
  return data
}
