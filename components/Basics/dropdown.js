import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TbDots } from 'react-icons/tb'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function wn ({ id, setDeletedPostId }) {
  const router = useRouter()
  const [setMessage] = useState([])

  const deletePost = async () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const { token } = loggedUser
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!data.success) {
        for (const key in data.err.errors) {
          const error = data.err.errors[key]
          setMessage(oldmessage => [
            ...oldmessage,
            { message: error.message }
          ])
        }
      } else {
        toast('Evénement effacé')
        setDeletedPostId(true)
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }

  const handlerModifie = () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser.success) {
      router.push({
        pathname: `/evenements/${id}/modifier`,
        query: { id }
      })
    }
  }
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
      <div className='absolute top-4 right-4 z-10'>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='shadow-md bg-white group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-black/25 focus-visible:ring-opacity-75'>
              <TbDots size='20' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handlerModifie}
                      className={`${
                      active ? 'bg-deep-purple-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active
                        ? (
                          <FiEdit
                            size='14'
                            className='mr-2 h-5 w-5 text-white'
                            aria-hidden='true'
                          />
                          )
                        : (
                          <FiEdit
                            className='mr-2 h-5 w-5 text-deep-purple-400'
                            aria-hidden='true'
                          />
                          )}
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={deletePost}
                      className={`${
                      active ? 'bg-deep-purple-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active
                        ? (
                          <FiTrash2
                            className='mr-2 h-5 w-5 text-white'
                            aria-hidden='true'
                          />
                          )
                        : (
                          <FiTrash2
                            className='mr-2 h-5 w-5 text-deep-purple-400'
                            aria-hidden='true'
                          />
                          )}
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>

  )
}
