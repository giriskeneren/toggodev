import {CarSpeedLevel} from './types';

const utils = {
  waitFor: async (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
  speedLevelToMs: (speedLevel: CarSpeedLevel) => {
    switch (speedLevel) {
      case CarSpeedLevel.SLOW:
        return 300;
      case CarSpeedLevel.MEDIUM:
        return 150;
      case CarSpeedLevel.FAST:
        return 75;
    }
  }
}

export default utils;
