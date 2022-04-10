import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ContextProvider from './store/ContextProvider';
import Table from './components/Table';
import AddTask from './components/AddTask';

const Home: NextPage = () => {
  return (
    <ContextProvider>
      <div className={styles.container}>

        <main className={styles.main}>
          <AddTask></AddTask>
          <Table></Table>
        </main>

        <footer className={styles.footer}>

        </footer>
      </div>
    </ContextProvider>

  )
}

export default Home
