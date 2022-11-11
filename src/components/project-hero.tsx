import Image from 'next/image';
import styles from '../styles/ProjectHero.module.css';

interface ProjectHeroProps {
  name: string;
  logoWidth: number;
  logoHeight: number;
  logoImgUrl: string;
  screenImgUrl: string;
  bgColor: string;
}

const ProjectHero = ({ name, bgColor, logoImgUrl, screenImgUrl, logoWidth, logoHeight } : ProjectHeroProps) => {

  const gradient = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${bgColor} 75%)`;

  return (
    <header className={styles.wrapper} style={{ backgroundColor: bgColor}}>
      <div className={styles.screenshot}>
        <Image src={screenImgUrl} width={200} height={411} alt={`Screenshot of ${name}`} />
      </div>
      <div className={styles.footer} style={{ background: gradient}}>
        <Image src={logoImgUrl} width={logoWidth} height={logoHeight} alt={name} />
      </div>
    </header>
  )
}

export default ProjectHero
