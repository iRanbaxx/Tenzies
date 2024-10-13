import { useCallback, useEffect, useState } from 'react';

export const useTimer = () => {
  // State variables
  const [timer, setTimer] = useState(0); // Game timer in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  // Function to start the timer
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  // Function to stop the timer
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTimer(0);
  }, [stopTimer]);

  // Effect to update timer every second when running
  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return { timer, isRunning, startTimer, stopTimer, resetTimer };
};
