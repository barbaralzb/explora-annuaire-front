import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function Dropdown ({ setEditEvent, id, setIsLoading }) {
  const router = useRouter()
  const [message, setMessage] = useState([])

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
      console.log('post realizado success:', data.success, data)
      if (!data.success) {
        for (const key in data.err.errors) {
          const error = data.err.errors[key]
          setMessage(oldmessage => [
            ...oldmessage,
            { message: error.message }
          ])
        }
      } else {
        setIsLoading(true)
        router.push('/')
      }
    } catch (error) {
      console.log('Error del servidor', error)
    }
  }
  return (
    <div className='absolute top-10 right-10 z-10'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='shadow-md bg-white/70 group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-black/25 focus-visible:ring-opacity-75'>
            Options
            <ChevronDownIcon
              className='ml-2 h-5 w-5 focus:text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80'
              aria-hidden='true'
            />
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
                    onClick={() => setEditEvent(true)}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active
                      ? (
                        <EditActiveIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                        )
                      : (
                        <EditInactiveIcon
                          className='mr-2 h-5 w-5'
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
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active
                      ? (
                        <ArchiveActiveIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                        )
                      : (
                        <ArchiveInactiveIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                        )}
                    Archive
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
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active
                      ? (
                        <DeleteActiveIcon
                          className='mr-2 h-5 w-5 text-violet-400'
                          aria-hidden='true'
                        />
                        )
                      : (
                        <DeleteInactiveIcon
                          className='mr-2 h-5 w-5 text-violet-400'
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
  )
}

function EditInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
    </svg>
  )
}

function EditActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
    </svg>
  )
}

function ArchiveInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  )
}

function ArchiveActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  )
}

function DeleteInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#A78BFA' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  )
}

function DeleteActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#C4B5FD' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#C4B5FD' strokeWidth='2' />
    </svg>
  )
}
