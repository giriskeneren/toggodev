import type {CarPosition} from './types';
import {CarPositionAndSpeedLevel, CarSpeedLevel} from './types';
import utils from './utils';
import constants from './constants';

class Backend {
  #currentLocationStep = 0;
  #isStarted = false;
  #changingSpeed = false;
  #speedLevel: number = CarSpeedLevel.SLOW;
  #timer: NodeJS.Timer | null = null;

  constructor() {
    this.onTick = this.onTick.bind(this)
  }


  private onTick() {
    this.#currentLocationStep = (this.#currentLocationStep + 1) % constants.carPositions.length;

    const targetCarPos = constants.carPositions[this.#currentLocationStep];
    const carPosition: CarPosition = {
      x: targetCarPos.x,
      y: targetCarPos.y,
      orientation: targetCarPos.orientation,
    };

    document.dispatchEvent(new CustomEvent('carPositionAndSpeedChanged', {
      detail: {
        carPosition,
        speed: targetCarPos.speed * this.#speedLevel,
      },
    }));
  }

  private restartInterval() {
    if (this.#timer) {
      clearInterval(this.#timer);
    }

    this.#timer = setInterval(this.onTick, utils.speedLevelToMs(this.#speedLevel));
  }

  public async getInitialCarPositionAndSpeed(): Promise<CarPositionAndSpeedLevel> {
    if(this.#isStarted) {
      throw new Error('Backend is already started');
    }

    await utils.waitFor(Math.random() * 3000);

    if (!this.#isStarted) {
      this.#isStarted = true;
      this.restartInterval();
    }

    const targetCarPos = constants.carPositions[this.#currentLocationStep];
    const carPosition: CarPosition = {
      x: targetCarPos.x,
      y: targetCarPos.y,
      orientation: targetCarPos.orientation,
    };

    return {
      carPosition,
      speedLevel: this.#speedLevel
    };
  }

  public async changeSpeed(): Promise<void> {
    if(this.#changingSpeed) {
      throw new Error('Backend is already changing speed');
    }

    this.#changingSpeed = true;
    await utils.waitFor(Math.random() * 3000);

    if(this.#speedLevel < 3) {
      this.#speedLevel++;
    } else {
      this.#speedLevel = 1;
    }

    this.#changingSpeed = false;
    document.dispatchEvent(new CustomEvent('speedLevelChanged', {detail: {speedLevel: this.#speedLevel}}));
    this.restartInterval();
  }

}

export default new Backend();
