export default function Card ({ title, body }) {
  return (
    <div className='card h-full'>
      <div className='card-header'>
        <div className='card-header-title'>
          {title}
        </div>
      </div>
      <div className='card-content'>
        <div className='content'>
          {body}
        </div>
      </div>
    </div>

  )
}
