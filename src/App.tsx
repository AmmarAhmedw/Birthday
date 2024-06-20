// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from './components/Confetti';
import { useSpring, animated } from 'react-spring';
import Balloons from './components/Balloons';

const App: React.FC = () => {
  // Animations
  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 } });

  const targetDate = new Date('2024-06-21T00:00:00+03:00').getTime();

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [advice, setAdvice] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        setShowConfetti(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchNewAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        const newAdvice = data.slip.advice;
        setAdvice(newAdvice);
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
      });
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <Balloons />
      <animated.div style={fade}>
        {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
          <span>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        ) : (
          <>
            <h1 className="title">Happy Birthday, Oona!</h1>
            <p className="advice">{advice}</p>
            <button onClick={fetchNewAdvice}>Get New Advice</button>
          </>
        )}
      </animated.div>
    </div>
  );
};


/*<h1>asdasdasdas</h1>*/

export default App;
