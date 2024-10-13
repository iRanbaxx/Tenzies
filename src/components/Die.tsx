import { DieProps } from '../types';
import DiceFace from './DiceFace';

// Die component: Represents a single die in the Tenzies game
const Die = ({ value, isHeld, holdDice, tenzies }: DieProps) => (
  <div
    onClick={holdDice}
    className={`die-component ${
      isHeld ? 'held' : 'not-held'
    } ${tenzies ? 'game-won' : ''}`}
  >
    <DiceFace value={value} />
  </div>
);

export default Die;
