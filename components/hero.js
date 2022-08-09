import Link from 'next/link'
import { domainList } from 'utils/utils'
import { motion } from 'framer-motion'
import { Card } from '@material-tailwind/react'

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
    <div className='relative flex'>
      <motion.ul
        className='grid grid-cols-7 gap-4 items-center max-w-2xl mx-auto pt-8 sm:pt-26 lg:pt-24 lg:max-w-none px-4 sm:px-6 lg:px-8'
        variants={container}
        initial='hidden'
        animate='visible'
      >
        {domainList.map(e => {
          return (
            <motion.li key={e.id} variants={item}>
              <Link href='/signin'>
                <a>
                  <Card>
                    <div className='`transition ease-in-out delay-150 duration-100 text-xs flex flex-col justify-center rounded-lg py-3 px-4 text-black/70 hover:text-black hover:bg-white bg-white/60 items-center'>
                      {/* <div className={`transition ease-in-out delay-150 duration-100 focus:text-${e.color}-500`}> */}
                      {e.icon}
                      <span className='font-bold text-center'>{e.label}</span>
                    </div>
                  </Card>
                </a>
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
