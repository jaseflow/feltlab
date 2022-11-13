import Image from 'next/image';
import styles from '../styles/GalleryScroll.module.css';

type GalleryProps = {
  children: any;
}

const GalleryScroll = ({ children } : GalleryProps) => {

  console.log(children);

  const items = children.map(({ props } : any) => {
    return (
      <div className={styles.item}>
        <Image src={props.src} width={props.width} height={props.height} />
      </div>
    )
  })

  return (
    <div className={styles.gallery}>
      <div className={styles.wrapper}>
        <div className={styles.scroll}>
          {items}
        </div>
      </div>
    </div>
  )
}

export default GalleryScroll
