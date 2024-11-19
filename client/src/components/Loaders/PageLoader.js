// LoadingSpinner.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

const dashAnimation = keyframes`
  72.5% {
    opacity: 0;
  }

  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
    background:#f1eeee;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Svg = styled.svg`
  width: 64px;
  height: 48px;
`;

const Polyline = styled.polyline`
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const BackPolyline = styled(Polyline)`
  stroke: #ff4d5033;
`;

const FrontPolyline = styled(Polyline)`
  stroke: #f00;
  stroke-dasharray: 48, 144;
  stroke-dashoffset: 180;
  animation: ${dashAnimation} 2s linear infinite;
`;

const PageLoader = () => {
  return (
    <div data-testid="page-loader" >
      <Container>
        <Svg>
          <BackPolyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back" />
          <FrontPolyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front" />
        </Svg>
      </Container>
    </div>
  );
};

export default PageLoader;
