import { Carousel } from 'react-responsive-carousel';
import styles from '../styles/BrowserCarousel.module.css';

type BrowserCarouselProps = {
  children: any;
}

const BrowserCarousel = ({ children } : BrowserCarouselProps) => {
  return (
    <div className={`browser ${styles.wrapper}`}>
      <Carousel showThumbs={false} showStatus={false} showArrows={false}>
        {children}
      </Carousel>
    </div>
  )
}

export default BrowserCarousel
