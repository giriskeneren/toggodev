import React from 'react';
import { CarPositionAndSpeedLevel, CarPositionWithSpeed } from '../backend/types';
import { ReactComponent as CarSvg } from '../images/araba.svg';

interface Props {
  carPosAndSpeed: CarPositionAndSpeedLevel;
  carCoordinatesList: CarPositionWithSpeed[];
}

const CarSvgComponent: React.FC<Props> = ({ carPosAndSpeed, carCoordinatesList }) => {
  return (
    <>
      <CarSvg
        style={{
          width: '25px',
          height: '25px',
          position: 'absolute',
          left: carPosAndSpeed.carPosition.x,
          top: carPosAndSpeed.carPosition.y,
          transform: `rotate(${carPosAndSpeed.carPosition.orientation}deg)`,
          zIndex: 2
        }}
      />
      <h3
        style={{
          position: 'absolute',
          left: carPosAndSpeed.carPosition.x,
          top: carPosAndSpeed.carPosition.y + 10,
          zIndex: 2
        }}
      >
        {carCoordinatesList.length > 0 && `${carCoordinatesList[0].speed} km/h`}
      </h3>
    </>
  );
};

export default CarSvgComponent;
