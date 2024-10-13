import { useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import Die from './components/Die.tsx';
import { useGameLogic } from './hooks/useGameLogic.ts';
import { useTimer } from './hooks/useTimer.ts';
import './App.css';

const App = () => {
  // Custom hooks for game logic and timer
  const { dice, tenzies, rollDice, holdDice } = useGameLogic();
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  // Handle roll button click
  const handleRollClick = () => {
    if (tenzies) {
      resetTimer();
    } else if (!isRunning) {
      startTimer();
    }
    rollDice();
  };

  // Handle die click for holding
  const handleHoldDice = (id: string) => {
    if (!isRunning) {
      startTimer();
    }
    holdDice(id);
  };

  // Stop timer when game is won
  useEffect(() => {
    if (tenzies) {
      stopTimer();
    }
  }, [tenzies, stopTimer]);

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
            <Die
              key={die.id}
              {...die}
              holdDice={() => handleHoldDice(die.id)}
            />
          ))}
        </div>
        <button onClick={handleRollClick} className="roll-dice-button">
          {tenzies ? 'Reset' : 'Roll'}
        </button>
      </div>
    </main>
  );
};

export default App;
