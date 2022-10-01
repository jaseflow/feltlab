import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';

import styles from '../styles/App.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className={styles.wrapper}>
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
          <Component {...pageProps} />
        </div>
      </section>
      <div className={styles.glow}></div>
    </div>
  )
}

export default MyApp
