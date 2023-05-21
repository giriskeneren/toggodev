import React from 'react';
import { CarPositionWithSpeed } from '../backend/types';

interface Props {
  carCoordinatesList: CarPositionWithSpeed[];
}

const CarCoordinatesList: React.FC<Props> = ({ carCoordinatesList }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', maxHeight: '600px', marginLeft: '25px', width: '300px' }}>
      {carCoordinatesList.map((carPos, index) => (
        <div key={index}>
          x: {carPos.x}, y: {carPos.y}, orientation: {carPos.orientation}, speed: {carPos.speed} km/h
        </div>
      ))}
    </div>
  );
};

export default CarCoordinatesList;
