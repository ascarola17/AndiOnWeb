import React, { useState } from 'react';

// Let the browser display decoded images directly. A cached load event must
// never leave a successfully loaded photo hidden behind opacity: 0.
const LazyImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  style = {},
  loading: loadingProp = 'lazy',
  fetchPriority,
  onError: onErrorProp,
  ...props
}) => {
  const [failedWebp, setFailedWebp] = useState(null);
  const usingWebp = Boolean(webpSrc && failedWebp !== webpSrc);

  const handleError = (event) => {
    if (usingWebp) {
      setFailedWebp(webpSrc);
      return;
    }
    onErrorProp?.(event);
  };

  return (
    <img
      src={usingWebp ? webpSrc : src}
      alt={alt}
      className={className}
      loading={loadingProp}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={handleError}
      style={style}
      {...props}
    />
  );
};

export default LazyImage;
