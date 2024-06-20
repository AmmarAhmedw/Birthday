// src/components/Confetti.tsx
import React from 'react';
import ReactConfetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';

const Confetti: React.FC = () => {
  const [width, height] = useWindowSize();
  return <ReactConfetti width={width} height={height} />;
};

export default Confetti;
