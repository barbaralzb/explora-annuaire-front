import Image from 'next/image'

export default function Card (props) {
  return (
    <div className='card shadow-lg rounded'>
      <div className='card-header'>
        <div className='card-header-title'>
          {props.title}
        </div>
      </div>
      <div className='card-content'>
        <div className='content'>
          <div className='flex gap-2'>
            {/* {props.images.length > 0 &&
                    props.images.map((item) => {
                      return (
                        <div key={item} className='relative shadow h-24 w-24 rounded'>
                          <Image
                            src={item}
                            className='rounded-md shadow'
                            layout='fill'
                            objectFit='cover'
                            alt=''
                          />
                        </div>

                      )
                    })} */}
          </div>
        </div>
      </div>
    </div>

  )
}
