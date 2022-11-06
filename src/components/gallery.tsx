interface GalleryProps {
  children: React.ReactNode;
}

const Gallery = ({ children } : GalleryProps) => {

  return (
    <div className="Gallery">
      <div className="Gallery__scroll">
        {children}
      </div>
    </div>
  )
}

export default Gallery
