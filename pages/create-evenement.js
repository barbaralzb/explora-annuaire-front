import { Transition } from '@headlessui/react'
import Select from 'components/Select'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CgAsterisk } from 'react-icons/Cg'
import theme from 'styles/theme'
import { getCurrentDate } from 'utils/currentDate'
const ageRangeList = [
  { id: 1, label: 'Tout public' },
  { id: 2, label: '+18' }
]
const domainList = [
  { id: 1, label: 'Environement' },
  { id: 2, label: 'Sante' },
  { id: 3, label: 'Education' },
  { id: 4, label: 'Refigie' },
  { id: 5, label: 'Culture' }
]

export default function CreateEvent () {
  const router = useRouter

  const [selectedAge, setSelectedAge] = useState(ageRangeList[0])
  const [selectedDomain, setSelectedDomain] = useState(domainList[0])

  const [isShowing, setIsShowing] = useState(true)
  const [queryAge, setQueryAge] = useState('')
  const [queryDomain, setQueryDomain] = useState('')

  const [form, setform] = useState({
    title: '',
    dateStart: '',
    dateEnd: '',
    fullDay: false,
    timeStart: '',
    timeEnd: '',
    address: '',
    ville: '',
    postalCode: '',
    ageRange: ageRangeList[0],
    domain: domainList[0],
    email: '',
    website: '',
    images: []

  })

  const HandleChange = e => {
    const { name, value, checked } = e.target
    if (name !== 'fullDay') {
      setform({
        ...form,
        [name]: value
      })
    } else {
      setform({
        ...form,
        [name]: checked
      })
    }
  }
  useEffect(() => {
    setform({
      ...form,
      ageRange: selectedAge.label,
      domain: selectedDomain.label
    })
  }, [selectedAge, selectedDomain])

  const HandleSubmit = e => {
    e.preventDefault()
    postData(form)
  }

  const postData = async (form) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      // const data = await res.json()
      // console.log('post realizado', data)
      router.push('/')
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const handleCheckbox = () => {
    setIsShowing((isShowing) => !isShowing)
  }
  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  return (
    <>
      <div className='bg-gradient-to-r from-neutral-100 via-white to-neutral-100'>
        <div className='flex justify-center p-12'>
          <div className='max-w-6xl'>

            <form className='bg-white  shadow overflow-hidden sm:rounded-md' onSubmit={HandleSubmit}>
              <div className='md:grid md:grid-cols-2 md:gap-6'>
                <div className='col-span'>
                  <div className='md:grid md:grid-cols-1 md:gap-6 px-4 py-5 sm:p-6'>

                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label htmlFor='title' className='flex text-sm font-medium text-gray-700'>
                          Nom de la mission <CgAsterisk size='10' color={theme.colors.secondary} />
                        </label>
                        <input
                          type='text'
                          name='title'
                          id='title'
                          autoComplete='given-name'
                          onChange={HandleChange}
                          value={form.title}
                          required
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 md:col-span-3'>
                        <label htmlFor='dateStart' className='flex text-sm font-medium text-gray-700'>
                          Date debut <CgAsterisk size='10' color={theme.colors.secondary} />
                        </label>
                        <input
                          type='date'
                          name='dateStart'
                          id='dateStart'
                          onChange={HandleChange}
                          required
                          min={getCurrentDate()}
                          value={form.dateStart}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 md:col-span-3'>
                        <label htmlFor='dateEnd' className='flex text-sm font-medium text-gray-700'>
                          Date fin
                        </label>
                        <input
                          type='date'
                          name='dateEnd'
                          id='dateEnd'
                          onChange={HandleChange}
                          value={form.dateEnd ? form.dateEnd : form.dateStart}
                          min={form.dateStart}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 grid md:grid-cols-3 gap-6 md:gap-3 md:h-14'>
                        <div className='col-span-1 flex items-center md:h-14 pl-1'>
                          <input id='fullDay' name='fullDay' onClick={HandleChange} onChange={handleCheckbox} checked={form.fullDay} type='checkbox' className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded' />
                          <label htmlFor='fullDay' className='ml-2 block text-sm text-gray-900'>Toute le journee</label>
                        </div>
                        <Transition
                          show={isShowing}
                          enter='transition-opacity duration-150'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='transition-opacity duration-250'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                          className='col-span md:col-span-2'
                        >
                          <div className='col-span grid md:grid-cols-2 gap-6 md:gap-2'>
                            <div className='col-span md:col-span-1'>
                              <label htmlFor='timeStart' className='block text-sm font-medium text-gray-700'>
                                Heure debut
                              </label>
                              <input
                                type='time'
                                name='timeStart'
                                id='timeStart'
                                onChange={HandleChange}
                                value={form.timeStart}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                            </div>

                            <div className='col-span md:col-span-1'>
                              <label htmlFor='timeEnd' className='block text-sm font-medium text-gray-700'>
                                Heure fin
                              </label>
                              <input
                                type='time'
                                name='timeEnd'
                                id='timeEnd'
                                onChange={HandleChange}
                                value={form.timeEnd}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                            </div>
                          </div>
                        </Transition>
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                          Address Postale
                        </label>
                        <input
                          type='text'
                          name='address'
                          id='address'
                          onChange={HandleChange}
                          value={form.address}
                          autoComplete='street-address'
                          required
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-6 md:col-span-3'>
                        <label htmlFor='city' className='flex text-sm font-medium text-gray-700'>
                          Ville <CgAsterisk size='10' color={theme.colors.secondary} />
                        </label>
                        <input
                          type='text'
                          name='city'
                          id='city'
                          required
                          onChange={HandleChange}
                          value={form.city}
                          autoComplete='city'
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 md:col-span-3'>
                        <label htmlFor='postalCode' className='flex text-sm font-medium text-gray-700'>
                          Code postale <CgAsterisk size='10' color={theme.colors.secondary} />
                        </label>
                        <input
                          type='text'
                          maxLength='5'
                          minLength='5'
                          onInput={onInput}
                          name='postalCode'
                          id='postalCode'
                          required
                          onChange={HandleChange}
                          value={form.postalCode}
                          autoComplete='postal-code'
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                  </div>
                </div>
                <div className='col-span'>
                  <div className='md:grid md:grid-cols-1 md:gap-6 px-4 py-5 sm:p-6'>
                    <div>
                      <label htmlFor='ageRange' className='flex text-sm font-medium text-gray-700'>
                        Tranche d'age <CgAsterisk size='10' color={theme.colors.secondary} />
                      </label>
                      <Select
                        labels={ageRangeList}
                        setSelectedLabel={setSelectedAge}
                        selectedLabel={selectedAge}
                        // value={form.ageRange}
                        required
                        query={queryAge}
                        setQuery={setQueryAge}
                      />
                    </div>
                    <div>
                      <label htmlFor='domain' className='flex text-sm font-medium text-gray-700'>
                        Domaine <CgAsterisk size='10' color={theme.colors.secondary} />
                      </label>
                      <Select
                        labels={domainList}
                        setSelectedLabel={setSelectedDomain}
                        selectedLabel={selectedDomain}
                        // value={form.ageRange}
                        required
                        query={queryDomain}
                        setQuery={setQueryDomain}
                      />
                    </div>
                    <div>
                      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email Contact
                      </label>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        autoComplete='email'
                        onChange={HandleChange}
                        value={form.email}
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div>
                      <label htmlFor='website' className='block text-sm font-medium text-gray-700'>
                        Site web
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                          http://
                        </span>
                        <input
                          type='text'
                          name='website'
                          id='website'
                          onChange={HandleChange}
                          value={form.website}
                          className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                          placeholder='www.example.fr'
                        />
                      </div>
                    </div>
                    <div>
                      {/* {form.images.length > 0 &&
                      form.images.map((img, index) => {
                        return (
                          <div key={index}>
                            <image
                              src={process.env.NEXT_PUBLIC_SERVER_URL + img}
                              onClick={() => window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}${img}`, '_blank')}
                              layout='fill' objectFit='contain'
                              className='rounded-xl cursor-pointer' alt=''
                            />
                          </div>
                        )
                      })} */}
                      <label className='block text-sm font-medium text-gray-700'>Photos</label>
                      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                        <div className='space-y-1 text-center'>
                          <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='flex text-sm text-gray-600'>
                            <label
                              htmlFor='images'
                              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                            >
                              <span>Upload a file</span>
                              <input
                                id='images'
                                name='images'
                                type='file'
                                className='sr-only'
                                onChange={HandleChange}
                                value={form.images}
                                multiple
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Sauvegarder
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </>
  )
}
