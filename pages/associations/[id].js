import { getAllUserIds, getUserData } from 'lib/users'
import Head from 'next/head'
import Layout from '../../components/Layout'

export default function Post ({ data }) {
  return (
    <Layout>
      <Head>
        <title>{data.username}</title>
        <meta
          name='description'
          content={data.description}
        />
      </Head>
      {data.map(user => (<div key={user.id}>{user.username}</div>)
      )}
    </Layout>
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
