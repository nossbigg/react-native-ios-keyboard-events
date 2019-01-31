import { Keyboard, EmitterSubscription } from "react-native";
import doKeyboardTransitions, { KeyboardState } from "./keyboardTransitions";
import _ from "lodash";

type ScreenRect = {
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
  keyboardState: KeyboardState;

  constructor() {
    this.listeners = {};
    this.keyboardState = "CLOSED";
    this.lastKeyboardEvent = undefined;

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
    doKeyboardTransitions({
      event: keyboardEvent,
      currentState: this.keyboardState,
      onKeyboardStateChange: this.onKeyboardStateChange
    });
  }

  private onKeyboardStateChange = (nextState: KeyboardState) => {
    Object.values(this.listeners).forEach(callback =>
      callback(this.keyboardState, nextState)
    );
    this.keyboardState = nextState;
  };

  close() {
    this.keyboardEventSubscriptions.forEach(subscription =>
      subscription.remove()
    );
    this.listeners = {};
  }
}
