import { useState, useRef } from 'react'
import { Card, IconButton } from '@material-tailwind/react'
import Link from 'next/link'
import { domainList } from 'utils/utils'
import styles from './hero.module.css'
import { motion } from 'framer-motion'
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi'
import PopoverComponent from './Basics/PopoverComponent'
import { Transition } from '@headlessui/react'

export default function FilterScrollX ({ refer }) {
  const scrl = useRef(null)
  const [scrollX, setscrollX] = useState(0)
  const [scrolEnd, setscrolEnd] = useState(false)

  const handleClick = () => {
    refer.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Slide click
  const slide = (shift) => {
    handleClick()
    scrl.current.scrollLeft += shift
    setscrollX(scrollX + shift)

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

  const scrollCheck = () => {
    handleClick()
    setscrollX(scrl.current.scrollLeft)
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

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

  return (
    <div className='grid grid-flow-col items-center justify-center'>
      <Transition
        show={scrollX !== 0}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <IconButton
          size='lg'
          variant='text'
          color='orange'
          className='mx-4'
          onClick={() => slide(-130)}
        >
          <HiOutlineChevronLeft />
        </IconButton>
      </Transition>
      <motion.ul
        className='col-auto w-max-full flex flex-nowrap scroll-smooth overflow-hidden items-center'
        style={{ '-webkit-appearance': 'none' }}
        ref={scrl} onScroll={scrollCheck}
        variants={container}
        initial='hidden'
        animate='visible'
      >

        {domainList.map(e => {
          return (
            <motion.li key={e.id} className={styles.li} variants={item}>
              <Link href='/signin'>
                <a>
                  <Card className='w-full'>
                    <div className='w-full transition ease-in-out delay-150 duration-100 text-xs flex flex-col justify-center rounded-lg py-4 px-6 text-black/70 hover:text-black items-center'>
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
      <Transition
        show={!scrolEnd}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <IconButton
          size='lg'
          variant='text'
          color='orange'
          className='mx-4'
          onClick={() => slide(+130)}
        >
          <HiOutlineChevronRight />
        </IconButton>
      </Transition>
      <div className='pl-6'>
        <PopoverComponent />
      </div>
    </div>
  )
}
