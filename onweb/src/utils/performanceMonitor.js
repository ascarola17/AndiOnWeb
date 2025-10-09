// Performance monitoring utilities

export const measureImageLoadTime = (imageSrc) => {
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log(`🖼️ Image loaded: ${imageSrc} in ${loadTime.toFixed(2)}ms`);
      resolve(loadTime);
    };
    img.onerror = () => {
      console.error(`❌ Failed to load image: ${imageSrc}`);
      resolve(null);
    };
    img.src = imageSrc;
  });
};

export const measurePageLoadTime = () => {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`📊 Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Log Core Web Vitals
    if ('web-vitals' in window) {
      // This would be available if you install web-vitals package
      console.log('📈 Core Web Vitals available');
    }
  });
};

export const logImagePerformance = () => {
  // Monitor all images on the page
  const images = document.querySelectorAll('img');
  console.log(`📊 Total images on page: ${images.length}`);
  
  images.forEach((img, index) => {
    if (img.complete) {
      console.log(`✅ Image ${index + 1} already loaded: ${img.src}`);
    } else {
      img.addEventListener('load', () => {
        console.log(`✅ Image ${index + 1} loaded: ${img.src}`);
      });
    }
  });
};
