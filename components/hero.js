import Link from 'next/link'
import { domainList } from 'utils/utils'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}
export default function Hero () {
  return (
    <div className='relative'>
      <motion.ul
        className='grid grid-cols-8 gap-4 my-20 items-center'
        variants={container}
        initial='hidden'
        animate='visible'
      >
        {domainList.map(e => (
          <motion.li key={e.id} variants={item}>
            <Link href='/signin'>
              <a className='text-xs flex flex-col justify-center rounded-lg py-3 px-4 text-black hover:bg-white hover:shadow-lg hover:shadow-secondary/10 bg-white/60 items-center'>
                {e.icon}
                <span className='font-bold text-center'>{e.label}</span>
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
