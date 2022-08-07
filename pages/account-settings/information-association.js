import FormAccount from 'components/formAccount'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { domainList } from 'utils/utils'
import useSWR from 'swr'
import { useAppContext } from 'context/AppContext'
import { Loader } from 'components/Basics/Loader'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AccountSettings () {
  const { state } = useAppContext()
  const { data, error } = useSWR(state ? `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${state.id}` : null, fetcher)
  // const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState(domainList[0])
  const [queryDomain, setQueryDomain] = useState('')
  const [file, setFile] = useState([])
  const [form, setform] = useState({
    username: '',
    description: '',
    address: '',
    city: '',
    postalCode: Number,
    domain: '',
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    image: ''
  })

  const HandleChange = e => {
    const { name, value } = e.target
    setform({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    setform({
      ...form,
      domain: selectedDomain.label
    })
  }, [selectedDomain])

  const HandleSubmit = e => {
    e.preventDefault() /
    // uploadFileHandler()
    postData(form)

    // if (file.length > 0) {
    //   uploadFileHandler()
    //   postData(form)
    // } else {
    //   console.log('no capto que form.images tiene img')
    //   postData(form)
    // }
  }

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
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const postData = async (form) => {
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
      console.log('post realizado', data)
      setform({
        username: '',
        description: '',
        address: '',
        city: '',
        postalCode: Number,
        domain: '',
        email: '',
        website: '',
        facebook: '',
        instagram: '',
        twitter: '',
        image: ''
      })
      // if (data.success === true) { router.push('/') }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }
  if (error) return <div>Failed to load</div>
  if (!data) return <Loader />
  return (
    <>
      <div className='bg-gradient-to-r from-neutral-100 via-white to-neutral-100'>
        <div className='flex justify-center p-12'>
          <div className='max-w-6xl'>
            <FormAccount
              handleSubmit={HandleSubmit}
              handleChange={HandleChange}
              form={form}
              setSelectedDomain={setSelectedDomain}
              selectedDomain={selectedDomain}
              domainList={domainList}
              queryDomain={queryDomain}
              setQueryDomain={setQueryDomain}
              setFile={setFile}
            />
          </div>
        </div>
      </div>
    </>
  )
}
