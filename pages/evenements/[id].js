import LayoutEvent from 'components/layoutEvent'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post ({ data }) {
  return (
    <Layout>
      <Head>
        <title>data.userId</title>
      </Head>
      <section className='section'>
        <div className='flex justify-center'>
          <LayoutEvent
            title='data.title'
            body='data.body'
            sourceAvatar='/../public/images/proj.jpeg'
          />
        </div>
      </section>
    </Layout>
  )
}
// esta funcion va a ejecutarse solamente en el lado del servidor
export async function getStaticPaths () {
  // aqui estoy usando la funcion helper para llamar fetch
  const paths = await getAllPostIds()
  return {
    paths,
    // -> fallback Midudev : Es lo que me permite hacer la pagina aunque el cliente no haya puesto el buen path/id (id por el ejemplo)
    // false : que al no encontrar el path va a devolver un 404
    // true : no devuelve 4040, generara estaticamnete la ruta solicitada
    //
    fallback: false
  }
}

// aqui hago el llamado a la api con su respectivo id
export async function getStaticProps ({ params }) {
  const data = getPostData(params.id)
  return data
}
