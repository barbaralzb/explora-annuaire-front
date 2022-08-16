/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Pagination ({ eventsPerPage, totalEvents, paginate, currentPage }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className='px-4 py-3 flex items-center justify-between border-t border-gray-200 rounded-lg'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          Précédente
        </a>
        <a
          href='#'
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          Suivante
        </a>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>{totalEvents.length}</span> results
          </p>
        </div>
        <div>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
            <a
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => currentPage === 1 ? null : paginate(currentPage - 1)}
            >
              <span className='sr-only'>Précédent</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>
            {pageNumbers.map(number => (
              <a
                key={number}
                onClick={() => paginate(number)}
                className={`${currentPage === number ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : ''}
                bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-default`}
              >
                {number}
              </a>
            ))}
            <a
              onClick={() => currentPage === pageNumbers.slice(-1)[0] ? null : paginate(currentPage + 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Suivante</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
