import { DieProps } from '../types';

// Die component: Represents a single die in the Tenzies game
const Die = ({ value, isHeld, holdDice, tenzies }: DieProps) => (
  <div
    onClick={holdDice}
    className={`die-component ${
      isHeld ? 'held' : 'not-held'
    } ${tenzies ? 'game-won' : ''}`}
  >
    <span className="die-num">{value}</span>
  </div>
);

export default Die;
