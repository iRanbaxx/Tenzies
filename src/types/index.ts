export interface Dice {
  value: number;
  isHeld: boolean;
  id: string;
}

export interface DieProps extends Omit<Dice, 'id'> {
  holdDice: () => void;
}
