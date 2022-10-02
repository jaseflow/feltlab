import { useState, useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';

import { AppContext } from '../context';

import styles from '../styles/App.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  const [contacting, setContacting] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactingClass = contacting ? styles.contacting : '';

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);

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
    <AppContext.Provider value={{ loading, setLoading }}>
      <div className={`${styles.wrapper} ${contactingClass}`}>
        <header className={styles.header}>
          <div className={`container ${styles.headerContainer}`}>
            <Link href="/">
              <a className={styles.logo}>
                <Image src="/feltlab.svg" alt="Feltlab" width={165} height={26} />
              </a>
            </Link>
            <nav>
              <ul className={styles.nav}>
                <li>
                  <Link href="/about">
                    <a className={styles.link}>
                      About us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    <a className={styles.link}>Work</a>
                  </Link>
                </li>
                { !isHome &&
                  <li>
                    <Link href="/contact"><a className="btn">Get in touch</a></Link>
                  </li>
                }
              </ul>
            </nav>
          </div>
        </header>
        <section className={styles.body}>
          <div className="container">
            <Component {...pageProps} onContact={() => setContacting(true)} />
          </div>
        </section>
        <div className={styles.glow}></div>
      </div>
    </AppContext.Provider>
  )
}

export default MyApp
