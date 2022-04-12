import type { NextPage } from 'next';
import styles from '../../../styles/Header.module.css';
import AppLogo from '../../icons/logo.svg';



const Header: NextPage = () => {
    return (
        <>
            <header className={styles.header__main}>
                <h1 className={styles.logo__header}><img src={AppLogo} alt="Logo" /></h1>
                <nav className={styles.nav__header}>
                </nav>
            </header>
        </>

    )
}

export default Header
