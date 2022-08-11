import FormEvent from 'components/Basics/formEvent'
import { ageRangeList, domainList } from 'utils/utils'

export default function addEvent () {
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
  // podria pasarle info por aca
  // console.log(router.query)

  return (
    <div className='mx-auto px-10 py-20 lg:py-32 xl:py-40 bg-dotssquares'>
      <FormEvent
        formData={formData}
      />
    </div>
  )
}
