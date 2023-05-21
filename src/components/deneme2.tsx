//Bu tsx dosyası deneme amaçlı oluşturulmuştur componentlara ayırmadan hızlı bir çözüm olarak hazırlanmıştır.

import React, { useState, useEffect } from 'react';
import { ReactComponent as CarSvg } from '../images/araba.svg';
import Yollar from '../images/yollar.png';
import constants from '../backend/constants';
import backend from '../backend';
import { CarPosition, CarPositionAndSpeedLevel, CarPositionWithSpeed, CarSpeedLevel } from '../backend/types';

const MyComponent = () => {
  const [carPosAndSpeed, setCarPosAndSpeed] = useState<CarPositionAndSpeedLevel>({
    carPosition: constants.carPositions[0],
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
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', maxHeight: '600px', marginLeft: '25px', width: '300px' }}>
        {carCoordinatesList.map((carPos, index) => (
          <div key={index}>
            x: {carPos.x}, y: {carPos.y}, orientation: {carPos.orientation}, speed: {carPos.speed} km/h
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
