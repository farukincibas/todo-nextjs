import type { NextPage } from 'next';
import styles from '../../../styles/Header.module.css';
import AppLogo from '/public/icons/rise.svg';
import Image from 'next/image';

const Header: NextPage = () => {
    return (
        <>
            <header className={styles.header__main}>
                <h1 className={styles.logo__header}><Image src={AppLogo} alt="Logo" /></h1>
                <nav className={styles.nav__header}>
                </nav>
            </header>
        </>

    )
}

export default Header
