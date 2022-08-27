import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export default function SelectComponent ({ labels, query, setQuery, setSelectedLabel, selectedLabel }) {
  const filteredLabel =
    query === ''
      ? labels
      : labels.filter((item) =>
        item.label
          .toLowerCase()
          .includes(query.toLowerCase())
      )

  return (
    <>
      <Combobox as='div' value={selectedLabel} onChange={setSelectedLabel}>
        <div className='relative mt-1'>
          <div className='relative w-full min-w-[200px] h-10'>
            <Combobox.Input
              className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-deep-purple-500'
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item) => item?.label}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <SelectorIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {query.length > 0 && (
                <Combobox.Option
                  value={{ id: null, label: query }}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-deep-purple-500 text-white' : 'text-gray-900'
                    }`}
                >
                  Cree : "{query}"
                </Combobox.Option>
              )}
              {filteredLabel?.map(item => {
                let e = 'deep-purple'

                if (item.color !== undefined) {
                  e = item.color
                }

                return (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? `bg-${e}-500 text-white` : 'text-gray-900'
                    }`}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                        >
                          {item.label}
                        </span>
                        {selected
                          ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                            >
                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                            )
                          : null}
                      </>
                    )}
                  </Combobox.Option>
                )
              }
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  )
}
