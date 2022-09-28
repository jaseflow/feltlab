import { useRef } from 'react';
import styles from '../styles/Cover.module.css';

interface CoverProps {
  name: string;
  logoWidth: number;
  logoHeight: number;
  logoImgUrl: string;
  screenImgUrl: string;
  bgColor: string;
  covered?: boolean;
}

const Cover = ({ name, bgColor, logoImgUrl, screenImgUrl, logoWidth, logoHeight, covered } : CoverProps) => {

  return (
    <div className={`${styles.cover} ${covered ? styles.covered : undefined}`} style={{ background: bgColor }} draggable={false}>
      <div className={styles.logo}>
        <img src={logoImgUrl} alt={name} draggable={false} width={logoWidth} height={logoHeight} />
      </div>
      <img src={screenImgUrl} draggable={false} width={381.02} height={557.22} className={styles.screen} />
    </div>
  )
}

export default Cover
