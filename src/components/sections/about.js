import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      opacity: 0;
      transform: translateX(-20px);
      transition: all 0.3s ease;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
        transition: all 0.3s ease;
      }

      &:hover {
        color: var(--green);
        transform: translateX(5px);

        &:before {
          color: var(--white);
          transform: scale(1.2);
        }
      }

      &.animate-in {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }

  /* Add floating effect around image */
  .tech-orbit {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    pointer-events: none;

    .orbit-item {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--navy);
      border: 1px solid var(--green);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--green);
      opacity: 0;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const skillsRef = useRef(null);
  const imageRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Move functions to top level to avoid no-use-before-define
  const animateSkills = () => {
    const skillItems = document.querySelectorAll('.skills-list li');

    anime({
      targets: skillItems,
      translateX: [0, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutQuart',
      complete: () => {
        skillItems.forEach(item => item.classList.add('animate-in'));
      },
    });
  };

  const animateImageOrbit = () => {
    // Create orbiting tech icons around profile image
    const techIcons = ['💻', '🐍', '☁️', '⚡', '🔧', '📊'];
    const orbitContainer = document.querySelector('.tech-orbit');

    if (orbitContainer && !orbitContainer.hasChildNodes()) {
      techIcons.forEach((icon, index) => {
        const item = document.createElement('div');
        item.className = 'orbit-item';
        item.textContent = icon;

        const angle = (360 / techIcons.length) * index;
        const radius = 140;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        item.style.transform = `translate(${x}px, ${y}px)`;
        orbitContainer.appendChild(item);
      });

      // Animate orbit items appearing
      anime({
        targets: '.orbit-item',
        scale: [0, 1],
        opacity: [0, 0.6],
        delay: anime.stagger(200, { start: 500 }),
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
      });

      // Continuous rotation
      anime({
        targets: '.tech-orbit',
        rotate: 360,
        duration: 20000,
        loop: true,
        easing: 'linear',
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());

    // Animate skills when they come into view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkills();
            animateImageOrbit();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    'Python',
    'Machine Learning',
    'AWS Cloud',
    'JavaScript (ES6+)',
    'React',
    'Node.js',
    'SQL & NoSQL',
    'Docker',
    'Data Pipelines',
    'TensorFlow/PyTorch',
    'REST APIs',
    'Linux',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Sammy and I'm passionate about the convergence of machine learning
              and backend technologies. My journey in tech started with IT support at Kenya Law
              Courts, where troubleshooting complex systems sparked my fascination with how
              technology can solve real-world problems.
            </p>

            <p>
              Fast-forward to today, and I've had the privilege of working as an{' '}
              <a href="https://kenyalaw.org/" target="_blank" rel="noreferrer">
                IT Technician
              </a>
              , a{' '}
              <a href="https://datascience.co.ke/" target="_blank" rel="noreferrer">
                Data Collector
              </a>{' '}
              at DataScience Ltd, and a{' '}
              <a href="https://ramanatech.com/" target="_blank" rel="noreferrer">
                Machine Learning Engineer
              </a>{' '}
              at Ramana Tech School where I collaborated with a 5-member team to develop a versatile
              recommendation system. Currently, I'm focused on designing and deploying cutting-edge
              ML models and scalable backend services at{' '}
              <a href="https://digitalqatalyst.com/" target="_blank" rel="noreferrer">
                DigitalQatalyst
              </a>
              .
            </p>

            <p>
              My expertise spans the entire MLOps lifecycle — from data engineering and model
              development to deployment and monitoring in production environments. I'm particularly
              passionate about building scalable data pipelines and creating ML solutions that drive
              measurable business outcomes.
            </p>

            <p>Here are some technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list" ref={skillsRef}>
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic ref={imageRef}>
          <div className="tech-orbit"></div>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Sammy Moruri Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
