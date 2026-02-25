import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyImage – smart image component
 *
 * Props:
 *   src       {string}  Required. Main image source (PNG/JPG/etc.)
 *   webpSrc   {string}  Optional. WebP version of the image for modern browsers.
 *                       Generate WebP files by running: npm run optimize-images
 *   alt       {string}  Alt text
 *   className {string}  Class for the wrapper div
 *   eager     {boolean} If true, image loads immediately (use for above-the-fold).
 *                       Defaults to false (lazy load with IntersectionObserver).
 *   sizes     {string}  Optional. sizes attribute for responsive srcset.
 *   ...props  spread onto wrapper div
 */
const LazyImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  eager = false,
  sizes,
  ...props
}) => {
  const [isInView, setIsInView] = useState(eager); // eager images are always "in view"
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Skip observer for eager (above-the-fold) images
    if (eager) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Start loading 100px before image enters view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [eager]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.4s ease-in-out',
  };

  return (
    <div ref={imgRef} className={className} {...props}>
      {isInView && (
        webpSrc ? (
          // Use <picture> for WebP with original format fallback
          <picture>
            <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
            <img
              src={src}
              alt={alt}
              onLoad={handleLoad}
              loading={eager ? 'eager' : 'lazy'}
              decoding={eager ? 'sync' : 'async'}
              fetchPriority={eager ? 'high' : 'auto'}
              sizes={sizes}
              style={imgStyle}
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            loading={eager ? 'eager' : 'lazy'}
            decoding={eager ? 'sync' : 'async'}
            fetchPriority={eager ? 'high' : 'auto'}
            sizes={sizes}
            style={imgStyle}
          />
        )
      )}
    </div>
  );
};

export default LazyImage;
