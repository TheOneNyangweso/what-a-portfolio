import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email, secondaryEmail } from '@config';
import { Side } from '@components';

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .emails-container {
    display: flex;
    gap: 5px;
    margin: 20px auto;
    align-items: flex-end;

    @media (max-width: 1200px) {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }

  .single-email {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    a {
      padding: 10px;
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: var(--fz-lg);
      letter-spacing: 0.1em;
      writing-mode: vertical-rl;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }
    }
  }

  .single-email::after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  @media (max-width: 1200px) {
    .single-email:first-child::after {
      display: none;
    }
  }
`;

const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <div className="emails-container">
        <div className="single-email">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div className="single-email">
          <a href={`mailto:${secondaryEmail}`}>{secondaryEmail}</a>
        </div>
      </div>
    </StyledLinkWrapper>
  </Side>
);

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;
