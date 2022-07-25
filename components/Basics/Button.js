import Link from 'next/link'

export default function Button ({ path, title }) {
  return (
    <Link href={path}>
      <a className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 hover:ring-secondary/80 ring-secondary'>
        <span>{title}<span aria-hidden='true'>→</span></span>
      </a>
    </Link>
  )
}
