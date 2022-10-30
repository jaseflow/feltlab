import { useContext } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';

import { AppContext } from '../context';

const Contact: NextPage = () => {

  const { loading, setLoading } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>FELTLAB</title>
        <meta name="description" content="Feltlab" />
      </Head>
      <div className={styles.form}>
        <div>
          <label htmlFor="">Your Name</label>
          <input className="input" type="text" />
        </div>
        <div>
          <label htmlFor="">Your Company</label>
          <input className="input" type="text" />
        </div>
        <div>
          <label htmlFor="">How can we help?</label>
        </div>
      </div>
    </div>
  )
}

export default Contact
