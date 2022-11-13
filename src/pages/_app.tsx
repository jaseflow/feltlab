import { useState, useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Link from 'next/link'
import { useRouter } from 'next/router';

import { AppContext } from '../context';

import Logo from '../components/logo';
import ContactForm from '../components/contact-form';

import styles from '../styles/App.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/' || router.pathname === '/contact';

  const [contacting, setContacting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasDarkLogo, setHasDarkLogo] = useState(false);

  const contactingClass = contacting ? styles.contacting : '';

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => setLoading(false), 500);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  })
  
  return (
    <AppContext.Provider value={{ loading, setLoading, hasDarkLogo, setHasDarkLogo, contacting, setContacting }}>
      <div className={`${styles.wrapper} ${contactingClass}`}>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <Link href="/">
              <a>
                <Logo isDark={hasDarkLogo} />
              </a>
            </Link>
            <nav className={isHome ? styles.navWrapHome :styles.navWrap}>
              <ul className={styles.nav}>
                <li>
                  <Link href="/about">
                    <a className="btn btn--clear">
                      About us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    <a className="btn btn--clear">
                      Work
                    </a>
                  </Link>
                </li>
                <li>
                  <button className="btn" onClick={() => setContacting(true)}>
                    Get in touch
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <section className={styles.body}>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </section>
        <div className={styles.glow}></div>
        <footer className={styles.footer}>
          © 2022 Feltlab
        </footer>
        <ContactForm open={contacting} onClose={() => setContacting(false)} />
      </div>
    </AppContext.Provider>
  )
}

export default MyApp
