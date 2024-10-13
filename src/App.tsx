import { useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Die from './components/Die.tsx';
import { useGameLogic } from './hooks/useGameLogic.ts';
import { useTimer } from './hooks/useTimer.ts';
import './App.css';

const App = () => {
  // Custom hooks for game logic and timer
  const { dice, tenzies, rollDice, holdDice, rollCount } = useGameLogic();
  const {
    timer,
    isRunning,
    bestTime,
    bestRolls,
    startTimer,
    stopTimer,
    resetTimer,
    updateBestScore,
  } = useTimer();
  const { width, height } = useWindowSize();

  // Handle roll button click
  const handleRollClick = () => {
    if (tenzies) {
      resetTimer();
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

  // Stop timer and update best score when game is won
  useEffect(() => {
    if (tenzies) {
      stopTimer();
      updateBestScore(rollCount);
    }
  }, [tenzies, stopTimer, updateBestScore, rollCount]);

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
        <div className="stats-container">
          <div className="best-rolls">
            Best Rolls: {bestRolls === Infinity ? '-' : bestRolls}
          </div>
          <div className="best-time">
            Best Time: {bestTime === Infinity ? '-' : `${bestTime}s`}
          </div>
          <div className="stats-separator"></div>
          <div className="current-rolls">Current Rolls: {rollCount}</div>
          <div className="current-time">Current Time: {timer}s</div>
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
