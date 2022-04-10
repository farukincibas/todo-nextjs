import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ContextProvider from './store/ContextProvider';

const Home: NextPage = () => {
  return (
    <ContextProvider>
      <div className={styles.container}>

        <main className={styles.main}>
          <span>hello world</span>
        </main>

        <footer className={styles.footer}>

        </footer>
      </div>
    </ContextProvider>

  )
}

export default Home
