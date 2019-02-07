export class KeyboardTransitionTimer {
  public timer: number | undefined;

  constructor() {
    this.timer = undefined;
  }

  public present() {
    return !!this.timer;
  }

  public set(callback: () => void, ms: number) {
    this.reset();
    this.timer = setTimeout(callback, ms);
  }

  public reset() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
  }
}

const createTimer = () => new KeyboardTransitionTimer();

export default createTimer;
