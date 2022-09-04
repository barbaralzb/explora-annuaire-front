import SelectComponent from 'components/Basics/SelectComponent'
import Image from 'next/image'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { ageRangeList, domainList } from 'utils/utils'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from './Loader'
import { Button, Card, CardBody, CardFooter, Chip, Input, Progress, Textarea, Typography } from '@material-tailwind/react'
import LayoutEvent from 'components/LayoutEvent'
import { getCurrentDate } from 'utils/currentDate'
import { TbWorld } from 'react-icons/tb'

export default function FormEvent ({ formData, id, forNewEvent = true, user }) {
  const [file, setFile] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState(formData.ageRange)
  const [selectedDomain, setSelectedDomain] = useState(formData.domain)
  const [isLoading] = useState(false)
  const [queryAge, setQueryAge] = useState('')
  const [queryDomain, setQueryDomain] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

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
    images: formData.images
  })

  const handleChange = e => {
    const { name, value } = e.target
    setform({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    setform({
      ...form,
      ageRange: selectedAge.label,
      domain: selectedDomain
    })
  }, [selectedAge, selectedDomain])

  let formData2 = new FormData()
  const handleSubmit = e => {
    e.preventDefault()
    formData2 = new FormData()

    for (let i = 0; i < file.length; i++) {
      formData2.append('imageEvent', file[i])
    }
    formData2.append('title', form.title)
    formData2.append('description', form.description)
    formData2.append('dateStart', form.dateStart)
    formData2.append('dateEnd', form.dateEnd)
    formData2.append('fullDay', form.fullDay)
    formData2.append('timeStart', form.timeStart)
    formData2.append('timeEnd', form.timeEnd)
    formData2.append('address', form.address)
    formData2.append('city', form.city)
    formData2.append('postalCode', form.postalCode)
    formData2.append('ageRange', form.ageRange)
    formData2.append('domain[label]', form.domain?.label)
    formData2.append('domain[id]', form.domain.id)
    formData2.append('domain[color]', form.domain?.color)
    formData2.append('email', form.email)
    formData2.append('website', form.website)
    formData2.append('facebook', form.facebook)
    formData2.append('instagram', form.instagram)

    forNewEvent ? postData(formData2) : putData(formData2)
  }

  const putData = async (formDataBuffer) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${formData._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataBuffer
      })

      const data = await res
      if (!data.ok) {
        notify()
      } else {
        toast('Evénement mis a jour🎈', {
          onClose: () => router.push('/')
        })
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const postData = async (formDataBuffer) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataBuffer
      })

      const data = await res
      if (!data.ok) {
        notify()
      } else {
        toast('Evénement enregistrer🎈', {
          onClose: () => router.push('/')
        })
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  // const handleCheckbox = () => {
  //   setCheck((isCheck) => !isCheck)
  // }
  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  useEffect(() => {
    const imagesSrc = []
    for (const img of file) {
      imagesSrc.push(URL.createObjectURL(img))
    }
    setImagesPreview(imagesSrc)
    console.log('-> file:', file)
  }, [file])

  console.log('-> Image preview:', imagesPreview)

  function handleUploadSingleFile (e) {
    setFile(file => [...file, e.target.files[0]])
  }

  function deleteFile (e) {
    const s = file.filter((item, index) => index !== e)
    setFile(s)
  }
  const notify = () => toast(`Le(s) champs ${fieldVide.toString()} doit(s) etre remplir`)

  const fieldVide = []
  !form.title && fieldVide.push(' title')
  !form.description && fieldVide.push(' description')
  !form.dateStart && fieldVide.push(' date debut')
  !form.timeStart && fieldVide.push(' heure de debut')
  !form.address && fieldVide.push(' adress')
  !form.city && fieldVide.push(' ville')
  !form.postalCode && fieldVide.push(' code postale')
  !form.email && fieldVide.push(' email')
  !form.ageRange && fieldVide.push(' tranche d\'age')
  !form.domain && fieldVide.push(' domaine')

  const steps = [
    {
      label: '1. Information',
      value: 'step1',
      form:
  <div className='flex flex-col gap-6 gap-y-8'>
    <Input
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Nom de l'événement</div>}
      color='deep-purple'
      type='text'
      name='title'
      id='title'
      autoComplete='given-name'
      onChange={handleChange}
      value={form.title}
      success={form.title}
      required
    />

    <Textarea
      label={<div><span className='text-orange-500 mr-1'>⚹</span>Description</div>}
      color='deep-purple'
      type='text'
      name='description'
      id='description'
      autoComplete='given-name'
      onChange={handleChange}
      value={form.description}
      success={form.description}
      required
    />

    <Input
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Date debut</div>}
      color='deep-purple'
      type='date'
      name='dateStart'
      id='dateStart'
      onChange={handleChange}
      value={form.dateStart}
      success={form.dateStart}
      required
      min={getCurrentDate()}
    />

    <Input
      label='Date fin'
      color='deep-purple'
      type='date'
      name='dateEnd'
      id='dateEnd'
      onChange={handleChange}
      value={form.dateEnd ? form.dateEnd : form.dateStart}
      success={form.dateEnd}
      required
      min={form.dateStart}
    />

    {/*  TODO  */}
    {/* <div className='col-span-6 flex items-center'>
      <Checkbox
        id='fullDay'
        name='fullDay'
        onClick={handleChange}
        onChange={handleCheckbox}
        checked={!isCheck}
        value={!isCheck}
        type='checkbox'
        color='deep-purple'
      />
      <label htmlFor='fullDay' className='ml-2 block text-sm text-gray-900'>Toute le journee</label>
    </div> */}

    {/* <Transition
      show={isCheck}
      enter='transition-opacity duration-150'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-250'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='col-span-6 grid grid-cols-1  gap-6 gap-y-8'
    > */}

    <Input
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Heure debut</div>}
      color='deep-purple'
      type='time'
      name='timeStart'
      id='timeStart'
      onChange={handleChange}
      value={form.timeStart}
      success={form.timeStart}
    />

    <Input
      label='Heure fin'
      color='deep-purple'
      type='time'
      name='timeEnd'
      id='timeEnd'
      onChange={handleChange}
      value={form.timeEnd}
      success={form.timeEnd}
    />
    {/* </Transition> */}

  </div>

    },
    {
      label: '2. Adresse/Liens',
      value: 'step2',
      form:
  <div className='flex flex-col gap-6 gap-y-8'>
    <Input
      color='deep-purple'
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Adresse postale</div>}
      type='text'
      name='address'
      id='address'
      onChange={handleChange}
      value={form.address}
      autoComplete='street-address'
      required
      success={form.address}
    />

    <Input
      success={form.city}
      color='deep-purple'
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Ville</div>}
      type='text'
      name='city'
      id='city'
      required
      onChange={handleChange}
      value={form.city}
      autoComplete='home city'
    />

    <Input
      success={form.postalCode}
      color='deep-purple'
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

    <Input
      color='deep-purple'
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Email Contact</div>}
      type='text'
      name='email'
      id='email'
      autoComplete='email'
      onChange={handleChange}
      value={form.email}
      success={form.email}
    />

    <div className='mt-1 flex rounded-md'>
      <Chip color='indigo' value={<FaFacebookSquare size='16' />} variant='gradient' className='mr-2' />
      <Input
        label='Link Facebook'
        color='deep-purple'
        type='text'
        name='facebook'
        id='facebook'
        onChange={handleChange}
        value={form.facebook}
        success={form.facebook}
      />
    </div>

    <div className='mt-1 flex rounded-md'>
      <Chip color='pink' value={<FaInstagram size='16' />} variant='gradient' className='mr-2' />
      <Input
        success={form.instagram}
        color='deep-purple'
        label='Instagram'
        type='text'
        name='instagram'
        id='instagram'
        onChange={handleChange}
        value={form.instagram}
      />
    </div>

    <div className='mt-1 flex rounded-md'>
      <Chip color='teal' value={<TbWorld size='16' />} variant='gradient' className='mr-2' />
      <Input
        success={form.website}
        color='deep-purple'
        label='Site web'
        type='text'
        name='website'
        id='website'
        onChange={handleChange}
        value={form.website}
      />
    </div>
  </div>
    },
    {
      label: '3. Finalisation',
      value: 'save',
      form:
  <div className='flex flex-col gap-6 gap-y-8'>
    <div>
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

    <div>
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
                src={image.url ? image.url : '/images/default/6.jpg'}
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
      <div className='grid grid-cols-2 gap-y-4'>
        {imagesPreview.map((item, index) => {
          return (
            <div key={item} className='flex items-center'>
              <div className='relative shadow h-24 w-24 rounded'>
                <Image
                  className='rounded'
                  src={item}
                  layout='fill'
                  objectFit='cover'
                  alt=''
                />
              </div>
              <div>
                <Button variant='text' color='deep-purple' onClick={() => deleteFile(index)} className='normal-case'>
                  Delete
                </Button>
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
    {fieldVide.length > 0 && <span className='text-sm text-gray-500'><span className='text-orange-500 mr-1'>⚹</span>{`Le(s) champ(s) est/sont ${fieldVide.toString()} sont vides`}</span>}
    <Button
      color='deep-purple'
      className='normal-case text-sm font-regular text-white'
      type='submit'
      disabled={
        !form.title ||
        !form.description ||
        !form.dateStart ||
        !form.timeStart ||
        !form.address ||
        !form.city ||
        !form.postalCode ||
        !form.email ||
        !form.ageRange ||
        !form.domain
        }
    >

      {forNewEvent ? 'Créer événement' : 'Actualiser événement'}
    </Button>
  </div>

    }
  ]

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
      {isLoading
        ? <Loader />
        : <>
          <div className='absolute'>
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
          </div>
          <div className='lg:col-span-2 bg-gradient-to-t from-gray-50/70 via-gray-100/70 to-gray-50/50 lg:py-32 xl:py-40 px-8'>
            <div className='relative mb-12'>
              <Typography variant='h3' className='font-bold'>Formulaire</Typography>
              <div className='absolute -top-2/3'>
                <Image
                  src='/images/iconos/brush.svg'
                  width='100%'
                  height='100%'
                />
              </div>
            </div>
            <Card className='flex flex-col justify-between shadow-gray-700/20 shadow-2xl'>
              <CardBody>
                <Progress className='mb-12' color='deep-purple' variant='gradient' value={(currentPage / 2) * 100} />
                <form className='col-span-1' onSubmit={handleSubmit}>
                  {steps[currentPage].form}
                </form>
              </CardBody>
              <CardFooter className={`flex
                ${currentPage === 0 ? 'justify-end' : 'justify-between'}
                `}
              >
                {currentPage !== 0 &&
                  <Button color='deep-purple' onClick={() => currentPage === 0 ? null : paginate(currentPage - 1)}>Preveus</Button>}

                {currentPage < steps.length - 1 &&
                  <Button color='deep-purple' onClick={() => currentPage === steps.length ? null : paginate(currentPage + 1)}>Suivant</Button>}
              </CardFooter>
            </Card>
          </div>

          <div className='lg:col-span-6 py-20 lg:py-32 xl:py-40 px-8'>
            <div className='relative mb-12'>
              <Typography variant='h3' className='font-bold'>Aperçu de votre événement</Typography>
              <div className='absolute -top-2/3'>
                <Image
                  src='/images/iconos/brush.svg'
                  width='100%'
                  height='100%'
                />
              </div>
            </div>
            <LayoutEvent data={form} user={user} imagesPreview={imagesPreview} />
          </div>
        </>}
    </>
  )
}
