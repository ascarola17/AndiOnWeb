// Image optimization utilities

// Generate responsive image sources for different screen sizes
export const getResponsiveImageSrc = (baseSrc, width) => {
  // For now, return the base src
  // In production, you could use a service like Cloudinary or ImageKit
  // to generate different sizes: baseSrc?w=300, baseSrc?w=600, etc.
  return baseSrc;
};

// Generate WebP version if supported
export const getOptimizedImageSrc = (src) => {
  // For now, return original src
  // In production, you could check WebP support and return WebP version
  return src;
};

// Preload critical images
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Preload multiple images
export const preloadImages = (srcs) => {
  srcs.forEach(src => preloadImage(src));
};

// Get image dimensions for proper aspect ratio
export const getImageDimensions = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    img.src = src;
  });
};
