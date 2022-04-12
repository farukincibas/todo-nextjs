import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ContextProvider from './store/ContextProvider';
import Table from './components/Table';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header';

const Home: NextPage = () => {
  return (
    <ContextProvider>
      <div className={styles.container}>
        <Header></Header>
        
        <main className={styles.main}>
          <AddTask></AddTask>
          <Table></Table>
        </main>

        <Footer></Footer>
      </div>
    </ContextProvider>

  )
}

export default Home
