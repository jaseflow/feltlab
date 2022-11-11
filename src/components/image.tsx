import NextImage from "next/image"

type ImageProps = {
  src: any;
  alt: any;
  height: any;
  width: any;
}

const Image = ({ src, alt, height, width } : ImageProps) => {
  const imageProps = {
    src,
    alt,
    height,
    width,
  }
  return <NextImage {...imageProps} layout="responsive" />
}

export default Image
