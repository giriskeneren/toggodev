import React from 'react';
import { CarPositionAndSpeedLevel } from '../backend/types';

interface Props {
  carPosAndSpeed: CarPositionAndSpeedLevel;
  handleSpeedButtonClick: () => void;
}

const SpeedButton: React.FC<Props> = ({ carPosAndSpeed, handleSpeedButtonClick }) => {
  return (
    <button
      onClick={handleSpeedButtonClick}
      disabled={false}
      style={{
        position: 'absolute',
        marginLeft: '475px',
        marginTop: '20px',
        zIndex: 5
      }}
    >
      Şu Anki Hız: {carPosAndSpeed.speedLevel}
    </button>
  );
};

export default SpeedButton;
