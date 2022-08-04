import Head from 'next/head'
import Layout from 'components/Layout'
import styles from 'styles/Home.module.css'
import Hero from 'components/hero'
import Section from 'components/section'
import { getSortedPostsData } from 'lib/posts'
export async function getServerSideProps () {
  const posts = getSortedPostsData()
  return posts
}
export default function Home ({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explora</title>
        <meta name='description' content='Explora Rouen missios bénévolat' />
      </Head>

      <Layout>
        <Hero />
        <Section posts={posts} />
      </Layout>
    </div>
  )
}
