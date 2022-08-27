import { useState, useRef } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { domainList } from 'utils/utils'
import { motion } from 'framer-motion'
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi'
import PopoverComponent from './Basics/PopoverComponent'
import { Transition } from '@headlessui/react'
import Image from 'next/image'

export default function FilterScrollX ({ refer, menuItems, setItem, filterItem, ResetFilter }) {
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

        {domainList.map(e => (
          <motion.li key={e.id} className='mx-2 h-full py-12 relative' variants={item}>
            <div className='self-start absolute top-10'>
              <Image
                src='/images/iconos/2.svg'
                width='60'
                height='60'
              />
            </div>
            <Button color={e.color} className='w-36 h-full shadow-md text-black rounded-none bg-white relative hover:-translate-y-2 hover:scale-105 hover:skew-y-3' variant='text' onClick={() => filterItem(e.label)}>
              <div className='grid grid-cols-1 h-full place-items-center py-5'>
                {/* <div className='self-start absolute -top-10'>
                    <Image
                      src='/images/iconos/2.svg'
                      width='60'
                      height='60'
                    />
                  </div> */}
                <span className='font-semibold text-center normal-case text-base'>{e.label}</span>
              </div>
            </Button>
          </motion.li>
        )
        )}
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
      <div className='pl-6 flex flex-col justify-around py-12 h-full'>
        <Button variant='text' color='deep-purple' onClick={ResetFilter}>
          Tout
        </Button>
        <PopoverComponent />
      </div>
    </div>
  )
}
