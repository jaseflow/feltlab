import Image from 'next/image';
import Link from 'next/link'

import styles from '../styles/Layout.module.css'

export default function Layout({ children } : any) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/">
            <a>
              <Image src="/feltlab.svg" alt="Feltlab" width={165} height={26} />
            </a>
          </Link>
          <nav>
            <ul className={styles.nav}>
              <li>
                <Link href="/about">
                  <a className={styles.link}>
                    About me
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className={styles.link}>Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/?contacting=true" className="btn">Get in touch</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

