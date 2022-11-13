import { useContext, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Slug.module.css'
import { AppContext } from '../../context';

import Cover from '../../components/cover';
import Thumb from '../../components/thumb';
import Image from '../../components/image';
import BrowserCarousel from '../../components/browser-carousel';
import GalleryScroll from '../../components/gallery-scroll';
import ProjectHero from '../../components/project-hero';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Project: NextPage = ({ thumbs, frontMatter, mdxSource }: any) => {

  const { loading, setHasDarkLogo } = useContext(AppContext);

  function handleThumbClick(e: any) {
    e.preventDefault();
    window.scrollTo(0,0);
  };

  const thumbsList = thumbs.map((t: any) => {
    return (
      <Link href={`/projects/${t.slug}`} key={`thumb-${t.slug}}`} onClick={handleThumbClick}>
        <div className={styles.thumb}>
          <Thumb
            name={t.title}
            bgColor={t.coverBackgroundColor}
            logoImgUrl={t.coverIconUrl}
          />
        </div>
      </Link>
    )
  });

  const components = {
    Image: Image,
    Carousel: Carousel,
    BrowserCarousel,
    GalleryScroll,
  }

  useEffect(() => {
    if (frontMatter.hasLightHero) {
      setHasDarkLogo(true);
    } else {
      setHasDarkLogo(false);
    }
  }, [setHasDarkLogo, frontMatter])

  useEffect(() => {
  }, [])

  return (
    <div className={styles.slug}>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.grid}>
        <div className={styles.hero}>
          <ProjectHero
            name={frontMatter.title}
            bgColor={frontMatter.coverBackgroundColor}
            logoWidth={frontMatter.coverLogoWidth}
            logoHeight={frontMatter.coverLogoHeight}
            screenImgUrl={frontMatter.coverScreenshotUrl}
            logoImgUrl={frontMatter.coverLogoUrl}
            />
        </div>
        <div className={`${styles.cover} ${loading ? styles.coverLoading : ''}`}>
          <Cover
            covered={true}
            name={frontMatter.title}
            fixedHeight={true}
            logoWidth={frontMatter.coverLogoWidth}
            logoHeight={frontMatter.coverLogoHeight}
            screenImgUrl={frontMatter.coverScreenshotUrl}
            logoImgUrl={frontMatter.coverLogoUrl}
            bgColor={frontMatter.coverBackgroundColor}
          />
        </div>
        <div className={`${styles.body} ${loading ? styles.bodyLoading : ''}`}>
          <h1 className={styles.title}>{frontMatter.title}</h1>
          <div className={styles.post}>
            <p className={styles.description}>{frontMatter.description}</p>
            {frontMatter.heroImageUrl &&
              <div className="browser">
                <Image src={frontMatter.heroImageUrl} alt="Beachside Bargains" width="1440" height="900" />
              </div>
            }
            {frontMatter.previewLink && 
              (
                <p>
                  <a
                    className={`btn btn--block btn--secondary ${styles.cta}`}
                    href={frontMatter.previewLink}
                    target="_blank"
                    rel="noreferrer">
                    Visit {frontMatter.title}
                  </a>
                </p>
              )
            }
            <MDXRemote {...mdxSource} components={components}/>
          </div>
          <div className={`show-mobile ${styles.mobileCta}`}>
            <button className="btn btn--block">Get in touch</button>
          </div>
          <h4>Other projects</h4>
          <div className={styles.thumbs}>
            {thumbsList}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Project;

export const getStaticPaths = () => {
  const files = fs.readdirSync(path.join('src', 'posts', 'projects'));

  const paths = files.map(filename => {
    return {
      params: {
        slug: filename.split('.')[0]
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } } : any) => {

  const files = fs.readdirSync(path.join('src', 'posts', 'projects'))

  const slugs = files.map(f => f.split('.')[0]);

  const markdownWithMeta = fs.readFileSync(path.join('src', 'posts', 'projects', `${slug}.mdx`))

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);


  const thumbs = slugs.filter(s => s !== slug).map((s: any) => {

    const markdownWithMeta = fs.readFileSync(path.join('src', 'posts', 'projects', `${s}.mdx`))

    const { data: thumbFrontMatter } = matter(markdownWithMeta);

    return {slug: s, ...thumbFrontMatter}

  }).filter((t: any) => t.coverIconUrl);

  return {
    props: {
      thumbs,
      frontMatter,
      slug,
      mdxSource,
    }
  }

}
