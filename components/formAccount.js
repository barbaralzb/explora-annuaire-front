import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { domainList } from 'utils/utils'
import { toast, ToastContainer } from 'react-toastify'
import { Loader } from './Basics/Loader'
import { useRouter } from 'next/router'
import { Card, Input, Tabs, TabsHeader, Textarea, Tab, TabsBody, TabPanel, Chip, Button } from '@material-tailwind/react'
import { useAppContext } from 'context/AppContext'
import useSWR from 'swr'
import LayoutAsso from './LayoutAsso'
import SelectComponent from 'components/Basics/SelectComponent'
import { TbWorld } from 'react-icons/tb'
import 'react-toastify/dist/ReactToastify.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function FormAccount ({ formData }) {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)

  const router = useRouter()
  const [imagePreview, setImagePreview] = useState('')
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState(formData.domain[0] || '')
  const [queryDomain, setQueryDomain] = useState('')
  const [file, setFile] = useState([])
  const [form, setform] = useState({
    username: formData.username || 'Nom de l\'association',
    email: formData.email,
    description: formData.description,
    address: formData.address,
    city: formData.city,
    postalCode: formData.postalCode,
    domain: formData.domain,
    website: formData.website,
    facebook: formData.facebook,
    instagram: formData.instagram,
    twitter: formData.twitter,
    image: formData.image
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
      domain: selectedDomain
    })
  }, [selectedDomain])

  const handleSubmit = e => {
    e.preventDefault()
    putData(form)
  }

  console.log(form.image)

  const uploadFileHandler = async () => {
    const formData = new FormData()
    formData.append('images', file)

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
      setform({
        ...form,
        image: data[0].url
      })
      // Promise.all(form.image).then(() => {
      //   putData(form)
      // })
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }
  const notify = () => toast('Something important isn\'t valid')

  const putData = async (form) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token, id } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
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
        // toast('Profile est maintenaint mis a jour 🎈', {
        //   onClose: () => router.push('/')
        // })
        toast('Profile est maintenaint mis a jour 🎈')
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  function handleUploadSingleFile (e) {
    const image = e.target.files[0]
    setImagePreview(URL.createObjectURL(image))
    setFile(image)
  }

  const deleteFile = () => {
    setImagePreview('')
    setFile('')
  }

  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  const fieldVide = []
  !form.username && fieldVide.push(' Nom de l\'association')
  !form.description && fieldVide.push(' description')
  !form.address && fieldVide.push(' adress')
  !form.city && fieldVide.push(' ville')
  !form.postalCode && fieldVide.push(' code postale')
  !form.domain && fieldVide.push(' domaine')

  const steps = [
    {
      label: '1. Information',
      value: 'step1',
      form:
  <div className='flex flex-col gap-6 gap-y-8'>
    <Input
      color='deep-purple'
      label='Email'
      type='text'
      name='email'
      id='email'
      value={form.email}
      disabled
    />

    <Input
      label={<div> <span className='text-orange-500 mr-1'>⚹</span>Nom de l'association</div>}
      color='deep-purple'
      type='text'
      name='username'
      id='username'
      autoComplete='given-name'
      onChange={handleChange}
      value={form.username}
      success={!!form.username}
      required
    />

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

    <Textarea
      label={<div><span className='text-orange-500 mr-1'>⚹</span>Description</div>}
      color='deep-purple'
      type='text'
      name='description'
      id='description'
      autoComplete='given-name'
      onChange={handleChange}
      value={form.description}
      success={!!form.description}
      required
    />

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
      success={!!form.address}
    />

    <Input
      success={!!form.city}
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
      success={!!form.postalCode}
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

  </div>

    },
    {
      label: '2. Réseaux Sociaux',
      value: 'step2',
      form:
  <div className='flex flex-col gap-6 gap-y-8'>

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
        success={!!form.facebook}
      />
    </div>

    <div className='mt-1 flex rounded-md'>
      <Chip color='pink' value={<FaInstagram size='16' />} variant='gradient' className='mr-2' />
      <Input
        success={!!form.instagram}
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
      <Chip value={<FaTwitter size='16' />} variant='gradient' className='mr-2' />
      <Input
        success={!!form.twitter}
        color='deep-purple'
        label='Twitter'
        type='text'
        name='twitter'
        id='twitter'
        onChange={handleChange}
        value={form.twitter}
      />
    </div>

    <div className='mt-1 flex rounded-md'>
      <Chip color='teal' value={<TbWorld size='16' />} variant='gradient' className='mr-2' />
      <Input
        success={!!form.website}
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

    {imagePreview.length > 0 &&
      <div className='flex snap-x gap-x-4 items-center'>
        <div className='relative shadow h-24 w-24 rounded'>
          <Image
            src={imagePreview}
            layout='fill'
            objectFit='cover'
            alt=''
          />
        </div>
        <div>
          <Button variant='text' color='deep-purple' onClick={deleteFile} className='normal-case'>
            Delete
          </Button>
        </div>

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
        !form.username ||
        !form.description ||
        !form.address ||
        !form.city ||
        !form.postalCode ||
        !form.domain
        }
    >
      Actualiser Profile
    </Button>
  </div>

    }

  ]

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
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
              </form>
            </Card>

            <div className='col-span-2'>
              <LayoutAsso data={form} user={data} imagePreview={imagePreview} />
            </div>
          </div>
          </>}
    </>

  )
}
