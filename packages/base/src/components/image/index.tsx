import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImageProps {
  className?: string;
  alt?: string;
  src: string;
  notImage?: string;
  [key: string]: any;
}

const Image = (props: ImageProps) => {
  const {
    className = "",
    notImage = "default",
    alt = "",
    src,
    ...rest
  } = props;
  return (
    <LazyLoadImage
      src={src ? src : notImage}
      className={`max-w-full h-auto ${className}`}
      alt={alt}
      {...rest}
    />
  );
};
export default Image;
