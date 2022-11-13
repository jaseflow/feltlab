import { useContext, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { AppContext } from '../context';

import Cover from '../components/cover';
import FolioScroll from '../components/folio-scroll';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home: NextPage = ({ projects } : any) => {

  const { loading, setHasDarkLogo } = useContext(AppContext);
  
  const projectList = projects.map(({ frontMatter, slug } : any) => {
    return (
      <Link href={`/projects/${slug}`} key={`project-${slug}`}>
        <div>
          <Cover
            hasGutters={true}
            name={frontMatter.title}
            logoWidth={frontMatter.coverLogoWidth}
            logoHeight={frontMatter.coverLogoHeight}
            screenImgUrl={frontMatter.coverScreenshotUrl}
            logoImgUrl={frontMatter.coverLogoUrl}
            bgColor={frontMatter.coverBackgroundColor}
          />
        </div>
      </Link>
    )
  });

  const carouselProps= {
    showArrows: false,
    showThumbs: false,
    showIndicators: false,
    showStatus: false,
    emulateTouch: true,
    centerMode: true,
  }

  useEffect(() => {
    setHasDarkLogo(false);
  }, [setHasDarkLogo])

  return (
    <div className={styles.container}>
      <Head>
        <title>FELTLAB</title>
        <meta name="description" content="Feltlab" />
      </Head>
      <div className={`${styles.body} ${loading ? styles.bodyLoading : ''}`}>
        <h1 className={`title ${styles.title}`}><span>Build</span> <span>something</span> <span>special</span></h1>
        <ul className={styles.skills}>
          <li>Product strategy</li>
          <li>UI Design and prototyping</li>
          <li>Web and mobile development</li>
        </ul>
        <nav className={styles.actions}>
          <Link href="/contact"><a className="btn btn--large">Work with us</a></Link>
        </nav>
      </div>
      <div className={styles.carousel}>
        <Carousel {...carouselProps}>
          {projectList}
        </Carousel>
      </div>
      <div className={styles.folio}>
        <FolioScroll fadeAway={loading} projects={projects} />
      </div>
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
