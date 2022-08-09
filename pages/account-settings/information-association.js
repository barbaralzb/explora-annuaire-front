import FormAccount from 'components/formAccount'
import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'
import { Loader } from 'components/Basics/Loader'
import LayoutPage from 'components/LayoutPage'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function InformationAssociation () {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)

  const formData = { data }

  console.log(formData)

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  return (
    <LayoutPage>
      <div className='bg-gradient-to-r from-neutral-100/10 via-white to-neutral-100/10 h-full'>
        <div className='flex justify-center p-12'>
          <div className='max-w-6xl'>
            <FormAccount
              formData={formData.data}
            />
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}
