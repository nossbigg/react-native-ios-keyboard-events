import { Keyboard, EmitterSubscription } from "react-native";
import doKeyboardTransitions, { KeyboardState } from "./keyboardTransitions";
import _ from "lodash";
import createTimer, {
  KeyboardTransitionTimer
} from "./KeyboardTransitionTimer";
import Queue from "queue";

export type ScreenRect = {
  screenX: number;
  screenY: number;
  width: number;
  height: number;
};

interface KeyboardEvent {
  duration: number;
  easing: string;
  endCoordinates: ScreenRect;
  startCoordinates: ScreenRect;
}

type KeyboardEventType =
  | "keyboardWillShow"
  | "keyboardDidShow"
  | "keyboardWillHide"
  | "keyboardDidHide"
  | "keyboardWillChangeFrame"
  | "keyboardDidChangeFrame";

const keyboardEvents: KeyboardEventType[] = [
  "keyboardDidShow",
  "keyboardDidHide",
  "keyboardDidChangeFrame"
];

export interface IOSKeyboardEvent extends KeyboardEvent {
  eventType: KeyboardEventType;
}

type ListenerCallback = (
  previousState: KeyboardState,
  currentState: KeyboardState
) => void;

export default class IOSKeyboardEvents {
  keyboardEventSubscriptions: EmitterSubscription[];
  listeners: { [key: string]: ListenerCallback };
  lastKeyboardEvent: IOSKeyboardEvent | undefined;
  lastKeyboardState: KeyboardState;
  keyboardState: KeyboardState;
  keyboardTransitionTimer: KeyboardTransitionTimer;
  keyboardDimensions: ScreenRect | undefined;
  keyboardEventQueue: Queue;

  constructor() {
    this.listeners = {};
    this.keyboardState = "CLOSED";
    this.lastKeyboardEvent = undefined;
    this.lastKeyboardState = "CLOSED";
    this.keyboardTransitionTimer = createTimer();
    this.keyboardDimensions = undefined;
    this.keyboardEventQueue = Queue({ concurrency: 1, autostart: true });

    this.keyboardEventSubscriptions = [];
    this.startKeyboardListeners();
  }

  addListener(listenerName: string, callback: ListenerCallback) {
    this.listeners[listenerName] = callback;
  }

  private startKeyboardListeners() {
    keyboardEvents.forEach(eventType => {
      const subscription = Keyboard.addListener(
        eventType,
        (event: KeyboardEvent) => {
          this.onKeyboardEvent({
            eventType,
            ...event
          });
        }
      );
      this.keyboardEventSubscriptions.push(subscription);
    });
  }

  private onKeyboardEvent(keyboardEvent: IOSKeyboardEvent) {
    const isDuplicateEvent = _.isEqual(keyboardEvent, this.lastKeyboardEvent);
    if (isDuplicateEvent) {
      return;
    }

    this.lastKeyboardEvent = keyboardEvent;
    console.log(keyboardEvent);
    this.keyboardEventQueue.push(async () => {
      doKeyboardTransitions({
        event: keyboardEvent,
        currentState: this.keyboardState,
        setKeyboardDimensions: this.setKeyboardDimensions,
        isSameKeyboardDimensions: this.isSameKeyboardDimensions,
        updateKeyboardState: this.updateKeyboardState
      });
    });
  }

  private setKeyboardDimensions = (
    dimensions: ScreenRect | undefined
  ): void => {
    this.keyboardDimensions = dimensions;
  };

  private isSameKeyboardDimensions = (dimensions: ScreenRect): boolean => {
    return _.isEqual(this.keyboardDimensions, dimensions);
  };

  private updateKeyboardState = (nextState: KeyboardState) => {
    console.log("updateKeyboard", nextState);
    this.keyboardState = nextState;
    this.keyboardTransitionTimer.set(() => {
      this.updateListeners();
    }, 50);
  };

  private updateListeners() {
    Object.values(this.listeners).forEach(callback =>
      callback(this.lastKeyboardState, this.keyboardState)
    );
    this.lastKeyboardState = this.keyboardState;
  }

  close() {
    this.keyboardEventSubscriptions.forEach(subscription =>
      subscription.remove()
    );
    this.listeners = {};
  }
}
