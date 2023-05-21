import React, { useState, useEffect } from 'react';
import Yollar from '../images/yollar.png';
import constants from '../backend/constants';
import backend from '../backend';
import { CarPosition, CarPositionAndSpeedLevel, CarPositionWithSpeed, CarSpeedLevel } from '../backend/types';


import CarSvgComponent from './carComponent';
import SpeedButton from './speedButton';
import CarCoordinatesList from './coordinateList';

const MyComponent = () => {
  const [carPosAndSpeed, setCarPosAndSpeed] = useState<CarPositionAndSpeedLevel>({
    carPosition: constants.carPositions[47],
    speedLevel: CarSpeedLevel.SLOW,
  });

  const [carCoordinatesList, setCarCoordinatesList] = useState<CarPositionWithSpeed[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialCarPosAndSpeed = await backend.getInitialCarPositionAndSpeed();
      setCarPosAndSpeed(initialCarPosAndSpeed);
    };

    fetchInitialData();

    const handleCarPositionAndSpeedChanged = (e: CustomEvent<{ carPosition: CarPosition, speed: number }>) => {
      setCarPosAndSpeed(prevState => {
        const newState = {
          carPosition: e.detail.carPosition,
          speedLevel: prevState.speedLevel,
        };
        return newState;
      });
      setCarCoordinatesList(prevCoordinates => [{ ...e.detail.carPosition, speed: e.detail.speed }, ...prevCoordinates]);
    };

    const handleSpeedLevelChanged = (e: CustomEvent<{ speedLevel: CarSpeedLevel }>) => {
      setCarPosAndSpeed(prevState => ({
        carPosition: prevState.carPosition,
        speedLevel: e.detail.speedLevel,
      }));
    };

    document.addEventListener('carPositionAndSpeedChanged', handleCarPositionAndSpeedChanged as EventListener);
    document.addEventListener('speedLevelChanged', handleSpeedLevelChanged as EventListener);

    return () => {
      document.removeEventListener('carPositionAndSpeedChanged', handleCarPositionAndSpeedChanged as EventListener);
      document.removeEventListener('speedLevelChanged', handleSpeedLevelChanged as EventListener);
    };
  }, []);

  const handleSpeedButtonClick = async () => {
    console.log('Button clicked');
    try {
      await backend.changeSpeed();
      console.log('Speed changed successfully');
    } catch (err) {
      console.log('Error changing speed: ', err);
    }
  };

  return (
    <div style={{ display: 'flex', marginLeft: '33%', marginTop: '5%', zIndex: 4 }}>
      <div style={{ position: 'relative', width: '600px', height: '600px', backgroundColor: 'green' }}>
        <img
          src={Yollar}
          alt="road"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1
          }}
        />
        <CarSvgComponent carPosAndSpeed={carPosAndSpeed} carCoordinatesList={carCoordinatesList} />
        <SpeedButton carPosAndSpeed={carPosAndSpeed} handleSpeedButtonClick={handleSpeedButtonClick} />
      </div>
      <CarCoordinatesList carCoordinatesList={carCoordinatesList} />
    </div>
  );
}

export default MyComponent;
