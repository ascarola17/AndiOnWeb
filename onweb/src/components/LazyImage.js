import React, { useState, useRef, useEffect } from 'react';

const supportsNativeLazy =
  typeof HTMLImageElement !== 'undefined' &&
  'loading' in HTMLImageElement.prototype;

const LazyImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  style = {},
  loading: loadingProp,
  fetchPriority,
  onError: onErrorProp,
  ...props
}) => {
  const loadingAttr = loadingProp ?? 'lazy';
  const wantsEager = loadingAttr === 'eager';

  const [isInView, setIsInView] = useState(() => wantsEager);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useRaster, setUseRaster] = useState(!webpSrc);
  const imgRef = useRef();

  useEffect(() => {
    setUseRaster(!webpSrc);
    setIsLoaded(false);
  }, [webpSrc, src]);

  useEffect(() => {
    if (wantsEager) {
      setIsInView(true);
      return;
    }
    if (supportsNativeLazy) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [wantsEager]);

  const primarySrc = useRaster ? src : webpSrc || src;
  const showSrc =
    wantsEager || supportsNativeLazy || isInView ? primarySrc : undefined;

  const handleError = (e) => {
    if (webpSrc && !useRaster) {
      setUseRaster(true);
      setIsLoaded(false);
      return;
    }
    onErrorProp?.(e);
  };

  return (
    <img
      ref={imgRef}
      src={showSrc}
      alt={alt}
      className={className}
      loading={loadingAttr}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease-in-out',
        ...style,
      }}
      {...props}
    />
  );
};

export default LazyImage;
