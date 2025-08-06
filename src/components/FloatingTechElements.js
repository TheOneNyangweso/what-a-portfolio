import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';

const StyledFloatingElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;

  .floating-icon {
    position: absolute;
    opacity: 0.1;
    color: var(--green);
    font-size: 24px;
    pointer-events: none;
  }

  .laptop-icon {
    font-size: 32px;
    opacity: 0.08;
  }

  .code-icon {
    font-size: 20px;
    opacity: 0.06;
  }

  .data-icon {
    font-size: 28px;
    opacity: 0.05;
  }
`;

const FloatingTechElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create floating laptop icons
    const createFloatingElement = (icon, className, count = 3) => {
      for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.innerHTML = icon;
        element.className = `floating-icon ${className}`;
        element.style.left = `${Math.random() * 100  }%`;
        element.style.top = `${Math.random() * 100  }%`;
        containerRef.current.appendChild(element);
      }
    };

    // Tech icons (you can replace with actual SVGs or icon fonts)
    createFloatingElement('💻', 'laptop-icon', 4);
    createFloatingElement('⚡', 'code-icon', 6);
    createFloatingElement('🔗', 'data-icon', 5);
    createFloatingElement('🧠', 'ai-icon', 3);

    // Animate floating elements
    anime({
      targets: '.floating-icon',
      translateY: [
        { value: -20, duration: 3000 },
        { value: 20, duration: 3000 },
      ],
      translateX: [
        { value: -10, duration: 4000 },
        { value: 10, duration: 4000 },
      ],
      rotate: [
        { value: -5, duration: 2000 },
        { value: 5, duration: 2000 },
      ],
      scale: [
        { value: 0.8, duration: 2500 },
        { value: 1.2, duration: 2500 },
      ],
      opacity: [
        { value: 0.05, duration: 3000 },
        { value: 0.15, duration: 3000 },
      ],
      delay: anime.stagger(200),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    });

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <StyledFloatingElements ref={containerRef} />;
};

export default FloatingTechElements;
