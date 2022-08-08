import { useEffect, useState } from 'react'
import FormEvent from 'components/Basics/formEvent'
import { useRouter } from 'next/router'
import { ageRangeList, domainList } from 'utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function addEvent () {
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState(ageRangeList[0])
  const [selectedDomain, setSelectedDomain] = useState(domainList[0])
  const [file, setFile] = useState([])
  const [message, setMessage] = useState([])

  const [isShowing, setIsShowing] = useState(true)
  const [queryAge, setQueryAge] = useState('')
  const [queryDomain, setQueryDomain] = useState('')

  const [form, setform] = useState({
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
  })
  const notify = () => toast('Something important isn\'t valid')

  const HandleChange = e => {
    const { name, value, checked } = e.target
    if (name === 'fullDay') {
      setform({
        ...form,
        fullDay: checked
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
  }, [selectedAge, selectedDomain])

  const HandleSubmit = e => {
    e.preventDefault()
    if (file.length > 0) {
      uploadFileHandler()
      postData(form)
    } else {
      console.log('no hay imagenes')
      postData(form)
    }
  }

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
    setIsShowing((isShowing) => !isShowing)
  }
  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  // const random = Math.floor(Math.random() * backgroundColors.length)
  // const RandomColor = backgroundColors[random]

  return (
    <>
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
      <FormEvent
        handleSubmit={HandleSubmit}
        handleChange={HandleChange}
        form={form}
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
        setFile={setFile}
      />
    </>
  )
}
