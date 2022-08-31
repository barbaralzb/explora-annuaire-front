import FormAccount from 'components/formAccount'
import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'
import { Loader } from 'components/Basics/Loader'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function InformationAssociation () {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  return (
    <div className='mx-auto px-10 py-20 lg:py-32 xl:py-40 bg-indigo-50'>
      <FormAccount
        formData={data}
      />
    </div>
  )
}
