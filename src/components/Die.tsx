import { DieProps } from '../types';


// Die component: Represents a single die in the Tenzies game
const Die = ({ value, isHeld, holdDice }: DieProps) => (
  <div
    onClick={holdDice}
    className={`die-component ${isHeld ? 'bg-[#59E391]' : 'bg-white'}`}
  >
    {/* Display the die's value */}
    <span className="die-num">{value}</span>
  </div>
);

export default Die;
