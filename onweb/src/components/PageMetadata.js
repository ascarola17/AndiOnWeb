import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ORIGIN, PAGES } from '../data/pageMetadata.mjs';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = PAGES[pathname] || ['Page not found | Andi Scarola', 'Explore Andi Scarola’s portfolio.'];
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', `${ORIGIN}${pathname}`],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${ORIGIN}${pathname === '/' ? '/' : pathname}`);
  }, [pathname]);
  return null;
}
