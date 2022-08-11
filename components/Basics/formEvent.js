import SelectComponent from 'components/Basics/SelectComponent'
import Image from 'next/image'
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { ageRangeList, domainList } from 'utils/utils'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from './Loader'
import { Button, Card, Checkbox, Chip, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Textarea } from '@material-tailwind/react'
import { Transition } from '@headlessui/react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LayoutEvent from 'components/LayoutEvent'

export default function FormEvent ({ formData, id, forNewEvent = true }) {
  const [file, setFile] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState(formData.ageRange)
  const [selectedDomain, setSelectedDomain] = useState(formData.domain)
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [isCheck, setCheck] = useState(typeof (formData.fullDay) === 'boolean' ? formData.fullDay : true)
  const [queryAge, setQueryAge] = useState('')
  const [queryDomain, setQueryDomain] = useState('')
  const [startdate, setStartDate] = useState(new Date())
  const [enddate, setEndDate] = useState(new Date())

  const [pageone, setPageone] = useState(true)
  const [pagetwo, setPagetwo] = useState(false)

  const [form, setform] = useState({
    title: formData.title,
    description: formData.description,
    dateStart: formData.dateStart,
    dateEnd: formData.dateEnd,
    fullDay: formData.fullDay,
    timeStart: formData.timeStart,
    timeEnd: formData.timeEnd,
    address: formData.address,
    city: formData.city,
    postalCode: formData.postalCode,
    ageRange: formData.ageRange,
    domain: formData.domain,
    email: formData.email,
    website: formData.website,
    facebook: formData.facebook,
    instagram: formData.instagram,
    twitter: formData.twitter,
    images: formData.images
  })

  const handleChange = e => {
    const { name, value } = e.target
    setform({
      ...form,
      [name]: value
    })
  }

  const [DateRDV, setDateRDV] = useState(null)
  const handleChangeDate = date => {
    const newday = moment(date).format('DD')
    const newmonth = moment(date).format('MM') - 1
    const newyear = moment(date).format('YYYY')
    setDateRDV(moment.utc().set('month', newmonth).set('date', newday).set('year', newyear).toDate())
  }

  useEffect(() => {
    setform({
      ...form,
      ageRange: selectedAge.label,
      domain: selectedDomain.label
    })
  }, [selectedAge, selectedDomain])

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    if (file.length > 0) {
      uploadFileHandler()
    } else {
      if (forNewEvent) {
        postData(form)
      } else {
        console.log('click')
        putData(form)
      }
    }
  }

  useEffect(() => {
    if (file.length > 0) {
      if (forNewEvent) {
        postData(form)
      } else {
        console.log('click')
        putData(form)
      }
    }
  }, [form.images])

  const uploadFileHandler = async () => {
    const formData = new FormData()
    for (let i = 0; i < file.length; i++) {
      formData.append('images', file[i])
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/uploadS3`, {
        method: 'POST',
        Headers: {
          'content-type': 'multipart/form-data'
        },
        body: formData
      })
      const data = await res.json()
      console.log('respuesta', data)
      // setform({
      //   ...form,
      //   images: data
      // })

      // buffer para modificar mis imagenes
      let buffer = { ...form }
      const imageBuffer = [...form.images, ...data]
      buffer = { ...buffer, images: imageBuffer }

      setform({
        ...buffer
      })
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const putData = async (form) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      console.log('post realizado success:', data.success, data)
      if (!data.success) {
        notify()
        for (const key in data.err.errors) {
          const error = data.err.errors[key]
          setMessage(oldmessage => [
            ...oldmessage,
            { message: error.message }
          ])
        }
      } else {
        setMessage([])
        router.push('/')
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
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

      const data = await res.json()
      console.log('post realizado success:', data.success, data)
      if (!data.success) {
        notify()
        for (const key in data.err.errors) {
          const error = data.err.errors[key]
          setMessage(oldmessage => [
            ...oldmessage,
            { message: error.message }
          ])
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const handleCheckbox = () => {
    setCheck((isCheck) => !isCheck)
  }
  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  useEffect(() => {
    const imagesSrc = []
    for (const img of file) {
      imagesSrc.push(URL.createObjectURL(img))
    }
    setImagesPreview(imagesSrc)
    setFile(file)
  }, [file])

  function handleUploadSingleFile (e) {
    setFile(file => [...file, e.target.files[0]])
  }

  function deleteFile (e) {
    const s = file.filter((item, index) => index !== e)
    setFile(s)
  }
  const notify = () => toast('Something important isn\'t valid')

  const steps = [
    {
      label: 'Step 1',
      value: 'step1',
      form:
  <div className='grid grid-cols-6 gap-6 gap-y-8'>
    <div className='col-span-6'>
      <label htmlFor='title' className='flex text-sm font-medium text-gray-700' />
      <Input
        label={<div> <span className='text-orange-500 mr-1'>⚹</span>Nom de l'événement</div>}
        color='orange'
        type='text'
        name='title'
        id='title'
        autoComplete='given-name'
        onChange={handleChange}
        value={form.title}
        success={form.title}
        required
      />
    </div>

    <div className='col-span-6'>
      <Textarea
        label={<div><span className='text-orange-500 mr-1'>⚹</span>Description</div>}
        color='orange'
        type='text'
        name='description'
        id='description'
        autoComplete='given-name'
        onChange={handleChange}
        value={form.description}
        success={form.description}
        required
      />
    </div>

    <div className='col-span-6 md:col-span-3'>
      <label htmlFor='Domaine' className='flex text-sm font-medium text-gray-700'>
        <span className='text-orange-500 mr-1'>⚹</span>Date debut
      </label>
      <div className='peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-orange-500'>
        <DatePicker
          className='outline-0 focus:outline-0'
          selected={startdate}
          onChange={(date) => setStartDate(date)}
          dateFormat='dd MMMM yyyy'
        />
      </div>

    </div>
    <div className='col-span-6 md:col-span-3'>
      <label htmlFor='Domaine' className='flex text-sm font-medium text-gray-700'>
        <span className='text-orange-500 mr-1'>⚹</span>Date debut
      </label>
      <div className='peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-orange-500'>
        <DatePicker
          className='outline-0 focus:outline-0'
          selected={enddate}
          onChange={(date) => setEndDate(date)}
          dateFormat='dd MMMM yyyy'
        />
      </div>

    </div>

    {/*  TODO  */}
    <div className='col-span-6 flex items-center'>
      <Checkbox
        id='fullDay'
        name='fullDay'
        onClick={handleChange}
        onChange={handleCheckbox}
        checked={!isCheck}
        value={!isCheck}
        type='checkbox'
        color='orange'
      />
      <label htmlFor='fullDay' className='ml-2 block text-sm text-gray-900'>Toute le journee</label>
    </div>

    <div className='col-span-6'>

      <Transition
        show={isCheck}
        enter='transition-opacity duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-250'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='col-span md:col-span-2'
      >

        <div className='w-full flex justify-between'>
          <div className='col-span-6'>
            <label htmlFor='Domaine' className='flex text-sm font-medium text-gray-700'>
              <span className='text-orange-500 mr-1'>⚹</span>Heure debut
            </label>
            <div className='peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-orange-500'>
              <DatePicker
                className='outline-0 focus:outline-0'
                selected={enddate}
                onChange={(date) => setEndDate(date)}
                timeCaption='Heure'
                showTimeSelect
                timeFormat='HH:mm'
                dateFormat='HH : mm'
                showTimeSelectOnly
              />
            </div>
          </div>
          <div className='col-span-6'>
            <label htmlFor='Domaine' className='flex text-sm font-medium text-gray-700'>
              <span className='text-orange-500 mr-1'>⚹</span>Heure fin
            </label>
            <div className='peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-orange-500'>
              <DatePicker
                className='outline-0 focus:outline-0'
                selected={enddate}
                onChange={(date) => setEndDate(date)}
                timeCaption='Heure'
                showTimeSelect
                timeFormat='HH:mm'
                dateFormat='HH : mm'
                showTimeSelectOnly
              />
            </div>
          </div>

        </div>
      </Transition>
    </div>

    <div className='col-span-6'>
      <Input
        success={form.title}
        color='orange'
        label={<div> <span className='text-orange-500 mr-1'>⚹</span>Adresse postale</div>}
        type='text'
        name='address'
        id='address'
        onChange={handleChange}
        value={form.address}
        autoComplete='street-address'
        required
      />
    </div>

    <div className='col-span-6'>

      <Input
        success={form.city}
        color='orange'
        label={<div> <span className='text-orange-500 mr-1'>⚹</span>Ville</div>}
        type='text'
        name='city'
        id='city'
        required
        onChange={handleChange}
        value={form.city}
        autoComplete='home city'
      />
    </div>

    <div className='col-span-6'>
      <Input
        success={form.postalCode}
        color='orange'
        label={<div> <span className='text-orange-500 mr-1'>⚹</span>Code postale</div>}
        type='text'
        maxLength='5'
        minLength='5'
        onInput={onInput}
        name='postalCode'
        id='postalCode'
        required
        onChange={handleChange}
        value={form.postalCode}
        autoComplete='postal-code'
      />
    </div>
  </div>

    },
    {
      label: 'Step 2',
      value: 'step2',
      form:
  <div className='md:grid md:grid-cols-1 md:gap-6 gap-y-8'>
    <div>
      <Input
        color='orange'
        label='Email Contact'
        type='text'
        name='email'
        id='email'
        autoComplete='email'
        onChange={handleChange}
        value={form.email}
        success={form.email}
      />
    </div>

    <div>
      <div className='mt-1 flex rounded-md'>
        <Chip value={<FaFacebookSquare size='16' />} variant='gradient' className='mr-2' />
        <Input
          label='Link Facebook'
          color='orange'
          type='text'
          name='facebook'
          id='facebook'
          onChange={handleChange}
          value={form.facebook}
          success={form.facebook}
        />
      </div>
    </div>
    <div>
      <div className='mt-1 flex rounded-md'>
        <Chip color='pink' value={<FaInstagram size='16' />} variant='gradient' className='mr-2' />
        <Input
          success={form.instagram}
          color='orange'
          label='Instagram'
          type='text'
          name='instagram'
          id='instagram'
          onChange={handleChange}
          value={form.instagram}
        />
      </div>
    </div>
    <div>
      <div className='mt-1 flex rounded-md'>
        <Chip color='teal' value={<FaLinkedin size='16' />} variant='gradient' className='mr-2' />
        <Input
          success={form.twitter}
          color='orange'
          label='Twitter'
          type='text'
          name='twitter'
          id='twitter'
          onChange={handleChange}
          value={form.twitter}
        />
      </div>
    </div>
    <div>
      <div className='mt-1 flex rounded-md'>

        <Chip color='orange' value='http://' variant='gradient' className='mr-2' />
        <Input
          success={form.website}
          color='orange'
          label='Site web'
          type='text'
          name='website'
          id='website'
          onChange={handleChange}
          value={form.website}
        />
      </div>
    </div>
  </div>
    },
    {
      label: 'Sauvegarder',
      value: 'save',
      form:
  <>
    <div className='col-span-6'>
      <label htmlFor='ageRange' className='flex text-sm font-medium text-gray-700'>
        <span className='text-orange-500 mr-1'>⚹</span>Tranch d'age
      </label>
      <SelectComponent
        labels={ageRangeList}
        setSelectedLabel={setSelectedAge}
        selectedLabel={selectedAge}
        required
        query={queryAge}
        setQuery={setQueryAge}
      />
    </div>
    <div className='col-span-6'>
      <label htmlFor='Domaine' className='flex text-sm font-medium text-gray-700'>
        <span className='text-orange-500 mr-1'>⚹</span>Domaine
      </label>
      <SelectComponent
        labels={domainList}
        setSelectedLabel={setSelectedDomain}
        selectedLabel={selectedDomain}
        required
        query={queryDomain}
        setQuery={setQueryDomain}
      />
    </div>
    {!forNewEvent && form.images.length > 0 &&
      <div className='flex snap-x gap-x-4'>
        {form.images.map((image) => {
          return (
            <div key={image.url} className='relative shadow h-24 w-24 rounded'>
              <Image
                src={image.url ? image.url : '/images/proj.jpeg'}
                layout='fill'
                objectFit='cover'
                alt=''
              />
              <div className='absolute top-0 left-0 bg-slate-50'>
                <button type='button' onClick={() => deleteFileFromData(image._id)}>
                  delete
                </button>
              </div>
            </div>
          )
        })}
      </div>}
    {imagesPreview.length > 0 &&
      <div className='flex snap-x gap-x-4'>
        {imagesPreview.map((item, index) => {
          return (
            <div key={item} className='relative shadow h-24 w-24 rounded'>
              <Image
                src={item}
                layout='fill'
                objectFit='cover'
                alt=''
              />
              <div className='absolute top-0 left-0 bg-slate-50'>
                <button type='button' onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            </div>
          )
        })}
      </div>}
    <div>
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
                onChange={handleUploadSingleFile}
                multiple
              />
            </label>
            {/* <p className='pl-1'>or drag and drop</p> */}
          </div>
          <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
    <Button
      color='orange'
      className='normal-case text-sm font-regular text-white'
      type='submit'
    >
      Sauvegarder
    </Button>
  </>

    }
  ]

  return (
    <>
      {isLoading
        ? <Loader />
        : <>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className='grid grid-cols-3 gap-8'>
            <Card className='p-4'>
              <form className='col-span-1' onSubmit={handleSubmit}>
                <div>
                  <Tabs value='step1'>
                    <TabsHeader>
                      {steps.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                          {label}
                        </Tab>
                      ))}
                    </TabsHeader>
                    <TabsBody>
                      {steps.map(({ value, form }) => (
                        <TabPanel key={value} value={value}>
                          <div className='px-4 py-5'>
                            {form}
                          </div>
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </Tabs>
                </div>

                {/* <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <Button
                    color='orange'
                    className='normal-case text-sm font-regular text-white'
                    onClick={pageone ? () => setPagetwo(true) : ''}
                  >
                    Suivante
                  </Button>
                </div> */}
              </form>
            </Card>

            <div className='col-span-2'>
              <LayoutEvent data={form} />
            </div>
          </div>
          </>}
    </>
  )
}
