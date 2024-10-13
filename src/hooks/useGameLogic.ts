import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Dice } from '../types';

export const useGameLogic = () => {
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
    if (tenzies) {
      setTenzies(false);
    }
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
    const winner = allHeld && allSameValue;
    setTenzies(winner);
  }, [dice]);

  return { dice, tenzies, rollDice, holdDice };
};
