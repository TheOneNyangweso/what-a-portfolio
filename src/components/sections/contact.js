import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email, secondaryEmail } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-links {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};

    &.secondary {
      background-color: transparent;
      border: 1px solid var(--green);

      &:hover {
        background-color: var(--green-tint);
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        My inbox is always open! Whether you're interested in discussing new opportunities, have a
        project in mind, want to collaborate on something exciting, or just want to connect and chat
        about tech, I'd love to hear from you. I'll do my best to get back to you quickly.
      </p>

      <div className="email-links">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
        <a className="email-link secondary" href={`mailto:${secondaryEmail}`}>
          Dev Email
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
