export class KeyboardTransitionTimer {
  timer: number | undefined;

  constructor() {
    this.timer = undefined;
  }

  present() {
    return !!this.timer;
  }

  set(callback: Function, ms: number) {
    this.reset();
    this.timer = setTimeout(callback, ms);
  }

  reset() {
    this.timer && clearTimeout(this.timer);
    this.timer = undefined;
  }
}

const createTimer = () => new KeyboardTransitionTimer();

export default createTimer;
