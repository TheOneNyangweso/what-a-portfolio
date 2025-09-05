import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px -15px var(--green);
    }
  }

  /* Animated decorative elements */
  .hero-decoration {
    position: absolute;
    top: 20%;
    right: 10%;
    opacity: 0.1;
    z-index: -1;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .typing-cursor {
    opacity: 1;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .ml-pipeline {
    position: absolute;
    top: 30%;
    right: 5%;
    opacity: 0.08;
    z-index: -1;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const MLPipelineVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .pipeline-step {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 12px;
  }

  .step-icon {
    width: 20px;
    height: 20px;
    border: 1px solid var(--green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .connection-line {
    width: 2px;
    height: 15px;
    background: var(--green);
    margin-left: 9px;
    opacity: 0.5;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const decorationRef = useRef(null);
  const pipelineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion && isMounted) {
      // Animate decorative laptop icon
      anime({
        targets: decorationRef.current,
        scale: [0, 1],
        rotate: [0, 360],
        opacity: [0, 0.1],
        duration: 2000,
        delay: 3000,
        easing: 'easeOutElastic(1, .8)',
      });

      // Animate ML pipeline visualization
      anime({
        targets: '.pipeline-step',
        translateX: [-30, 0],
        opacity: [0, 0.8],
        delay: anime.stagger(300, { start: 4000 }),
        duration: 800,
        easing: 'easeOutQuart',
      });

      // Floating animation for decorative elements
      anime({
        targets: decorationRef.current,
        translateY: [-10, 10],
        rotate: [0, 5],
        duration: 4000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: 5000,
      });

      // Button hover enhancement
      const button = document.querySelector('.email-link');
      if (button) {
        const handleMouseEnter = () => {
          anime({
            targets: button,
            scale: 1.05,
            duration: 200,
            easing: 'easeOutQuart',
          });
        };

        const handleMouseLeave = () => {
          anime({
            targets: button,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuart',
          });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mouseenter', handleMouseEnter);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }
  }, [isMounted, prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Sammy Moruri.</h2>;
  const three = (
    <h3 className="big-heading">I build intelligent systems and scalable web solutions.</h3>
  );
  const four = (
    <>
      <p>
        I'm a versatile MLOps engineer and Full Stack developer specializing in machine learning
        pipelines, data engineering, and backend systems. Currently, I'm focused on designing and
        deploying cutting-edge ML models and scalable backend services at{' '}
        <a href="https://digitalqatalyst.com/" target="_blank" rel="noreferrer">
          DigitalQatalyst
        </a>
        , where I transform complex data into valuable business insights.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="#contact"
      onClick={e => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection ref={heroRef}>
      {/* Decorative laptop icon */}
      <div className="hero-decoration" ref={decorationRef}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <rect
            x="10"
            y="10"
            width="100"
            height="60"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect x="15" y="15" width="90" height="45" fill="currentColor" opacity="0.1" />
          <rect x="20" y="65" width="80" height="8" rx="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="69" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* ML Pipeline Visualization */}
      <div className="ml-pipeline" ref={pipelineRef}>
        <MLPipelineVisual>
          <div className="pipeline-step">
            <div className="step-icon">📊</div>
            <span>Data Collection</span>
          </div>
          <div className="connection-line"></div>
          <div className="pipeline-step">
            <div className="step-icon">🔧</div>
            <span>Data Processing</span>
          </div>
          <div className="connection-line"></div>
          <div className="pipeline-step">
            <div className="step-icon">🤖</div>
            <span>Model Training</span>
          </div>
          <div className="connection-line"></div>
          <div className="pipeline-step">
            <div className="step-icon">🚀</div>
            <span>Deployment</span>
          </div>
        </MLPipelineVisual>
      </div>

      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
