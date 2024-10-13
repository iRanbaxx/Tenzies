import { DiceFaceProps } from '../types';

const DiceFace = ({ value }: DiceFaceProps) => {
  return (
    <div className={`dice-face dice-${value}`}>
      {[...Array(value)].map((_, index) => (
        <div key={index} className="dice-dot" />
      ))}
    </div>
  );
};

export default DiceFace;
