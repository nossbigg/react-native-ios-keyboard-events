import _ from "lodash";
import Queue from "queue";
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  KeyboardEventName,
  ScreenRect,
} from "react-native";
import doKeyboardTransitions, { KeyboardState } from "./keyboardTransitions";
import createTimer, {
  KeyboardTransitionTimer,
} from "./KeyboardTransitionTimer";

const keyboardEvents: KeyboardEventName[] = [
  "keyboardDidShow",
  "keyboardDidHide",
  "keyboardDidChangeFrame",
];

export interface IOSKeyboardEvent extends KeyboardEvent {
  eventType: KeyboardEventName;
}

type ListenerCallback = (
  previousState: KeyboardState,
  currentState: KeyboardState,
) => void;

export default class IOSKeyboardEvents {
  public keyboardEventSubscriptions: EmitterSubscription[];
  public listeners: { [key: string]: ListenerCallback };
  public lastKeyboardEvent: IOSKeyboardEvent | undefined;
  public lastKeyboardState: KeyboardState;
  public keyboardState: KeyboardState;
  public keyboardTransitionTimer: KeyboardTransitionTimer;
  public keyboardDimensions: ScreenRect | undefined;
  public keyboardEventQueue: Queue;

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

  public addListener(listenerName: string, callback: ListenerCallback) {
    this.listeners[listenerName] = callback;
  }

  public close() {
    this.keyboardEventSubscriptions.forEach((subscription) =>
      subscription.remove(),
    );
    this.listeners = {};
  }

  private startKeyboardListeners() {
    keyboardEvents.forEach((eventType) => {
      const subscription = Keyboard.addListener(
        eventType,
        (event: KeyboardEvent) => {
          this.onKeyboardEvent({
            eventType,
            ...event,
          });
        },
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
        currentState: this.keyboardState,
        event: keyboardEvent,
        setKeyboardDimensions: this.setKeyboardDimensions,
        isSameKeyboardDimensions: this.isSameKeyboardDimensions,
        updateKeyboardState: this.updateKeyboardState,
      });
    });
  }

  private setKeyboardDimensions = (
    dimensions: ScreenRect | undefined,
  ): void => {
    this.keyboardDimensions = dimensions;
  }

  private isSameKeyboardDimensions = (dimensions: ScreenRect): boolean => {
    return _.isEqual(this.keyboardDimensions, dimensions);
  }

  private updateKeyboardState = (nextState: KeyboardState) => {
    console.log("updateKeyboard", nextState);
    this.keyboardState = nextState;
    this.keyboardTransitionTimer.set(() => {
      this.updateListeners();
    }, 50);
  }

  private updateListeners() {
    Object.values(this.listeners).forEach((callback) =>
      callback(this.lastKeyboardState, this.keyboardState),
    );
    this.lastKeyboardState = this.keyboardState;
  }
}
