import Image from 'next/image';
import styles from '../styles/Logo.module.css';

interface LogoProps {
  isDark?: boolean;
}

const Logo = ({ isDark } : LogoProps) => {

  return (
    <div className={styles.logo}>
      <div className={`${styles.logoWrapper} ${isDark ? styles.logoDark : ''}`}>
        <div className={styles.logoVersion}>
          <Image width={125} height={20} src="/feltlab.svg" alt="Feltlab" draggable={false}/>
        </div>
        <div className={styles.logoVersion}>
          <Image width={125} height={20} src="/feltlab-dark.svg" alt="Feltlab" draggable={false} />
        </div>
      </div>
    </div>
  )
}

export default Logo
