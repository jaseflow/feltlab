import Image from 'next/image';
import styles from '../styles/Thumb.module.css';

interface ThumbProps {
  name: string;
  logoImgUrl: string;
  bgColor: string;
}

const Thumb = ({ name, bgColor, logoImgUrl } : ThumbProps) => {

  return (
    <div
      className={styles.thumb}
      style={{ background: bgColor }}
      draggable={false}
    >
      <Image layout="fill" src={logoImgUrl} alt={name} draggable={false} />
    </div>
  )
}

export default Thumb
