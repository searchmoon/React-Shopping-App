import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
