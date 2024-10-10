import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
import Die from './components/Die.tsx';
import { Dice } from './types';
import './App.css';

const App = () => {
  // Function to generate a new die with random value
  const generateNewDie = useCallback(
    (): Dice => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }),
    []
  );

  // Function to generate an array of 10 new dice
  const allNewDice = useCallback(
    () => Array.from({ length: 10 }, generateNewDie),
    [generateNewDie]
  );

  // State variables
  const [dice, setDice] = useState<Dice[]>(allNewDice()); // Array of dice
  const [tenzies, setTenzies] = useState(false); // Game win state
  const [timer, setTimer] = useState(0); // Game timer in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [timerInterval, setTimerInterval] = useState(0); // Timer interval state

  // Function to start the timer
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(interval);
    }
  }, [isRunning]);

  // Function to stop the timer
  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(0);
    }
  }, [timerInterval]);

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTimer(0);
  }, [stopTimer]);

  // Function to roll the dice
  const rollDice = useCallback(() => {
    setDice(
      (prevDice) =>
        tenzies
          ? allNewDice() // If game is won, generate all new dice
          : prevDice.map((die) => (die.isHeld ? die : generateNewDie())) // Otherwise, only roll unheld dice
    );
    if (tenzies) {
      resetTimer();
      setIsRunning(false);
      setTenzies(false);
    }
  }, [tenzies, allNewDice, generateNewDie, resetTimer]);

  // Function to hold or release a die
  const holdDice = useCallback(
    (id: string) => {
      setDice((prevDice) => {
        const newDice = prevDice.map((die) =>
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        );
        if (!isRunning && newDice.some((die) => die.isHeld)) {
          startTimer(); // Start timer when first die is held
        }
        return newDice;
      });
    },
    [isRunning, startTimer]
  );

  // Effect to check for win condition
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    const winner = allHeld && allSameValue;
    setTenzies(winner);

    if (winner) stopTimer();
  }, [dice, stopTimer]);

  return (
    <main className="main-container">
      <div className="game-container">
        {tenzies && <ReactConfetti />} {/* Show confetti when game is won */}
        <h1 className="game-title">Tenzies</h1>
        <p className="game-info">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="timer">Time: {timer} seconds</div>
        <div className="dice-container">
          {dice.map((die) => (
            <Die key={die.id} {...die} holdDice={() => holdDice(die.id)} />
          ))}
        </div>
        <button onClick={rollDice} className="roll-dice-button">
          {tenzies ? 'Reset' : 'Roll'}
        </button>
      </div>
    </main>
  );
};

export default App;
