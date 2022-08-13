import FormEvent from 'components/Basics/formEvent'
import { Loader } from 'components/Basics/Loader'
import { useAppContext } from 'context/AppContext'
import useSWR from 'swr'
import { ageRangeList, domainList } from 'utils/utils'

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function addEvent () {
  const { state } = useAppContext()

  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)

  const formData = {
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    fullDay: false,
    timeStart: '',
    timeEnd: '',
    address: '',
    city: '',
    postalCode: '',
    ageRange: ageRangeList[0],
    domain: domainList[0],
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    images: []
  }

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  return (
    <div className='mx-auto px-10 py-20 lg:py-32 xl:py-40 bg-dotssquares'>
      <FormEvent
        formData={formData}
        user={data}
      />
    </div>
  )
}
