// src/components/Timer.tsx
import React from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';

const Timer: React.FC = () => {
  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Happy Birthday, Oona!</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  const birthday = new Date('2024-06-21T00:00:00+03:00').getTime();

  return <Countdown date={birthday} renderer={renderer} />;
};

export default Timer;
