import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  style = {},
  loading: loadingProp,
  fetchPriority,
  ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if ('loading' in HTMLImageElement.prototype) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const loadingAttr = loadingProp ?? 'lazy';

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={className}
      loading={loadingAttr}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out', ...style }}
      {...props}
    />
  );
};

export default LazyImage;
