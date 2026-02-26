import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL' | 'onError'> {
  src: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

// A simple, dark, blurred data URL to use as a placeholder while the real image or fallback loads
const defaultBlurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

export default function SafeImage({
  src,
  fallbackSrc = '/images/fallback_image.webp', // We will generate this
  alt,
  className,
  containerClassName,
  ...rest
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`}>
      <Image
        {...rest}
        src={imgSrc}
        alt={alt || 'Image'}
        className={`transition-opacity duration-300 ${
          hasError ? 'opacity-80 grayscale' : 'opacity-100'
        } ${className || ''}`}
        placeholder="blur"
        blurDataURL={defaultBlurDataURL}
        onError={() => {
          if (!hasError) {
            setImgSrc(fallbackSrc);
            setHasError(true);
          }
        }}
      />
    </div>
  );
}
