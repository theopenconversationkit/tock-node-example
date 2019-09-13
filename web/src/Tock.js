import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as TockLogo } from './logo.svg';
import GitHubButton from 'react-github-btn';

const Header = styled.header`
  background: white;
  width: 100%;
  padding: 1em;
  margin-bottom: 3em;
  text-align: center;
  box-shadow: 0em 2em 0.8em white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction || 'row'};
`;

const Menu = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 1em 0;
`;

const TockLogoContainer = styled.div`
  width: ${({ large }) => (large ? '20em' : '4em')};
  height: ${({ large }) => (large ? '20em' : '4em')};
  transition: all 0.25s ease-in-out;
`;

const Title = styled.h1`
  margin: 0.25em 1em;
`;

export default function Tock({ fullScreen }) {
  return (
    <Header direction={fullScreen ? 'column' : 'row'}>
      <TockLogoContainer large={fullScreen}>
        <TockLogo />
      </TockLogoContainer>
      <Menu>
        <Title>Tock JavaScript Example</Title>
        <GitHubButton
          href="https://github.com/voyages-sncf-technologies/tock"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star voyages-sncf-technologies/tock on GitHub"
        >
          Star
        </GitHubButton>
      </Menu>
    </Header>
  );
}
