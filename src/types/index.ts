// Interface for a single die
export interface Dice {
  value: number;
  isHeld: boolean;
  id: string;
}

// Interface for the Die component
export interface DieProps extends Omit<Dice, 'id'> {
  holdDice: () => void;
  tenzies: boolean;
}
