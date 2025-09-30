import React, { useEffect } from 'react';
import '../styles/BubbleTransition.css';

const BubbleTransition = ({ textId = 'pageText' }) => {
    useEffect(() => {
    const transition = document.getElementById('bubbleTransition');
    const text = document.getElementById(textId);

    // Prevent duplicate bubbles
    if (transition && transition.children.length === 0) {
      for (let i = 0; i < 1600; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'bubble';

        const size = Math.random() * 80 + 40; // 20–70px
        const left = Math.random() * 100;
        const bubbleDelay = Math.random() * 4;
        const baseSize = Math.random() * 50 + 20;
        const duration = 10 / baseSize + 1.5; // smaller bubbles = faster
        const bottom = Math.random() * -100;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.bottom = `${bottom}px`;
        bubble.style.animationDelay = `${bubbleDelay}s`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.top = `${Math.random() * 50 + 100}vh`; // 100–150vh (below screen)
        bubble.style.opacity = `${Math.random() * 0.5 + 0.4}`; // 0.4–0.9

        transition.appendChild(bubble);
      }
    }

    // Reveal main content after 4 seconds
setTimeout(() => {
  if (text) text.classList.remove('hidden-text');
}, 1000); // text appears slightly earlier

setTimeout(() => {
  if (transition) transition.classList.add('fade-out');
}, 1500); // bubbles fade slightly after

}, [textId]);
return <div className="bubble-transition" id="bubbleTransition"></div>;
};

export default BubbleTransition;