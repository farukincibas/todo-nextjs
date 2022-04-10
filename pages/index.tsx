import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ContextProvider from './store/ContextProvider';
import Table from './components/Table';

const Home: NextPage = () => {
  return (
    <ContextProvider>
      <div className={styles.container}>

        <main className={styles.main}>
          <Table></Table>
        </main>

        <footer className={styles.footer}>

        </footer>
      </div>
    </ContextProvider>

  )
}

export default Home
