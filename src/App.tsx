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

  // Function to roll the dice
  const rollDice = useCallback(() => {
    setDice(
      (prevDice) =>
        tenzies
          ? allNewDice() // If game is won, generate all new dice
          : prevDice.map((die) => (die.isHeld ? die : generateNewDie())) // Otherwise, only roll unheld dice
    );
    if (tenzies) setTenzies(false);
  }, [tenzies, allNewDice, generateNewDie]);

  // Function to hold or release a die
  const holdDice = useCallback((id: string) => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }, []);

  // Effect to check for win condition
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    setTenzies(allHeld && allSameValue);
  }, [dice]);

  return (
    <main className="main-container">
      <div className="game-container">
        {tenzies && <ReactConfetti />} {/* Show confetti when game is won */}
        <h1 className="game-title">Tenzies</h1>
        <p className="game-info">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
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
