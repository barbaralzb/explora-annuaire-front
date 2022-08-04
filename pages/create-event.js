import { useEffect, useState } from 'react'
import FormEvent from 'components/Basics/formEvent'
import { useRouter } from 'next/router'
import { ageRangeList, domainList } from 'utils/utils'

export default function CreateEvent () {
  const router = useRouter()
  // quiero saber si necesito dos estados de mi dispatch como se haria?

  const [selectedAge, setSelectedAge] = useState(ageRangeList[0])
  const [selectedDomain, setSelectedDomain] = useState(domainList[0])
  const [file, setFile] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

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
    images: file
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

  function handleUploadSingleFile (e) {
    setFile(file => [...file, e.target.files[0]])
  }

  useEffect(() => {
    setform({
      ...form,
      ageRange: selectedAge.label,
      domain: selectedDomain.label
    })

    const imagesSrc = []
    for (const img of file) {
      imagesSrc.push(URL.createObjectURL(img))
    }
    setImagesPreview(imagesSrc)
    // console.log('aca esta form.image cuando se carga mi componente : ', form.images)
  }, [selectedAge, selectedDomain, file])

  // mejorar, quizas callback or promise (?)
  const HandleSubmit = e => {
    e.preventDefault()
    if (file.length > 0) {
      uploadFileHandler()
    } else {
      postData(form)
    }
  }
  useEffect(() => {
    if (file.length > 0) {
      postData(form)
    }
  }, [form.images])
  // fin

  function deleteFile (e) {
    const s = file.filter((item, index) => index !== e)
    setFile(s)
    // console.log(`nuevo estado de file SIN la img suprimida, type of s : ${typeof (s)}, ${s}`)
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

      // let dataImg = []
      // for (const i in data) {
      //   dataImg = [...dataImg, { dataImg: data[i] }]
      // }
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

  // const random = Math.floor(Math.random() * backgroundColors.length)
  // const RandomColor = backgroundColors[random]
  console.log('aca esta file', file)
  return (
    <>
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
        imagesPreview={imagesPreview}
        deleteFile={deleteFile}
        handleUploadSingleFile={handleUploadSingleFile}
        setFile={setFile}
      />
    </>
  )
}
