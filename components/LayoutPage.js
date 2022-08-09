import styles from './layout.module.css'

export default function LayoutPage ({ children }) {
  return (
    <main className={styles.main}>
      <div className='flex justify-center'>
        <div className='max-w-7xl'>
          {children}
        </div>
      </div>
    </main>
  )
}
