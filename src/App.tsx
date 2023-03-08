import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { Main } from './components/Main';
import styles from './App.module.css';

export function App() {
    return (
        <div className={styles.app}>
            <Logo />
            <main className={styles.content}>
                <Main />
            </main>
            <Footer />
        </div>
    );
}
