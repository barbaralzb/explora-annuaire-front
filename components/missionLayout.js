import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ageRangeList, domainList } from 'utils/utils'
import Dropdown from './Basics/Dropdown'
import FormEvent from './Basics/formEvent'
import { v4 as uuidv4, v4 } from 'uuid'

export default function EventLayout ({ data }) {
  const router = useRouter()

  const [editEvent, setEditEvent] = useState(false)
  const [selectedAge, setSelectedAge] = useState(ageRangeList[0])
  const [selectedDomain, setSelectedDomain] = useState(domainList[0])
  const [file, setFile] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [imagesFromProps, setImagesFromProps] = useState([])

  const [isShowing, setIsShowing] = useState(true)
  const [queryAge, setQueryAge] = useState('')
  const [queryDomain, setQueryDomain] = useState('')
  const [form, setform] = useState({
    title: data.title,
    description: data.description,
    dateStart: data.Start,
    dateEnd: data.dateEnd,
    fullDay: data.fullDay,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    ageRange: data.ageRange,
    domain: data.domain,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    images: data.images
  })

  const HandleChange = e => {
    const { name, value, checked } = e.target
    if (name === 'fullDay') {
      setform({
        ...form,
        [name]: checked
      })
    } else {
      setform({
        ...form,
        [name]: value
      })
    }
  }

  useEffect(() => {
    setform({
      ...form,
      ageRange: selectedAge.label,
      domain: selectedDomain.label
    })
  }, [selectedAge, selectedDomain, file])

  function handleUploadSingleFile (e) {
    setFile(file => [...file, e.target.files[0]])
  }

  useEffect(() => {
    getUrlsFromDataImages()
    if (file) {
      for (const img of file) {
        setImagesPreview(ImagesPreview => [...ImagesPreview, URL.createObjectURL(img)])
      }
    }
  }, [file])

  function deleteFile (e) {
    const s = file.filter((item) => item !== e)
    setFile(s)
  }

  function deleteFileFromData (e) {
    const s = imagesFromProps.filter((item) => item !== e)
    setImagesFromProps(s)
  }

  // obtengo las url de mi data y las guardo en imagesPreview
  const getUrlsFromDataImages = () => {
    const imagesStorage = []
    for (const image of data.images) {
      imagesStorage.push(image.url)
    }
    setImagesFromProps(imagesStorage)
  }

  // mejorar, quizas callback or promise (?)
  const HandleSubmit = e => {
    e.preventDefault()
    uploadFileHandler()

    // if (file.length > 0) {
    //   uploadFileHandler()
    // } else {
    //   postData(form)
    // }
  }
  useEffect(() => {
    if (file.length > 0) {
      postData(form)
    }
  }, [form.images])
  // fin

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
      setform({
        ...form,
        images: data
      })
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
      console.log('post realizado', data)
      if (data.success === true) { router.push('/') }
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
      {editEvent
        ? <FormEvent
            form={form}
            handleSubmit={HandleSubmit}
            handleChange={HandleChange}
            ageRangeList={ageRangeList}
            setSelectedAge={setSelectedAge}
            selectedAge={selectedAge}
            queryAge={queryAge}
            setQueryAge={setQueryAge}
            domainList={domainList}
            setSelectedDomain={setSelectedDomain}
            selectedDomain={selectedDomain}
            queryDomain={queryDomain}
            setQueryDomain={setQueryDomain}
            handleCheckbox={handleCheckbox}
            isShowing={isShowing}
            onInput={onInput}
            imagesPreview={imagesPreview}
            deleteFile={deleteFile}
            handleUploadSingleFile={handleUploadSingleFile}
            isEditing={imagesFromProps}
            deleteFileFromData={deleteFileFromData}

          />
        : <div className='bg-white'>
          <div className='relative shadow max-w-2xl mx-auto my-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2 rounded-md'>
            <Dropdown setEditEvent={setEditEvent} />
            <div>
              <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{data.title}</h2>
              <p className='mt-4 text-gray-500'>{data.description}</p>

              <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
                <div className='border-t border-gray-200 pt-4'>
                  <div className='font-medium text-gray-900'>Heure</div>
                  <dd className='mt-2 text-sm text-gray-500'>{`${data.fullDay ? data.fullDay : data.timeStart + data.timeEnd}`}</dd>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <dt className='font-medium text-gray-900'>Date</dt>
                  <dd className='mt-2 text-sm text-gray-500'>{data.dateStart}{data.dateEnd}</dd>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <dt className='font-medium text-gray-900'>Adress</dt>
                  <dd className='mt-2 text-sm text-gray-500'>{data.address}{data.city}{data.postalCode}</dd>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <dt className='font-medium text-gray-900'>Contact</dt>
                  <dd className='mt-2 text-sm text-gray-500'>{data.email}</dd>
                </div>
              </dl>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 h-full'>
              {data.images.map((image, index) => (
                <div key={index} className='w-auto relative h-full'>
                  <Link passHref href={image.url}>
                    <a target='_blank' rel='noopener noreferrer'>
                      <Image
                        src={image.url}
                        alt={image.name}
                        className='bg-gray-100 rounded-lg'
                        layout='fill'
                        objectFit='contain'
                      />
                    </a>
                  </Link>
                </div>
              ))}

            </div>
          </div>
          </div>}
    </>
  )
}
