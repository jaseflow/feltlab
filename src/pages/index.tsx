import { useContext } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { AppContext } from '../context';

import FolioScroll from '../components/folio-scroll';

const Home: NextPage = ({ projects } : any) => {

  const { loading, setLoading } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>FELTLAB</title>
        <meta name="description" content="Feltlab" />
      </Head>
      <div className={`${styles.body} ${loading ? styles.bodyLoading : ''}`}>
        <h1 className={`title ${styles.title}`}>Build something special.</h1>
        <ul className={styles.skills}>
          <li>Product strategy</li>
          <li>UI Design and prototyping</li>
          <li>Web and mobile development</li>
        </ul>
        <nav className={styles.actions}>
          <Link href="/contact"><a className="btn btn--large">Get started</a></Link>
          <Link href="/how-we-can-help"><a className="btn btn--large btn--secondary">See how we can help</a></Link>
        </nav>
      </div>
      <FolioScroll fadeAway={loading} projects={projects} />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'posts', 'projects'))

  const filteredFiles = files.filter(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('src', 'posts', 'projects', filename)) as any;
    const { data: frontMatter } = matter(markdownWithMeta);

    if (frontMatter.includeInFolioScroll) {
      return true;
    } else {
      return false;
    }
  })

  const projects = filteredFiles.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('src', 'posts', 'projects', filename)) as any;
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }

  })

  return {
    props: {
      projects
    }
  }
}
