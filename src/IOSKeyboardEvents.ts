import equal from "deep-equal";
import Queue from "queue";
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  KeyboardEventName,
  Platform,
} from "react-native";
import {
  getDeviceModel,
  getDeviceOrientation,
  IDeviceInformation,
} from "./device-dimensions/deviceDimensions";
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

interface IOSKeyboardEventsOptions {
  deviceModel?: IDeviceInformation;
}

export class IOSKeyboardEvents {
  public keyboardEventSubscriptions: EmitterSubscription[];
  public listeners: { [key: string]: ListenerCallback };
  public lastKeyboardEvent: IOSKeyboardEvent | undefined;
  public lastKeyboardState: KeyboardState;
  public keyboardState: KeyboardState;
  public keyboardTransitionTimer: KeyboardTransitionTimer;
  public keyboardEventQueue: Queue;
  public deviceInformation: IDeviceInformation;

  constructor(deviceModel: IDeviceInformation) {
    this.listeners = {};
    this.keyboardState = "CLOSED";
    this.lastKeyboardEvent = undefined;
    this.lastKeyboardState = "CLOSED";
    this.keyboardTransitionTimer = createTimer();
    this.keyboardEventQueue = Queue({ concurrency: 1, autostart: true });
    this.deviceInformation = deviceModel;

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
    this.keyboardTransitionTimer.reset();
  }

  public getKeyboardState() {
    return this.keyboardState;
  }

  public getDeviceInformation() {
    return this.deviceInformation;
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
    const isDuplicateEvent = equal(keyboardEvent, this.lastKeyboardEvent);
    if (isDuplicateEvent) {
      return;
    }

    this.lastKeyboardEvent = keyboardEvent;
    this.keyboardEventQueue.push(async () => {
      doKeyboardTransitions({
        currentState: this.keyboardState,
        event: keyboardEvent,
        deviceOrientation: getDeviceOrientation(),
        deviceInformation: this.deviceInformation,
        updateKeyboardState: this.updateKeyboardState,
      });
    });
  }

  private updateKeyboardState = (nextState: KeyboardState) => {
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

const createIOSKeyboardEvents = (options: IOSKeyboardEventsOptions = {}) => {
  const { deviceModel } = options;
  if (getDevicePlatform() !== "ios" && deviceModel === undefined) {
    throw new Error("Library only supports iOS.");
  }

  const foundDeviceModel = deviceModel || getDeviceModel();
  if (!foundDeviceModel) {
    throw new Error("Unable to interpret device model from given dimensions.");
  }

  return new IOSKeyboardEvents(foundDeviceModel);
};

export const getDevicePlatform = () => Platform.OS;

export default createIOSKeyboardEvents;
