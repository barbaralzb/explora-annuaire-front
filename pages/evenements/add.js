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
    <>
      <div className='bg-gradient-to-r from-neutral-100 via-white to-neutral-100 h-full'>
        <div className='flex justify-center p-12'>
          <div className='max-w-7xl'>
            <FormEvent
              formData={formData}
            />
          </div>
        </div>
      </div>
    </>
  )
}
