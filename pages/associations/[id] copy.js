import { Card, CardBody, Chip, Typography } from '@material-tailwind/react'
import { getAllUserIds, getUserData } from 'lib/users'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FiCalendar, FiMail } from 'react-icons/fi'
import { IoLogoFacebook } from 'react-icons/io'
import { HiChevronRight } from 'react-icons/hi'
import LayoutPage from '../../components/LayoutPage'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { RiFlag2Line, RiGlobalLine } from 'react-icons/ri'

export default function Post ({ data }) {
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
        <div className='max-w-7xl mx-auto w-full grid grid-cols-6 gap-12 h-full min-h-screen py-20 lg:py-32 xl:py-40'>
          <div className='col-span-6 flex items-center'>
            <Typography variant='h3' className='font-bold'>Information sur {data.username}</Typography>
          </div>

          <div className='col-span-4'>
            <div className='relative w-full max-h-72 h-full'>
              <Image
                className='rounded-xl'
                src={data?.image?.url || '/images/default/2.jpg'}
                alt={`image du ${data.username}`}
                width='100%'
                height='100%'
                objectFit='cover'
                layout='fill'
              />
            </div>

          </div>
          <div className='col-span-2'>
            <div className='flex flex-col gap-y-2'>
              {/*
            <div className='flex justify-between items-center mt-8 mb-16'>
              <div className='flex items-center'>
                <FiCalendar size='20' />
                <div className='ml-2'>
                  Evénements publies
                </div>
              </div>
              <div className='w-10 h-10 bg-gray-200 rounded-xl flex justify-center items-center'>
                <span className='font-bold text-gray-700'>{data.posts.length}</span>
              </div>
            </div> */}
              {/*
            <div className='uppercase font-bold text-sm text-gray-500'>
              Contact
            </div> */}

              {data.facebook &&
                <Card className='shadow-2xl shadow-gray-400/30'>
                  <CardBody>
                    <Link href={data.facebook}>
                      <a className='flex justify-between'>
                        <div className='flex'>
                          <IoLogoFacebook />
                          <div className='uppercase font-bold text-xs text-gray-500 ml-3'>
                            Facebook
                          </div>
                        </div>
                        <HiChevronRight className='text-deep-purple-500' />
                      </a>
                    </Link>
                  </CardBody>
                </Card>}

              {data.instagram &&
                <Card className='shadow-2xl shadow-gray-400/30'>
                  <CardBody>
                    <Link href='#'>
                      <a className='flex justify-between'>
                        <div className='flex'>
                          <AiOutlineInstagram />
                          <div className='uppercase font-bold text-xs text-gray-500 ml-3'>
                            Instagram
                          </div>
                        </div>
                        <HiChevronRight className='text-deep-purple-500' />
                      </a>
                    </Link>
                  </CardBody>
                </Card>}

              {data.twitter &&
                <Card className='shadow-2xl shadow-gray-400/30'>
                  <CardBody>
                    <Link href='#'>
                      <a className='flex justify-between'>
                        <div className='flex'>
                          <AiOutlineTwitter />
                          <div className='uppercase font-bold text-xs text-gray-500 ml-3'>
                            Twitter
                          </div>
                        </div>
                        <HiChevronRight className='text-deep-purple-500' />
                      </a>
                    </Link>
                  </CardBody>
                </Card>}

              {data.website &&
                <Card className='shadow-2xl shadow-gray-400/30'>
                  <CardBody>
                    <Link href='#'>
                      <a className='flex justify-between'>
                        <div className='flex'>
                          <RiGlobalLine />
                          <div className='uppercase font-bold text-xs text-gray-500 ml-3'>
                            Visiter la page web
                          </div>
                        </div>
                        <HiChevronRight className='text-deep-purple-500' />
                      </a>
                    </Link>
                  </CardBody>
                </Card>}

            </div>
          </div>

          <div className='col-span-4'>
            <div className='uppercase font-bold text-sm text-gray-500 mb-3'>
              Description
            </div>
            <div>
              {data.description}
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex flex-col gap-y-12'>

              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <RiFlag2Line size='20' />
                  <div className='ml-3 text-xs'>
                    Categorie
                  </div>
                </div>
                <Chip variant='gradient' color={data.domain?.color} value={data.domain?.label} />
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <FiCalendar size='20' />
                  <div className='ml-3 text-xs'>
                    Evénements publies
                  </div>
                </div>
                <div className='w-10 h-10 bg-gray-200 rounded-xl flex justify-center items-center'>
                  <span className='font-bold text-gray-700'>{data.posts.length}</span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <FiMail size='20' />
                  <div className='ml-3 text-xs'>
                    {data.email}
                  </div>
                </div>
              </div>

              <Card className='shadow-2xl shadow-deep-purple-50 bg-deep-purple-50'>
                <CardBody>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <div className='font-bold text-xs ml-3 text-black'>

                        {`${data.address} ${data.city} ${data.postalCode}`}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

            </div>
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
