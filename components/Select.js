import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export default function Select ({ labels, query, setQuery, setSelectedLabel, selectedLabel }) {
  const filteredLabel =
    query === ''
      ? labels
      : labels.filter((item) =>
        item.label
          .toLowerCase()
          .includes(query.toLowerCase())
      )

  // console.log(query !== '' ? `se escribio : ${query}` : 'ya se desmonto')
  // console.log('este es el Label selected ', selectedLabel)

  return (
    <div className=''>
      <Combobox value={selectedLabel} onChange={setSelectedLabel}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-md bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md shadow-sm'
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item) => item.label}
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
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`}
                >
                  Cree "{query}"
                </Combobox.Option>
              )}
              {filteredLabel.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
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
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
