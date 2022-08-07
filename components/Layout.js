import styles from './layout.module.css'

export default function Layout ({ children }) {
  return (
    <main className={styles.main}>
      <div>
        <div className='flex justify-center bg-hero-pattern bg-no-repeat bg-[right_top_-20rem]'>
          <div className='max-w-7xl'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
