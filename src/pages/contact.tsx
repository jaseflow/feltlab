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
      <h1>Contact us</h1>
    </div>
  )
}

export default Contact
