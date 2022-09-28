import { useState, useRef } from 'react';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Cover from '../components/cover';

const Home: NextPage = ({ projects } : any) => {

  const scrollRef = useRef<HTMLElement>(null) as any;

  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  function startDrag(e: any) {
    setMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }

  function stopDrag(e: any) {
    setMouseDown(false);
  }

  function handleMouseMove(e: any) {
    e.preventDefault();
    if(!mouseDown) { return; }
    const x = e.pageX - scrollRef.current.offsetLeft;
    const scroll = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - scroll;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>FELTLAB</title>
        <meta name="description" content="Feltlab" />
      </Head>
      <div className={styles.body}>
        <h1 className={`title ${styles.title}`}>Dream, design, and develop with Feltlab</h1>
        <ul className={styles.skills}>
          <li>Product strategy</li>
          <li>UI Design and Prototyping</li>
          <li>Web and mobile development</li>
        </ul>
        <nav className={styles.actions}>
          <Link href="/contact"><a className="btn btn--large">Get in touch</a></Link>
          <Link href="/contact"><a className="btn btn--large btn--secondary">See what we do</a></Link>
        </nav>
      </div>
      <div className={styles.glow}></div>
      <div className={styles.folio}>
        <ol
          className={styles.folioScroll}
          onMouseMove={handleMouseMove}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          ref={scrollRef}
        >
          {projects?.map(({ frontMatter, slug } : any, i: number) => {
            return (
              <li key={i}>
                <Link href={`/projects/${slug}`}>
                  <a draggable={false}>
                    <Cover
                      name={frontMatter.title}
                      logoWidth={frontMatter.coverLogoWidth}
                      logoHeight={frontMatter.coverLogoHeight}
                      screenImgUrl={frontMatter.coverScreenshotUrl}
                      logoImgUrl={frontMatter.coverLogoUrl}
                      bgColor={frontMatter.coverBackgroundColor}
                    />
                  </a>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'posts', 'projects'))

  const projects = files.map(filename => {
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
