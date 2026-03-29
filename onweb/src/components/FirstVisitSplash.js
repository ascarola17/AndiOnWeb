import React, { useEffect, useState } from 'react';
import './FirstVisitSplash.css';

const STORAGE_KEY = 'andi_portfolio_splash_seen';
const MAX_MS = 1500;

function shouldShowSplash() {
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

/**
 * First visit per browser session: bubble overlay up to 1.5s, hides on window load or timeout (whichever first).
 */
const FirstVisitSplash = () => {
  const [visible, setVisible] = useState(shouldShowSplash);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setExiting(true);
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
          /* ignore */
        }
        setVisible(false);
      }, 450);
    };

    const tid = window.setTimeout(() => finish(), MAX_MS);
    if (document.readyState === 'complete') {
      window.clearTimeout(tid);
      finish();
      return undefined;
    }

    const onLoad = () => {
      window.clearTimeout(tid);
      finish();
    };
    window.addEventListener('load', onLoad, { once: true });
    return () => {
      window.clearTimeout(tid);
      window.removeEventListener('load', onLoad);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`first-visit-splash${exiting ? ' first-visit-splash--out' : ''}`}
      aria-hidden="true"
    >
      <div className="first-visit-splash-bubbles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="first-visit-splash-bubble" style={{ '--i': i }} />
        ))}
      </div>
      <p className="first-visit-splash-label">Loading Bikini Bottom…</p>
    </div>
  );
};

export default FirstVisitSplash;
