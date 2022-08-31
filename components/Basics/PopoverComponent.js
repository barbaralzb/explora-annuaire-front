import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Button, Checkbox } from '@material-tailwind/react'
import { Fragment } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { HiUserGroup } from 'react-icons/hi'

export default function PopoverComponent ({ posts, pageAssos }) {
  const cityChoices = [...new Set(posts.map((Val) => Val.city))]
  const ageRangeChoices = [...new Set(posts.map((Val) => Val.ageRange))]
  const domaine = [...new Set(posts.map((Val) => Val.domain))]

  return (
    <div className=''>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                shadow-md bg-white group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-black/25 focus-visible:ring-opacity-75`}
            >
              <span>Filtre</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-deep-purple-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden='true'
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute right-0 z-10 mt-3 w-screen max-w-sm -translate-x-0 transform px-4 sm:px-0 lg:max-w-3xl'>
                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div className='relative grid gap-8 bg-white p-7 lg:grid-cols-2'>

                    <div className='-m-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-deep-purple-500 focus-visible:ring-opacity-50'>
                      <div className='flex items-center'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12'>
                          <FiMapPin />
                        </div>
                        <div className='ml-4'>
                          <p className='font-bold text-xs uppercase text-gray'>
                            Ville
                          </p>
                        </div>
                      </div>

                      {cityChoices.map((e, index) => (
                        <div key={e}>
                          <Checkbox color='deep-purple' label={e} />
                        </div>
                      ))}

                    </div>

                    {pageAssos &&
                      <div className='-m-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-deep-purple-500 focus-visible:ring-opacity-50'>
                        <div className='flex items-center'>
                          <div className='flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12'>
                            <HiUserGroup />
                          </div>
                          <div className='ml-4'>
                            <p className='font-bold text-xs uppercase text-gray'>
                              Public
                            </p>
                          </div>
                        </div>

                        {ageRangeChoices.map((e, index) => (
                          <div key={e}>
                            <Checkbox color='deep-purple' label={e} />
                          </div>
                        ))}

                      </div>}

                    <div className='xl:hidden -m-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-deep-purple-500 focus-visible:ring-opacity-50'>
                      <div className='flex items-center'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12'>
                          <HiUserGroup />
                        </div>
                        <div className='ml-4'>
                          <p className='font-bold text-xs uppercase text-gray'>
                            Catégorie
                          </p>
                        </div>
                      </div>

                      {domaine.map((e, index) => (
                        <div key={e}>
                          <Checkbox color='deep-purple' label={e?.label} />
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className='bg-gray-50 p-4 flex justify-between'>
                    <Button variant='text' color='deep-purple'>
                      Effacer
                    </Button>
                    <Button color='deep-purple'>
                      Filtre
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
