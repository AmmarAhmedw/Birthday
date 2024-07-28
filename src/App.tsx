import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from './components/Confetti';
import { useSpring, animated, SpringValue } from 'react-spring'; // Import necessary components from react-spring
import Balloons from './components/Balloons'; // Import the Balloons component

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {
  // Define animated style object with SpringValue
  const fade: { opacity: SpringValue<number> } = useSpring({ opacity: 1, config: { duration: 1000 } });

  const targetDate = new Date('2024-08-13T00:00:00+05:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate - new Date().getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [advice, setAdvice] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.values(newTimeLeft).every(value => value === 0)) {
        setShowConfetti(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchNewAdvice = (): void => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        const newAdvice: string = data.slip.advice;
        setAdvice(newAdvice);
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
      });
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <Balloons /> {/* Render the Balloons component here */}
      <animated.div style={fade}>
        {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
          <span>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        ) : (
          <>
            <h1 className="title">Happy Birthday Babe!</h1>
            <p className="advice">{advice}</p>
            <button onClick={fetchNewAdvice}>Get New Advice</button>
          </>
        )}
      </animated.div>
    </div>
  );
};

export default App;
