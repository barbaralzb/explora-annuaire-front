import { CgAsterisk } from 'react-icons/cg'
import Select from 'components/Basics/select'
import { FiTwitter } from 'react-icons/fi'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import theme from 'styles/theme'
import { useState } from 'react'
import Image from 'next/image'

export default function FormAccount (props) {
  const [imagesPreview, setImagePreview] = useState('')

  function handleUploadSingleFile (e) {
    const image = e.target.files[0]
    setImagePreview(URL.createObjectURL(image))
    props.setFile(image)
  }

  const onInput = e => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '')
  }

  return (
    <>
      <form className='bg-white  shadow overflow-hidden sm:rounded-md' onSubmit={props.handleSubmit}>
        <div className='px-4 py-3 text-right sm:px-6'>
          <div className='flex items-center text-sm text-gray-600'>
            {/* <Image
              className='rounded shadow-lg shadow-indigo-500/40'
              width='64'
              height='64'
              src={props.form.image}
            /> */}
            <label
              htmlFor='image'
              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ml-3'
            >
              <span>Upload a file</span>
              <input
                id='image'
                name='image'
                type='file'
                className='sr-only'
                onChange={handleUploadSingleFile}
              />
            </label>
          </div>

        </div>
        <div className='md:grid md:grid-cols-2 md:gap-6'>
          <div className='col-span'>

            <div className='md:grid md:grid-cols-1 md:gap-6 px-4 py-5 sm:p-6'>

              <div className='grid grid-cols-6 gap-6'>

                <div className='col-span-6'>
                  <label htmlFor='username' className='flex text-sm font-medium text-gray-700'>
                    Nom de l'association <CgAsterisk size='10' color={theme.colors.secondary} />
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='given-name'
                    onChange={props.handleChange}
                    value={props.form.username}
                    required
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6'>
                  <label htmlFor='description' className='flex text-sm font-medium text-gray-700'>
                    Description <CgAsterisk size='10' color={theme.colors.secondary} />
                  </label>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    autoComplete='given-name'
                    onChange={props.handleChange}
                    value={props.form.description}
                    required
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6'>
                  <label htmlFor='domain' className='flex text-sm font-medium text-gray-700'>
                    Domaine <CgAsterisk size='10' color={theme.colors.secondary} />
                  </label>
                  <Select
                    labels={props.domainList}
                    setSelectedLabel={props.setSelectedDomain}
                    selectedLabel={props.selectedDomain}
                    required
                    query={props.queryDomain}
                    setQuery={props.setQueryDomain}
                  />
                </div>

                <div className='col-span-6'>
                  <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                    Address Postale
                  </label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    onChange={props.handleChange}
                    value={props.form.address}
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
                    onChange={props.handleChange}
                    value={props.form.city}
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
                    onChange={props.handleChange}
                    value={props.form.postalCode}
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
                    onChange={props.handleChange}
                    value={props.form.website}
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.example.fr'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='facebook' className='block text-sm font-medium text-gray-700'>
                  Facebook
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    <FaFacebookSquare />
                  </span>
                  <input
                    type='text'
                    name='facebook'
                    id='facebook'
                    onChange={props.handleChange}
                    value={props.form.facebook}
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.facebook.fr'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='instagram' className='block text-sm font-medium text-gray-700'>
                  Instagram
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    <FaInstagram />
                  </span>
                  <input
                    type='text'
                    name='instagram'
                    id='instagram'
                    onChange={props.handleChange}
                    value={props.form.instagram}
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.instagram.fr'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='twitter' className='block text-sm font-medium text-gray-700'>
                  Twitter
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    <FiTwitter />
                  </span>
                  <input
                    type='text'
                    name='twitter'
                    id='twitter'
                    onChange={props.handleChange}
                    value={props.form.twitter}
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.twitter.com'
                  />
                </div>
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
                  onChange={props.handleChange}
                  value={props.form.email}
                  className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
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
    </>
  )
}
