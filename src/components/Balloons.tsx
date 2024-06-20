// src/components/Balloons.tsx
import React from 'react';
import './Balloons.css';

const Balloons: React.FC = () => {
  const greenBalloons = [];
  const pinkBalloons = [];

  for (let i = 0; i < 8; i++) {
    greenBalloons.push(
      <div key={`green-${i}`} className={`balloon green`}>
        <div className="ribbon"></div>
        <div className="string"></div>
      </div>
    );
    pinkBalloons.push(
      <div key={`pink-${i}`} className={`balloon pink`}>
        <div className="ribbon"></div>
        <div className="string"></div>
      </div>
    );
  }

  return (
    <>
      <div className="balloon-line green-line">
        {greenBalloons.map((balloon, index) => (
          <div key={`green-${index}`} className="balloon-wrapper">
            {balloon}
            <div className="line"></div>
          </div>
        ))}
      </div>
      <div className="balloon-line pink-line">
        {pinkBalloons.map((balloon, index) => (
          <div key={`pink-${index}`} className="balloon-wrapper">
            {balloon}
            <div className="line"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Balloons;
