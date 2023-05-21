interface CarPosition {
  x: number;
  y: number;
  orientation: number;
}

interface CarPositionWithSpeed extends CarPosition {
  speed: number;
}

interface CarPositionAndSpeedLevel {
  carPosition: CarPosition;
  speedLevel: number;
}

enum CarSpeedLevel {
  SLOW = 1,
  MEDIUM = 2,
  FAST = 3,
}

export type { CarPosition, CarPositionAndSpeedLevel, CarPositionWithSpeed };
export { CarSpeedLevel };
