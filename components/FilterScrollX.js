import { useState, useRef } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import Link from 'next/link'
import { domainList } from 'utils/utils'
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
    <div className='grid grid-flow-col items-center justify-center h-full'>
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
          color='deep-purple'
          className='mx-4'
          onClick={() => slide(-130)}
        >
          <HiOutlineChevronLeft />
        </IconButton>
      </Transition>
      <motion.ul
        className='col-auto w-max-full flex flex-nowrap scroll-smooth overflow-hidden items-center h-full'
        style={{ WebkitAppearance: 'none' }}
        ref={scrl} onScroll={scrollCheck}
        variants={container}
        initial='hidden'
        animate='visible'
      >

        {domainList.map(e => {
          return (
            <motion.li key={e.id} className='mx-2 h-full py-6' variants={item}>
              <Button color={e.color} className='w-36 h-full' variant='gradient'>
                <Link href='/signin'>
                  <a className='grid grid-cols-1 h-full place-items-center'>
                    <div className='self-start'>{e.icon}</div>
                    <span className='self-start font-semibold text-center normal-case text-base'>{e.label}</span>
                  </a>
                </Link>
              </Button>
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
          color='deep-purple'
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
