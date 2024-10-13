import { useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Die from './components/Die.tsx';
import { useGameLogic } from './hooks/useGameLogic.ts';
import { useTimer } from './hooks/useTimer.ts';
import './App.css';

const App = () => {
  // Custom hooks for game logic and timer
  const { dice, tenzies, rollDice, holdDice } = useGameLogic();
  const {
    timer,
    isRunning,
    bestTime,
    startTimer,
    stopTimer,
    resetTimer,
    updateBestTime,
  } = useTimer();
  const { width, height } = useWindowSize();

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
    if (tenzies) return; // Don't allow changes when the game is won
    if (!isRunning) {
      startTimer();
    }
    holdDice(id);
  };

  // Stop timer and update best time when game is won
  useEffect(() => {
    if (tenzies) {
      stopTimer();
      updateBestTime();
    }
  }, [tenzies, stopTimer, updateBestTime]);

  return (
    <main className="main-container">
      {tenzies && (
        <div className="confetti-container">
          <ReactConfetti
            width={width}
            height={height}
            recycle={true}
            numberOfPieces={200}
          />
        </div>
      )}
      <div className="game-container">
        <h1 className="game-title">Tenzies</h1>
        <p className="game-info">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="time-container">
          <div className="best-time">
            Best: {bestTime === Infinity ? '-' : `${bestTime}s`}
          </div>
          <div className="timer">Time: {timer}s</div>
        </div>
        <div className="dice-container">
          {dice.map((die) => (
            <Die
              key={die.id}
              {...die}
              holdDice={() => handleHoldDice(die.id)}
              tenzies={tenzies}
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
