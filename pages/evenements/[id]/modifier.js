import FormEvent from 'components/Basics/formEvent'
import { Loader } from 'components/Basics/Loader'
import { useAppContext } from 'context/AppContext'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function addEvent () {
  const { state } = useAppContext()
  const router = useRouter()
  console.log(router.query.id)

  const { data: user, error: erroUser } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)
  const { data: post, error: errorPost } = useSWR(router.query ? `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${router.query.id}` : null, fetcher)

  if (erroUser || errorPost) return <div>Failed to load</div>
  if (!user || !post) return <Loader />
  return (
    <div className='bg-white grid grid-cols-8 gap-x-6 h-full min-h-screen'>
      <FormEvent
        formData={post}
        user={user}
        forNewEvent={false}
      />
    </div>
  )
}
