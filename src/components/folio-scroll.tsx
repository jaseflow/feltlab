import { useState, useRef } from 'react';
import styles from '../styles/FolioScroll.module.css';
import Link from 'next/link'

import Cover from './cover';

interface FolioScrollProps {
  projects: any[];
  fadeAway?: boolean;
}

const FolioScroll = ({ projects, fadeAway } : FolioScrollProps) => {

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
      <div className={`${styles.folio} ${fadeAway ? styles.fadeAway : ''}`}>
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
              <li key={i} className={styles.folioItem}>
                <Link href={`/projects/${slug}`}>
                  <a draggable={false} className={styles.folioLink}>
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
  )
}

export default FolioScroll
