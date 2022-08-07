import Head from 'next/head'
import Layout from 'components/Layout'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import Section from 'components/section'
import { useAppContext } from 'context/AppContext'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

// export const fetcher = async (id) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${id}`)
//   const data = await res.json()
//   return data
// }
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function MesEvenements () {
  const { state } = useAppContext()

  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${state.id}` : null, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data)
  console.log(state.id)

  return (
    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <Layout>
        <Hero />
        <Section posts={data} />
      </Layout>
    </div>
  )
}
