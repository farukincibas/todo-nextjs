import type { NextPage } from 'next';
import styles from '../../../styles/Footer.module.css';


const Footer: NextPage = () => {
    return (
        <>
            <footer>
                <section className={styles.ft__legal} >
                    <ul className={styles.ft__legal__list}>
                        <li><button className={styles.buttonGit}>git</button></li>
                        <li><a href="https://github.com/farukincibas/todo-nextjs">repository</a></li>
                        <li>&copy; 2022 Ömer Faruk incibaş</li>
                    </ul>
                </section>
            </footer>
        </>

    )
}

export default Footer
