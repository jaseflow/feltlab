import Image from 'next/image';
import styles from '../styles/Cover.module.css';

interface CoverProps {
  name: string;
  logoWidth: number;
  logoHeight: number;
  logoImgUrl: string;
  screenImgUrl: string;
  bgColor: string;
  covered?: boolean;
  fixedHeight?: boolean;
}

const Cover = ({ name, bgColor, logoImgUrl, screenImgUrl, logoWidth, logoHeight, covered, fixedHeight } : CoverProps) => {

  return (
    <div className={`
      ${styles.cover}
      ${covered ? styles.covered : undefined}
      ${fixedHeight ? styles.fixedHeight : undefined}
      `} style={{ background: bgColor }} draggable={false}>
      <div className={styles.logo}>
        <Image src={logoImgUrl} alt={name} draggable={false} width={logoWidth} height={logoHeight} />
      </div>
      <div className={styles.screen}>
        <Image src={screenImgUrl} alt={name} draggable={false} width={200} height={411} />
      </div>
    </div>
  )
}

export default Cover
